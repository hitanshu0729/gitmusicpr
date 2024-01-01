import express from 'express';
import fs from 'fs';
import "./db/conn.mjs";
// const bcrypt = require('bcrypt');
import bvrypt from 'bcrypt';
import hbs from 'hbs';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './models/registerations.mjs'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const partialsPath = path.join(__dirname, '../views/partials'); // Adjust the path based on your project structure
// console.log(partialsPath);
const port=process.env.PORT||3000;
app.set("view engine","hbs");
app.use(express.static("./public"));

hbs.registerPartials(partialsPath);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// app.get("/", async(req, res) => {
//     try{
//         res.render('index.hbs');
//         console.log("home site working ")
//     }catch (error){
//         console.error(error);
//         res.status(500).render('Internal Server Error');
//     }
// });
app.get("/", async(req, res) => {
    try {
        res.render('index');
        console.log("home site working ")
    } catch (error) {
        console.error(error);
        res.status(500).render('Internal Server Error');
    }
});
app.get("/login", async(req, res) => {
    res.render("login");
});

app.post("/register", async (req, res) => {
    try {
        // Create a new instance of the User model with data from req.body
        const newUser = new User({
            name: req.body.uname,
            email: req.body.email,
            password: req.body.password
        });

        // Save the new user to the database
        const savedUser = await newUser.save();
        console.log(savedUser);
        res.status(201).send(savedUser);
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
});
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password= req.body.password;
        console.log(`${email} is your email`);
        const useremail = await User.findOne({ email: email });

        if (useremail && useremail.email === email && useremail && useremail.password === password) {
                res.sendFile('C:/Users/HP/Desktop/node/regform/backend/public/main.html');
        } else {
            res.send("<h1>Invalid login details</h1>");
        }
        console.log(useremail);
    } catch (e) {
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})