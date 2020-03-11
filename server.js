const express = require('express');
const path = require('path');
var bodyParser = require('body-parser')

const app = express();
const firebase = require('firebase');
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCjdAcPap8GsLggsh8ysJD6t_6yGJU3v-Y",
    authDomain: "vm-task.firebaseapp.com",
    databaseURL: "https://vm-task.firebaseio.com",
    projectId: "vm-task",
    storageBucket: "vm-task.appspot.com",
    messagingSenderId: "760936168385",
    appId: "1:760936168385:web:2ed2aee8111cea16a34d40",
    measurementId: "G-ZHV6KG3BYB"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics;
  var admin = require("firebase-admin");

  var serviceAccount = require("./vm-task-firebase-adminsdk-l0yft-6ae1fc662b.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
  });
require('dotenv').config('./.env')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 
const indexRouter = require('./routes/index');
const jobsRouter = require('./routes/jobs');

app.use('/', indexRouter);
app.use('/jobs',jobsRouter );


app.listen(process.env.PORT,()=>{
    console.log(`connected on ${process.env.PORT}`)
})