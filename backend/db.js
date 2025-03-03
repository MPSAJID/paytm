const mongoose = require('mongoose');
const { number } = require('zod');
require('dotenv');

async () => {
    await mongoose.connect("process.env.mongo_url");
    console.log("Connected to MongoDB");
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        userID: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

// UserSchema.methods.createHash = async function (plainTextPassword) {
//     const saltRounds = 10;
//     return await bcrypt.hash(plainTextPassword, saltRounds);  
//   };  
// UserSchema.methods.validatePassword = async function (candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password_hash);
//   };


const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account",accountSchema);


module.exports = {
    User, Account
};