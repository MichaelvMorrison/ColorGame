var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config();

app.use(express.static('public'));

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
  .then(() => console.log('\nDB Connected!'))
  .catch(err => {
    console.log('\nDB Connection Error: ${err.message}');
  });

require('./models/score.js');

var Score = mongoose.model('Score');

function getScoreSchema(_score){
  var score = new Score();
  score.name = _score.name;
  score.score = _score.score;
  score.user_swatch = _score.user_swatch;
  score.random_swatch = _score.random_swatch;
  score.date = _score.date;
  return score;
}

app.post('/saveScore', function(req, res){
  var score = getScoreSchema(req.body);
  score.save(function(err, savedObject){
    if (err){
      console.log(err);
      res.status(500).send();
    }else{
      console.log('\nNew Score saved: ' + req.body.name + " " + req.body.score);
      res.send(savedObject);
    }
  });
});

app.get('/leaderboard',function(req,res){
  mongoose.model('Score').find({}, function(err, data){
    if(err){
      console.log("Error pulling scores from database: " + err);
      res.send("failed");
    }else{
      res.send(data);
    }
  })
});

http.listen(3000, function(){
  console.log('\nServer up on *:3000');
});
