const cheerio = require("cheerio");
const axios = require("axios");
const cases = {};
const death = {};
const recovered = {};
 
//Send Mail ---1
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

//Send Mail ---2
app.listen(3000, () => {
    console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
    res.send(
        "<h1 style='text-align: center'>Welcome to RMS v2020 Sending mails </h1>"
    );
});

//Send Mail --2 End
app.post("/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    sendMail(user, info => {
        console.log(`The mail has been sent and the id is ${info.messageId}`);
        res.send(info);
    });
});

async function sendMail(user, callback) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: details.email,
            pass: details.password
        }
    });

    let mailOptions = null;
    //console.log(user.action);
    if (user.action === "Y") {
        mailOptions = {
            from: '"Sahadan R"<sahadan@.gmail.com>', // sender address
            to: user.email, // list of receivers
            subject: "BOOKING CONFIRMED...", // Subject line
            html: `<h3>Dear ${user.name}</h3>
      <h4>Thank you for choosing <b>${user.resourcename}</b>.<br>
      <h4> We are pleased to confirm your booking.</h4>`
        };
    }
    else {
        mailOptions = {
            from: '"Sahadan R"<sahadan@.gmail.com>', // sender address
            to: user.email, // list of receivers
            subject: "BOOKING CANCELLED!!!", // Subject line
            html: `<h3>Dear ${user.name}</h3>
      <h4>Thank you for choosing <b>${user.resourcename}</b>.<br>
      <h4> We are regretted to cancel your booking.</h4>`
        };
    }

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
    callback(info);
}
// Send mail---End 


axios.get('https://www.worldometers.info/coronavirus/')
    .then(function (response) {
        let html = cheerio.load(response.data);
        html(".maincounter-number").each((index, el) => {
            if (index == 0) {
                cases.totalcase = el.children[0].next.children[0].data;
            }
            if (index == 1) {
                death.totalcase = el.children[0].next.children[0].data;
            }
            if (index == 2) {
                recovered.totalcase = el.children[0].next.children[0].data;
            }
            console.log(el.children[0].next.children[0].data);
        })

    })
    .catch(function (err) {
        console.log('error')
    })
    .then(function () {
        console.log('LOOKS LIKE COMPLETE');
    });


//1.
var http = require('http');
var fs = require('fs');
//2.
var server = http.createServer(function (req, resp) {
    //3.
    if (req.url === "/report") {
        fs.readFile("index.html", function (error, pgResp) {
            if (error) {
                resp.writeHead(404);
                resp.write('Contents you are looking are Not Found');
            } else {
                resp.writeHead(200, { 'Content-Type': 'text/html' });
                resp.write(pgResp);
                resp.write("Coronavirus Cases: <b>" + cases.totalcase + "</b><br/>");
                resp.write("Death :  <b>" + death.totalcase + "</b><br/>");
                resp.write("Recovered : <b>" + recovered.totalcase + "</b><br/>");

            }

            resp.end();
        });
    } else {
        //4.
        resp.writeHead(200, { 'Content-Type': 'text/html' });
        resp.write('<h1>Corona Cases</h1><br /><br />To show please enter: ' + req.url);
        resp.end();
    }
});
//5.
//server.listen(3000);
//console.log('Server Started listening on 5050');

