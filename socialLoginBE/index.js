const cookieSession = require('cookie-session');
const express = require('express');
const passport = require('passport');
const passportSetup = require('./passport')
const cors = require('cors')
const authRoute = require("./routes/auth");
const cookieParser = require('cookie-parser');
const app = express()


app.use(express.json())

app.use(cookieSession({name:"session" ,keys:['hash'],maxAge:24*60*60*100}));

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin:'http://localhost:5173',
        methods: 'GET,POST,PUT,DELETE',
        credentials:true,
    })
);

app.use(cookieParser())

app.use("/auth",authRoute)

app.listen("5000", ()=>{
    console.log('Server runs!!');
})