const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/personsDB", { useNewUrlParser: true , useUnifiedTopology: true });
 
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Why not????']
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);   // 2nd Fruit is the name from the collection
const fruit = new Fruit({
    name: "Apple",
    rating: 4,
    review: "Good!"
});

// fruit.save();

// const kiwi = new Fruit({
//     name: "Kiwi",
//     score: 10,
//     review: "good"
// }); 
// const orange = new Fruit({
//     name: "Orange",
//     score: 110,
//     review: "bad"
// }); 
// const banana = new Fruit({
//     name: "Banana",
//     score: 0,
//     review: "sucks"
// }); 

// Fruit.insertMany([kiwi, orange, banana], function(err){
//     if(err){
//         console.log(err);

//     } else {
//         console.log("succuess");
//     }
// });

// Fruit.find(function(err, fruits){
//     if(err){
//         console.log(err);
//     } else { 
//         mongoose.connection.close();
//         fruits.forEach(element => {
//             console.log(element.name);
//         }); 
        
//     }
// });


// Fruit.updateOne({_id: "5fab67d68cdf520eebee93ff"}, {name: "Ice Cream"}, function(err){
//     if(err){
//         console.log(err);

//     }else {
//         console.log("OK");
//     }
// });

// Fruit.deleteOne({_id: "5fab67d68cdf520eebee93ff"}, function(err){
//     if(err){
//         console.log(err);
//     } else{
//         console.log("delete OK");
//     }
// }); 

const personSchema = new mongoose.Schema({
    name: String, 
    age: Number,
    favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);   // 2nd Fruit is the name from the collection
const pineapple = new Fruit({
    name: "Pineapple",
    score: 9,
    review: "Greate Fruit!"
});
// pineapple.save();

const person = new Person({
    name: "Amy",
    age: 12,
    favouriteFruit: pineapple 
});
// person.save();

Person.updateOne({_id: "5facad5485a3f405d7b6dd48"}, {favouriteFruit: pineapple}, function(err){
    if(err){
        console.log(err);

    }else {
        console.log("OK");
    }
    mongoose.connection.close();
});

// Person.deleteMany({name: "James"}, function(err){
//     if(err){
//         console.log(err);
//     } else{
//         console.log("delete OK");
//     }
// });