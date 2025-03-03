const mongoose = require('mongoose');
require('dotenv').config();


const mongo_url = process.env.mongo_url;
main().catch(err=> console.log("Error connecting to MongoDB"));
async function main() {
await mongoose.connect(mongo_url);
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

const User = mongoose.model("User", userSchema);


const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model("Account",accountSchema);

// UserSchema.methods.createHash = async function (plainTextPassword) {
//     const saltRounds = 10;
//     return await bcrypt.hash(plainTextPassword, saltRounds);  
//   };  
// UserSchema.methods.validatePassword = async function (candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password_hash);
//   };




module.exports = {
    User, Account
};