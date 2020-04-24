var app = require('express')();
var express = require('express');
var http = require('http').Server(app);

app.use(express.static('public'));

http.listen(3000, function(){
  console.log('\nServer up on *:3000');
});
