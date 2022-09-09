const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        maxlength: 10
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Select Role",
        enum: {
          values: ["Admin", "Manager", "Staff"],
          message: "Role is required",
        }
    },
    tokens: [
        {
          token: {
            type: String,
            required: true,
          },
        },
    ],
});

//password hashing

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

//generating token
// userSchema is an instance and we use methods with instance
userSchema.methods.generateAuthToken = async function () {
    try {
      let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
      this.tokens = this.tokens.concat({ token: token }); //this let token will be inserted in this tokens array inside token
      await this.save();
      return token;
    } catch (err) {
      console.log(err);
    }
  };

//creating collection
const User = mongoose.model("USER", userSchema);
module.exports = User;