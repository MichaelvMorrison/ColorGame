var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scoreSchema = new Schema({
    name: String,
    score: Number,
    user_swatch: String,
    random_swatch: String,
    date: String,
});

var Score = mongoose.model('Score', scoreSchema);
