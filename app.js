const express = require('express');
const bodyParser = require('body-parser');
// const https = require('https');
const axios = require('axios');

let fromArr = ["EUR", "USD", "CHF"];
let toArr = ["USD", "EUR", "CHF"];

const app = express();

app.use(express.static("./images"));
app.use(express.static("./public"));

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});



app.post("/", function(req, res) {
    axios.get("http://api.currencylayer.com/live?access_key=03def39c43ab8983ddd770cb0bd621b6")
    .then(response => {
    console.log(response.data.quotes);
    let amount = req.body.amount;
    let from = req.body.from;
    let to = req.body.to;
    let usdToEur = response.data.quotes.USDEUR;
    let usdToChf = response.data.quotes.USDCHF;
    if (from === "USD" && to === "EUR") {
        let conversion = amount * usdToEur;
        console.log("conversion: ", conversion);
        res.render('converter', {amount: amount, from: from, to: to, conversion: conversion, fromCurrencies: fromArr, toCurrencies: toArr});
    } else if (from === "EUR" && to === "USD") {
        console.log("from", from);
        console.log("to", to);
        console.log("usdToEur", usdToEur)
        let conversion = amount / usdToEur;
        console.log("conversion: ", conversion);
        res.render('converter', {amount: amount, from: from, to: to, conversion: conversion, fromCurrencies: fromArr, toCurrencies: toArr});
    } else if (from === "USD" && to === "CHF") {
        let conversion = amount * usdToChf;
        res.render('converter', {amount: amount, from: from, to: to, conversion: conversion, fromCurrencies: fromArr, toCurrencies: toArr});
    } else if (from === "CHF" && to === "USD") {
        let conversion = amount / usdToChf;
        res.render('converter', {amount: amount, from: from, to: to, conversion: conversion, fromCurrencies: fromArr, toCurrencies: toArr});
    } else if (from === "EUR" && to === "CHF") {
        let usd = 1 / usdToEur;
        let conversion = amount * (usd * usdToChf);
        res.render('converter', {amount: amount, from: from, to: to, conversion: conversion, fromCurrencies: fromArr, toCurrencies: toArr});
    } else if (from === "CHF" && to === "EUR") {
        let usd = 1 / usdToChf;
        let conversion = amount * (usd * usdToEur);
        res.render('converter', {amount: amount, from: from, to: to, conversion: conversion, fromCurrencies: fromArr, toCurrencies: toArr});
    } else if (from === to) {
        let conversion = amount * 1;
        res.render('converter', {amount: amount, from: from, to: to, conversion: conversion, fromCurrencies: fromArr, toCurrencies: toArr});
    }
    })
    .catch(err => {
        console.log(err);
    });
});


app.listen(3000, function() {
    console.log('listening');
});
