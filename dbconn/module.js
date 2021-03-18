var mongoose = require("mongoose");

let dbURI = "mongodb+srv://dbjahan:dbjahan@cluster0.8ric4.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', function () {
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) { //any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});

var UserSchema = new mongoose.Schema({
    "name": String,
    "email": String,
    "password": String,
    "role": String,
    "profilePic": String,
    "createdOn": { "type": Date, "default": Date.now },
    "activeSince": Date
});

var UserModel = mongoose.model("campusUsers", UserSchema);

var userDetails = new mongoose.Schema({
    "fullName": String,
    "education": String,
    "cgpa": String,
    "skills": String,
    "email": String,
    "experience": String,
    "createdOn": { "type": Date, "default": Date.now },
    "activeSince": Date
});

var userDetailsModel = mongoose.model("userdetails", userDetails);

var jobDetails = new mongoose.Schema({
    "jobTitle": String,
    "salary": String,
    "jobDes": String,
    "compName": String,
    "email": String,
    "createdOn": { "type": Date, "default": Date.now },
    "activeSince": Date
});

var jobDetailsModel = mongoose.model("jobdetails", jobDetails);

module.exports = {
    UserModel: UserModel,
    userDetailsModel:userDetailsModel,
    jobDetailsModel: jobDetailsModel
}
