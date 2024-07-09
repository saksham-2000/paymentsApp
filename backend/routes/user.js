const express = require("express");

const { User } = require("../../db");

const { JWT_SECRET_KEY } = require("../config");

const jwt = require("jsonwebtoken");
const { boolean } = require("zod");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("hello api user");
});

router.post("/signup", async (req, res) => {
    let isSignup=false;
    const body = req.body;

    const username1 = body.username;
    const password1 = body.password;
    const firstName1 = body.firstName;
    const lastName1 = body.lastName;
    const payload = {
        username: username1,
        password: password1,
        firstName: firstName1,
        lastName: lastName1,
    };

    const isUserPresent = await User.find({
        username: username1,
    });
    if (isUserPresent.length == 0) {
        // user not present

        const response = await User.create(
        payload);
        const token=jwt.sign(payload,JWT_SECRET_KEY);
        console.log(response);
        if (response) {
            res.send({
                message: "User created successfully",
                token: token,
            });
            isSignup=true;
        }
    }
    if(!isSignup){
    res.status(411).send({
        message: "Email already taken / Incorrect inputs",
    });
}
});

router.post("/signin", async (req, res) => {

    let isSignIn=false;
    const body = req.body;

    const username1 = req.headers.username;
    
    const jwtToken=req.headers.authorization.split(' ')[1];
     
    const decoded=jwt.verify(jwtToken, JWT_SECRET_KEY);
    
    if(decoded.username==username1){
         isSignIn=true;
    }
    if(isSignIn){
        res.status(200).send({
            message: "signed in",
        });
    }else {
        res.status(411).send({
            message: "Error while logging in"
        })
    }

   
});

module.exports = router;
