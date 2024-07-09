const express = require("express");

const { User } = require("../../db");

const { JWT_SECRET_KEY } = require("../config");

const jwt = require("jsonwebtoken");

const router = express.Router();

const { z } = require("zod");

const signupBody = z.object({
    username: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
});

const signinBody = z.object({
    username: z.string().email(),
    password: z.string(),
});

router.get("/", (req, res) => {
    res.send("hello api user");
});

router.post("/signup", async (req, res) => {
    let isSignup = false;
    const body = req.body;

    const { success } = signupBody.safeParse(body);

    if (!success) {
        return res.status(411).send({
            message: "galat inputs sign up",
        });
    }

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

        const dbUser = await User.create(payload);
        const token = jwt.sign(
            {
                userId: dbUser._id,
            },
            JWT_SECRET_KEY
        );
        console.log(dbUser);
        if (dbUser) {
            res.send({
                message: "User created successfully",
                token: token,
            });
            isSignup = true;
        }
    }
    if (!isSignup) {
        res.status(411).send({
            message: "Email already taken / Incorrect inputs",
        });
    }
});

router.post("/signin", async (req, res) => {
    let isSignIn = false;
    const body = req.body;
    try {
        const { success } = signinBody.safeParse(body);

        if (!success) {
            const error = new Error("body-parsing-error");
            error.message = "Body Inputs in the wrong format";
            error.code=411;
            throw error;
        }

        const dbUser = await User.findOne({
            username: req.body.username,
            password: req.body.password,
        });

        if (dbUser) {
            const token = jwt.sign(
                {
                    userId: dbUser._id,
                    
                },
                JWT_SECRET_KEY
            );
            res.status(200).send({
                message: "signed in",
                token: token,
            });
            return;
        } else {
            const error = new Error("Sign-in-error");
            error.message = "This user is not present in our records";
            error.code=411;
            throw error;
        }
    } catch (err) {
        res.status(err.code).send({
            message: "Error while logging in",
            error: err.message,
        });
    }
});

module.exports = router;
