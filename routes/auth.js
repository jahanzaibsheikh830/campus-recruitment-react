var express = require('express')
var bcrypt = require("bcrypt-inzi")
var jwt = require('jsonwebtoken');
var { UserModel} = require('../dbconn/module')
var router = express.Router();
var SERVER_SECRET = process.env.SECRET || "1234";

router.post("/signup", (req, res, next) => {
    console.log(req.body)
    if (!req.body.name || !req.body.email || !req.body.password || !req.body.role) {

        res.status(403).send(`
            please send name, email, passwod, phone and gender in json body.
            e.g:
            {
                "name": "jahanzaib",
                "email": "jahanzaib@gmail.com",
                "password": "123",
                "phone": "034320492",
                "gender": "Male"
            }`)
        return;
    }

    UserModel.findOne({ email: req.body.email },
        function (err, doc) {
            if (!err && !doc) {

                bcrypt.stringToHash(req.body.password).then(function (hash) {

                    var newUser = new UserModel({
                        "name": req.body.name,
                        "email": req.body.email,
                        "role": req.body.role,
                        "password": hash,
                    })
                    newUser.save((err, data) => {
                        if (!err) {
                            res.send({
                                status: 200,
                                message: "Signup Successfully"
                            })
                        } else {
                            console.log(err);
                            res.status(500).send({
                                message: "user create error, " + err
                            })
                        }
                    });
                })

            } else if (err) {
                res.status(500).send({
                    message: "db error"
                })
            } else {
                res.send({
                    message: "user already exist"
                })
            }
        })

})

router.post("/login", (req, res, next) => {

    if (!req.body.email || !req.body.password) {

        res.status(403).send(`
            please send email and passwod in json body.
            e.g:
            {
                "email": "jahanzaib@gmail.com",
                "password": "123",
            }`)
        return;
    }

    UserModel.findOne({ email: req.body.email },
        function (err, user) {
            if (err) {
                res.status(500).send({
                    message: "an error occured: " + JSON.stringify(err)
                });
            } else if (user) {
                bcrypt.varifyHash(req.body.password, user.password).then(isMatched => {
                    if (isMatched) {
                        console.log("matched", user);

                        var token =
                            jwt.sign({
                                id: user._id,
                                name: user.name,
                                email: user.email,
                                role: user.role
                            }, SERVER_SECRET)

                        res.cookie('jToken', token, {
                            maxAge: 86400000,
                            httpOnly: true
                        });

                        res.send({
                            status: 200,
                            message: "login success",
                            user: {
                                name: user.name,
                                email: user.email,
                                phone: user.phone,
                                gender: user.gender,
                                role: user.role,
                                profilePic: user.profilePic
                            }
                        });


                    } else {
                        console.log("not matched");
                        res.send({
                            message: "Incorrect password or email"
                        })
                    }
                }).catch(e => {
                    console.log("error: ", e)
                })

            } else {
                res.send({
                    message: "user not found"
                });
            }
        });
})
router.post("/logout", (req, res, next) => {
    res.clearCookie('jToken');
    res.cookie('jToken', "", {
        maxAge: 86400000,
        httpOnly: true
    });
    res.send("logout success");
})

module.exports = router;