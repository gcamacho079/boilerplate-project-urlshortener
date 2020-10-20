'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var dns = require('dns');

// Connect to database
require('./initDB')();

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

app.use(cors());

var getHostname = function (url) {
  var protocolRegex = /^https?:\/\//i;
  return url.replace(protocolRegex, '');
};

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.post('/api/shorturl/new', urlencodedParser, function (req, res) {
  var url = getHostname(req.body.url);
  var options = {
    family: 6,
  };
  
  dns.lookup(url, options, function (err, addresses, family) {
    if (err) console.log(err);
    console.log(addresses);
    console.log(family);
    res.send('the new url is ' + url);
  });
})

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.listen(port, function () {
  console.log('Node.js listening ...');
});