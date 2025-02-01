const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Email = require("../globalVariables/Email");
const User = require("../models/userModel");

module.exports = () => {
    router.get("/", (req, res) => {
        res.render("./Auth/signup");
    });

    router.post("/", async (req, res) => {
        const fname = req.body.firstName;
        const lname = req.body.lastName;
        const email = req.body.email;
        const password = req.body.password;

        try {
            const existingUser = await User.findOne({ email: email });

            if (existingUser) {
                return res.redirect("/login?message=User%20already%20registered");
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                first_name: fname,
                last_name: lname,
                email: email,
                password: hashedPassword
            });

            await newUser.save();

            Email.setEmail(email);
            
            res.redirect("/");
        } catch (error) {
            console.error("Error during signup:", error);
            res.status(500).send("Error during signup");
        }
    });

    return router;
};
