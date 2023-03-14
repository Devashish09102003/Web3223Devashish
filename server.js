/*************************************************************************************
* WEB322 - 2231 Project
* I declare that this assignment is my own work in accordance with the Seneca Academic
* Policy. No part of this assignment has been copied manually or electronically from
* any other source (including web sites) or distributed to other students.
*
* Student Name  : Devashish Bharatbhai Khanwani
* Student ID    : 161882212
* Course/Section: WEB322 ZBB
*
**************************************************************************************/

const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser')
const nodemailer = require("nodemailer")
const { check, validationResult } = require('express-validator')
//const rentalsdb = require("./models/rentalsdb");
const {matchedData,sanitizeBody} = require ('express-validator/filter');

const app = express();

app.engine(".hbs",exphbs.engine({ 
    extname: ".hbs",
    defaultlayout: "main"
}));
app.set("view engine",".hbs");

const urlencodedParser = bodyParser.urlencoded({ extended: false })
 
app.use(express.static("assets"));
app.use(express.static("views"));
// Add your routes here
// e.g. app.get() { ... }
app.get("/",(req,res)=>{
    // res.render("home" ,{
    //     rentals: rentalsdb.getFeaturedRentals()
    // });
    var rentals=[
        {
            headline : "house 1",
    numSleeps : 2,
     numBedrooms : 1,
     numBathrooms :1,
    pricePerNight :125.99,
    city :"Ottawa",
    province :"Ontario",
    imageUrl : "/images/Ottawa.jpg",
    featuredRental :true,
        },
        
    
        {
            headline : "house 2",
    numSleeps : 2,
     numBedrooms : 1,
     numBathrooms :1,
    pricePerNight :125.99,
    city :"Ottawa",
    province :"Ontario",
    imageUrl : "/images/Ottawa2.jpg",
    featuredRental :true,
        },
        
        {
            headline : "house 3",
    numSleeps : 2,
     numBedrooms : 1,
     numBathrooms :1,
    pricePerNight :125.99,
    city :"Ottawa",
    province :"Ontario",
    imageUrl : "/images/Ottawa3.jpg",
    featuredRental :true,
        },
        
        {
            headline : "house 4",
    numSleeps : 2,
     numBedrooms : 1,
     numBathrooms :1,
    pricePerNight :125.99,
     city :"Ottawa",
    province :"Ontario",
    imageUrl : "/images/Ottawa4.jpg",
    featuredRental :false,
        },
    
        {
            headline : "house 5",
    numSleeps : 2,
     numBedrooms : 1,
     numBathrooms :1,
    pricePerNight :125.99,
    city :"Toronto",
    province :"Ontario",
    imageUrl : "/images/Toronto.jpg",
    featuredRental :false,
        },
    
        {
            headline : "house 6",
    numSleeps : 2,
     numBedrooms : 1,
     numBathrooms :1,
    pricePerNight :125.99,
     city :"Toronto",
    province :"Ontario",
    imageUrl : "/images/Toronto2.jpg",
    featuredRental :false,
        },
        
    ]

    res.render("home",{
        rentals
    });
    
    module.exports.getFeaturedRentals = function(){
        let filtered=[];
    
        for(let i=0;i<rentals.length;i++){
            if(rentals[i].featured){
                filtered.push(rentals[i]);
            }
        }
        return filtered;
    }

    

    
});

/*app.get("/headers",(req,res)=>{
    const headers=req.headers;
    res.json(headers);
});*/

app.get("/rentals",(req,res)=>{
    
    res.render("rentals");
    
});


app.get("/welcome",(req,res)=>{
    res.render("welcome");
});

app.get("/sign-up",(req,res)=>{
    //const sign-up=req.sign-up;
    res.render("sign-up");
});

app.post('/sign-up',urlencodedParser, [

    check('firstname','**first name shoud have atleast 4 character')
    .exists().trim().isLength({min:4}),
    check('lastname','**last name should have atleast 4 character')
    .exists().trim().isLength({min:4}),
    check('email','**email must be in proper')
    .exists().trim().isEmail().normalizeEmail(),     
    check('password','**password should have atleast 8 character')
    .exists().trim().isLength({min:8})


  

],




function (req, res) { 
    const errors =validationResult(req);
    console.log(errors.mapped());
    if(!errors.isEmpty()){
        const user = matchedData(req);

        res.render('sign-up',{error:errors.mapped(),user:user});

    }else{
        let gmail = req.body.email;
       
        
        res.render('welcome')
        console.log(req.body)
        send();

        async function send(req,res) {
    
            let transporter = nodemailer.createTransport({
             host: "smtp.gmail.com",
             port: 587, 
             secure: false,
             requireTLS:true,
             auth: {
              user: 'vishusalvi2008@gmail.com', // generated ethereal user
              pass: 'mjgxipdojahjzfni', // generated ethereal password
             },
            });
           
            const msg = {
             from: 'vishusalvi2008@gmail.com',
             to: gmail,
             subject: "successfully logined to our website",
             text: "hello dear, have you received the mail",
             html: "<h1 style=color:purple>registration successfully done in our website</h1>"
            }
           
            transporter.sendMail(msg, function(error,info){
             if(error){
               console.log(error)
             }
             else{
               console.log("Email has been sent" + info.response)
             }
            });
           
           }
    }
    
    
  });




app.get("/log-in",(req,res)=>{
    res.render("log-in");
});

app.post('/log-in',urlencodedParser, [

    check('username','**username must be in 8 character').trim().isLength({min:8}),
    check('password','**password must be in 8 character').trim().isLength({min:8})

],




function (req, res) { 
    const errors =validationResult(req);
    console.log(errors.mapped());
    if(!errors.isEmpty()){
        const user = matchedData(req);

        res.render('log-in',{error:errors.mapped(),user:user});

    }else{
       
        
        res.send('login succesfully')
    }
    
    
  });



// *** DO NOT MODIFY THE LINES BELOW ***

// This use() will not allow requests to go beyond it
// so we place it at the end of the file, after the other routes.
// This function will catch all other requests that don't match
// any other route handlers declared before it.
// This means we can use it as a sort of 'catch all' when no route match is found.
// We use this function to handle 404 requests to pages that are not found.
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// This use() will add an error handler function to
// catch all errors.
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send("Something broke!")
});

// Define a port to listen to requests on.
const HTTP_PORT = process.env.PORT || 8080;

// Call this function after the http server starts listening for requests.
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}
  
// Listen on port 8080. The default port for http is 80, https is 443. We use 8080 here
// because sometimes port 80 is in use by other applications on the machine
app.listen(HTTP_PORT, onHttpStart);