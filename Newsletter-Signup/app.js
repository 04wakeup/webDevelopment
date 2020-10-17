const express = require('express');
const https = require('https');
const request = require('request');
const bodyparser = require('body-parser');
const mailchimp = require("@mailchimp/mailchimp_marketing"); 



const app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("./public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){ 
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us2.api.mailchimp.com/3.0/lists/8a002620c5";
    const options = {
        method: "POST",
        auth: "James:39cdc21f03160a9a7a9d5d96784ca669-us2"

    }
    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
    // "https://$API_SERVER.api.mailchimp.com/3.0/lists/$list_id/members"










    // option 2:
    // set the account config
    // mailchimp.setConfig({
    //     apiKey: "39cdc21f03160a9a7a9d5d96784ca669-us2",
    //     server: "us2",
    //   });
      
    // //   async function run() {  // testing
    // //     const response = await mailchimp.ping.get();
    // //     console.log(response);
    // //   } 
    // //   run();
    // const listId = "8a002620c5";
    // const subscribingUser = {
    //     firstName: req.body.fname,
    //     lastName: req.body.lname,
    //     email: req.body.email
    // };

    // async function run() {
    //     const response = await mailchimp.lists.addListMember(listId, {
    //         email_address: subscribingUser.email,
    //         status: "subscribed",
    //         merge_fields: {
    //             FNAME: subscribingUser.firstName,
    //             LNAME: subscribingUser.lastName
    //         }
    //     }); 
    //     console.log(
    //         `Successfully added contact as an audience member. The contact's id is ${
    //         response.id
    //         }.`
    //     );
    // } 
    // run();
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");
});

// 39cdc21f03160a9a7a9d5d96784ca669-us2

// 8a002620c5