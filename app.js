const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static("./images"));
app.use(express.static("./public"));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('converter', {foo: '5'});
});

app.listen(3000, function() {
    console.log('listening');
});
