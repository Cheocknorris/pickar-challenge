const express = require('express');
const bodyParser = require('body-parser');
// const https = require('https');
const axios = require('axios');


const app = express();

app.use(express.static("./images"));
app.use(express.static("./public"));

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html")
    // res.render('converter', {amount: '1'});
});

// app.post("/", function(req, res) {
//     https.get("api.currencylayer.com/live?access_key=2f36781733cf3079a0ddd55305aadd77", function(response) {
//         response.on('data', function(data) {
//             console.log(data);
//         });
//     });
// });

app.post("/", function(req, res) {
    axios.get("http://api.currencylayer.com/live?access_key=2f36781733cf3079a0ddd55305aadd77")
  .then(response => {
    let amount = req.body.amount;
    let from = req.body.from;
    let to = req.body.to;
    let usdToEur = response.data.quotes.USDEUR;
    let usdToChf = response.data.quotes.USDCHF;
    // console.log("usdToEur: ", usdToEur);
    // console.log("usdToChf: ", usdToChf);
    if (from === "USD" && to === "EUR") {
        // console.log("from USD to EUR");
        let conversion = amount * usdToEur;
        // console.log("conversion: ", conversion);
        res.render('converter', {amount: amount, from: from, to: to, conversion: conversion});
    } else if (from === "USD" && to === "CHF") {
        let conversion = amount * usdToChf;
        res.render('converter', {amount: amount, from: from, to: to, conversion: conversion});
    }
    // res.render('converter', {amount: amount, from: from, to: to});
  })
  .catch(err => {
    console.log(err);
  });
});


app.listen(3000, function() {
    console.log('listening');
});
