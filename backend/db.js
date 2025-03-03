const mongoose = require('mongoose');
require('dotenv');

mongoose.connect(process.env.mongo_url);

const userSchema = mongoose.Schema({
    username : String,
    password : String,
    firstName : String,
    lastName : String
});

const User = mongoose.model("User",userSchema);

module.exports = {
    User
};