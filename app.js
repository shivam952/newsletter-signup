// jshint esversion 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));


app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;

  console.log(firstName);
  console.log(lastName);

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName

      }
    }]
  };
  var jsondata = JSON.stringify(data);

  var options = {
    url: "https://us8.api.mailchimp.com/3.0/lists/fc7898a10b",
    method: "post",
    headers: {
      "Authorization": "Shivam1 81cc76d9c6c71616466fa703c8407fc8-us8"
    },
    body: jsondata
  };

  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200)
        res.sendFile(__dirname + "/success.html");
      else {
        res.sendFile(__dirname + "/failure.html");

      }

    }

  });

});

app.post("/failure" , function(req,res){
  res.sendFile(__dirname + "/signup.html");
})


app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 3000");
});


//81cc76d9c6c71616466fa703c8407fc8-us8

//fc7898a10b
