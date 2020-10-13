//jshint esversion:6

const express = require('express');
const app = express();

app.get("/", function(request, response){
    response.send("<h1>Hello</h1>");
});

app.get("/contact", function(res, res){
    res.send("Contact me at : xxx@gmail.com");
});

app.get("/about", function(req, res){
    res.send("I'm James");
});

app.get("/hobby", function(req, res){
    res.send("<ul><li>Watching a movie!</li><li>Eating something</li></ui>");
})

app.listen(3000, function(){
    console.log("Server started on port 3000");
});

