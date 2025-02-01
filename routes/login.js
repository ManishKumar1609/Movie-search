const express = require("express");
const router = express.Router();
const Email = require("../globalVariables/Email");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

module.exports = () => {
    router.get("/", (req, res) => {
        res.render("./Auth/login");
    });

    router.post("/", async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        try {
            const user = await User.findOne({ email: email });

            if (!user) {
                res.redirect("/login?message=User%20not%20found");
            } else {
                const match = await bcrypt.compare(password, user.password);

                if (match) {
                    Email.setEmail(email);
                    res.redirect("/");
                } else {
                    res.redirect("/login?message=Invalid%20Credentials%20!!");
                }
            }
        } catch (err) {
            console.error("Error while querying database:", err);
            res.redirect("/login");
        }
    });

    return router;
};
