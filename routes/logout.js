const express = require("express");
const router = express.Router();
const Email = require("../globalVariables/Email");

router.get("/", (req, res) => {
    var email = Email.getEmail();

    if (email !== "") {
        Email.setEmail("");
        res.redirect("/login");
    } else {
        res.redirect("/login?message=No%20login%20found");
    }
});

module.exports = router;
