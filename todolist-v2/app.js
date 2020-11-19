//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});
const itemsSchema ={
  name: String
};

const Item = mongoose.model("Item", itemsSchema);
const item1 = new Item({
  name: "buy pizza"
});
const item2 = new Item({
  name: "buy burger"
});
const item3 = new Item({
  name: "buy a hat"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
}

const List = mongoose.model("List", listSchema);

// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

app.get("/", function(req, res) {
// const day = date.getDate();
  const items = [];
  Item.find({}, function(err, results){ 
    if(results.length === 0){
        Item.insertMany(defaultItems, function(err){
        if(err){
          console.log(err);
        } else {
          console.log("Insert Many OK!");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {listTitle: "Today", newListItems: results});
    } 
  }); 
});

app.get("/:listName", function(req, res){
  const customListName = req.params.listName;
   List.findOne({name: customListName}, function(err, result){
    if(err){
      console.log(err)
    } else{  
      console.log(result)
      if(result){
        res.render("list", {listTitle: customListName, newListItems: result.items});
      } else{ 
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      }
    }
   }); 
   
});

app.post("/", function(req, res){
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const newItem = new Item({
    name: itemName
  });

  if(listName === "Today"){
    newItem.save(); // isner one
    res.redirect("/");
  } else {
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(newItem);
      foundList.save();
      res.redirect("/" + listName);
    })
  }

  
});

app.post("/delete", function(req, res){
 const itemId = req.body.checkbox;
 Item.findByIdAndRemove(itemId, function(err){
   if(err){
     console.log(err);
   } else {
     console.log("Remove is Ok!");
   }
 })
 res.redirect("/");
});

// app.get("/work", function(req,res){
//   res.render("list", {listTitle: "Work List", newListItems: workItems});
// });


app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
