const express = require('express');
const https = require('https');
const request = require('request');
const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("./public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    console.log(req.body.fname);
    console.log(req.body.lname);
    console.log(req.body.email);
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});

// 39cdc21f03160a9a7a9d5d96784ca669-us2