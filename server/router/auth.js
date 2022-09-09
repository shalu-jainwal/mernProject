const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const cookieParser =require("cookie-parser");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

require("../db/conn");
const User = require("../model/userSchema");

router.use(cookieParser()) ;

router.get("/", (req, res) => {
  res.send("Hello home from auth");
});

//using async-await
router.post("/register", async (req, res) => {
  const { username, phone, email, password, role } = req.body;

  if (!username || !phone || !email || !password || !role) {
    return res.status(422).json({ error: "Please fill the form correctly" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "User already exist!" });
    } else {
      const user = new User({ username, phone, email, password, role });

      //we dont need else as we already have catch
      await user.save();

      res
        .status(201)
        .json({ message: "User has been successfully registered!" });
    }
  } catch (err) {
    console.log(err);
  }
});

//Login Route

router.post("/login", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please fill the details correctly" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      console.log(token);

      //after how many minutes you want that session to expire, 25892000000ms=30Days
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        res.json({ message: "User signin successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

//productlist page
router.get("/productlist", authenticate, (req, res) => {
  console.log("Hello product");
  res.send(req.rootUser);
});

module.exports = router;
