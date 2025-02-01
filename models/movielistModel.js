const mongoose = require("mongoose");

const movielistSchema = new mongoose.Schema({
    imdbid: { type: String, required: true, minlength: 2 },
    title: { type: String, required: true},
    email: { type: String, required: true, minlength: 3},
    yearofrelease: { type: String, required: true, minlength: 3 }
},
{
    timestamps: true,
});

const movielistModel = mongoose.model("movielist",movielistSchema);

module.exports = movielistModel;