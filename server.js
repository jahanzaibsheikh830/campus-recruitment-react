var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require("cors");
var morgan = require("morgan");
var { UserModel, userDetailsModel,jobDetailsModel } = require('./dbconn/module')
var path = require("path")
var SERVER_SECRET = process.env.SECRET || "1234";
var jwt = require('jsonwebtoken')
var app = express()
var authRoutes = require('./routes/auth')
const fs = require('fs')
const admin = require("firebase-admin");
const multer = require('multer')

const storage = multer.diskStorage({ // https://www.npmjs.com/package/multer#diskstorage
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, `${new Date().getTime()}-${file.filename}.${file.mimetype.split("/")[1]}`)
    }
})

var upload = multer({ storage: storage })

// https://firebase.google.com/docs/storage/admin/start



app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(morgan('dev'));
app.use("/", express.static(path.resolve(path.join(__dirname, "./web/build"))));

app.use('/', authRoutes);
app.use(function (req, res, next) {
    console.log(req.cookies.jToken)
    if (!req.cookies.jToken) {
        res.status(401).send("include http-only credentials with every request")
        return;
    }
    jwt.verify(req.cookies.jToken, SERVER_SECRET, function (err, decodedData) {
        if (!err) {

            const issueDate = decodedData.iat * 1000;
            const nowDate = new Date().getTime();
            const diff = nowDate - issueDate;

            if (diff > 300000) {
                res.status(401).send("token expired")
            } else {
                var token = jwt.sign({
                    id: decodedData.id,
                    name: decodedData.name,
                    email: decodedData.email,
                    role: decodedData.role
                }, SERVER_SECRET)
                res.cookie('jToken', token, {
                    maxAge: 86400000,
                    httpOnly: true
                });
                req.body.jToken = decodedData
                req.headers.jToken = decodedData
                next();
            }
        } else {
            res.status(401).send("invalid token")
        }
    });
})

app.get("/profile", (req, res, next) => {

    console.log("user ======", req.body.jToken)

    UserModel.findById(req.body.jToken.id, 'name email role profilePic createdOn',
        function (err, doc) {
            console.log("doc", doc)
            if (!err) {
                res.send({
                    status: 200,
                    profile: doc
                })

            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        })
})
app.post("/upload", upload.any(), (req, res, next) => {

    console.log("req.body: ", req.body);
    bucket.upload(
        req.files[0].path,
        function (err, file, apiResponse) {
            if (!err) {
                file.getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491'
                }).then((urlData, err) => {
                    if (!err) {
                        console.log("public downloadable url: ", urlData[0])
                        UserModel.findOne({ email: req.headers.jToken.email }, (err, user) => {
                            if (user) {
                                user.updateOne({ profilePic: urlData[0] }, (err, data) => {
                                    if (data) {
                                        res.status(200).send({
                                            message: "succesfully uploaded",
                                            url: urlData[0],
                                        })
                                    }
                                    else {
                                        res.status(500).send({
                                            message: "an error occured" + err,
                                        })
                                    }
                                })
                            }
                            else {
                                res.send({
                                    message: "error"
                                });
                            }
                        })
                        try {
                            fs.unlinkSync(req.files[0].path)
                        } catch (err) {
                            console.error(err)
                        }
                    }
                })
            } else {
                console.log("err: ", err)
                res.status(500).send();
            }
        });
})
app.post('/addDetails', (req, res, next) => {
    if (!req.body.fullName || !req.body.cgpa || !req.body.experience ||
        !req.body.education || !req.body.skills) {
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

    UserModel.findOne({ email: req.body.jToken.email }, (err, user) => {
        if (user) {
            userDetailsModel.findOne({ email: req.body.jToken.email }, (err, email) => {
                if (email) {
                    res.send({
                        message: "You have already added your details"
                    })
                }
                else {
                    var userDetails = new userDetailsModel({
                        "fullName": req.body.fullName,
                        "education": req.body.education,
                        "email": user.email,
                        "cgpa": req.body.cgpa,
                        "skills": req.body.skills,
                        "experience": req.body.experience,
                    })
                    userDetails.save((err, data) => {
                        if (!err) {
                            res.send({
                                status: 200,
                                message: "Data Successfully Added"
                            })
                        } else {
                            console.log(err);
                            res.status(500).send({
                                message: "user create error, " + err
                            })
                        }
                    });
                }
            })
        }
        else {
            res.status(500).send({
                message: "user create error, " + err
            })
        }
    })
})
app.post('/addJobs', (req, res, next) => {
    if (!req.body.jobTitle || !req.body.salary || !req.body.jobDes) {
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

    UserModel.findOne({ email: req.body.jToken.email }, (err, user) => {
        if (user) {
            var jobDetails = new jobDetailsModel({
                "jobTitle": req.body.jobTitle,
                "salary": req.body.salary,
                "email": user.email,
                "compName": user.name,
                "jobDes": req.body.jobDes,
            })
            jobDetails.save((err, data) => {
                if (!err) {
                    res.send({
                        status: 200,
                        message: "Data Successfully Added"
                    })
                } else {
                    console.log(err);
                    res.status(500).send({
                        message: "user create error, " + err
                    })
                }
            });
        }
        else {
            res.status(500).send({
                message: "user create error, " + err
            })
        }
    })
})

app.get('/getStudentsDetails',(req,res,next)=>{
    userDetailsModel.find({},(err,data)=>{
        if (data) {
            res.send({
                status: 200,
                data:data
            })
        }
        else{
            res.send('something went wrong')
        }
    })
})
app.get('/getJobDetails',(req,res,next)=>{
    jobDetailsModel.find({},(err,data)=>{
        if (data) {
            res.send({
                status: 200,
                data:data
            })
        }
        else{
            res.send('something went wrong')
        }
    })
})
app.post('/delStudentDetails',(req,res,next)=>{
    console.log("ffs=====",req.body.id)
    userDetailsModel.findOne({_id: req.body.id},(err,data)=>{
        if (data) {
            data.deleteOne({},(err,success)=>{
                if (success) {
                    res.send({
                        status: 200,
                        message: "Deleted"
                    })
                }else{
                    res.send({
                        message: "something went wrong"
                    })
                }
            })
        }
        else{
            res.send('something went wrong')
        }
    })
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("server is running on: ", PORT);
})
