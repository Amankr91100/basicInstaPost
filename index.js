const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var methodOverride = require('method-override')
app.use(methodOverride('_method'))
const { v4: uuidv4 } = require('uuid');

let posts = [
    {
        id: uuidv4(),
        Date: "08-09-2025",
        content: "This is the content of post 1",
    },
    {
        id: uuidv4(),
        Date: "09-09-2025",
        content: "This is the content of post 2",
    }
]

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("form.ejs");
});

app.post("/posts", (req, res) => {
    let {Date, content} = req.body;
    let id = uuidv4();
    posts.push({ id, Date, content });
    res.redirect("/posts");
})

app.get("/posts/show/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id == id);
    res.render("show.ejs", { post });
})

app.get("/posts/edit/:id", (req, res) => { 
    let { id } = req.params;
    let post = posts.find((p) => p.id == id);
    res.render('edit.ejs', { post });
})

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newDate = req.body.Date;
    let newcontent = req.body.content;
    let post = posts.find((p) => p.id == id);
    post.Date = newDate;
    post.content = newcontent;
    // console.log(newcontent)
    res.redirect("/posts");
})
app.delete("/posts/:id", (req, res) =>{
    let { id } = req.params;
    newPosts = posts.filter((p) => p.id!=id);
    posts = newPosts;
    res.redirect("/posts");
})



app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})