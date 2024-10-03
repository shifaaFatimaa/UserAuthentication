const express = require("express")
const router = express.Router();
const bcrypt= require("bcryptjs");
const jwt = require("jsonwebtoken");
const {check,validationResult} = require("express-validator")

const { Signup } =require("../controllers/AuthController")


router.post("/signup",Signup)

module.exports = router