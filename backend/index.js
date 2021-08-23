const express = require('express');
const mssql = require('mysql2')
const bodyParser = require('body-parser');
const db = mssql.createConnection(
    {
        host : 'localhost',
        user : 'root',
        password : "",
        database : "RUTVAY"
    }
);


db.connect((err) => {
    if(err){
        console.log(err);
        throw err;
    }
    console.log("MySQL connected");
});



const errorController = require('./controller/error');
const authRoutes = require('./routes/auth');

var cors = require('cors');

const app = express();

const ports = process.env.PORT || 3000;

const User = require('../backend/models/user');
const { body } = require('express-validator');
const { wrapReference } = require('@angular/compiler/src/render3/util');


app.use(cors());

app.use(bodyParser.json()); 

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // used to create access to all the pages in website
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELTE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
    next();
});



app.post('/auth/login', (req,res)=>{
    const email = req.body.Email;
    const password = req.body.password;
    let sql = `SELECT * FROM user where email = ?`;
    let ress = new Promise((resolve, reject)=>{
        db.query(sql,email, (err,results)=> {
        if(err ) 
            reject("Soem thing went wrong" + err);
        else if(results.length===0)
            reject("USER NOT FOUND");
        else{
            resolve(results);
        }
        });
    }).then((result)=>{
        const pass = result[0].password;
        if(password===pass)
        res.send(result[0].fname);
        else
        res.send("Failure")
    })
    .catch((error) => {
        res.send(error);
    });
});

app.get('/calfetch/:email',(req,res)=>{
    const email = req.params.email;
    let sql = `SELECT calories, date FROM user where email = ?`;
    let ress = new Promise((resolve, reject)=>{
        db.query(sql,email, (err,results)=> {
        if(err) 
            reject("Some thing went wrong" + err);
        else
            resolve(results);
        });
    }).then((result)=>{
        var today = new Date(); 
        var val = (today - result[0].date) / (1000 * 3600 * 24);
        let cal = 0;
        if(val >= 1)
        {
            result[0].calories = 0;
            let query = `UPDATE user SET date = ?, calories = ? where email = ?`;
            let updateDate = new Promise((resolve, reject)=>{
                db.query(query,[today,cal,email], (err,results)=> {
                if(err) {
                    reject("Some thing went wrong" + err);
                }
                else
                    resolve(results);
                });
            });
        }  
        res.send(result[0]);
    })
    .catch((error) => {
        res.send(error);
    });
});


// posting the calories
app.put('/cal/:email', (req,res) =>{
    const email = req.params.email;
    const calories = req.body.calorie;
    const result = {
        Status : 500,
        message : "Success"
    };
    let query = `UPDATE user SET calories = ${calories} where email = ?`;
    let ress = new Promise((resolve, reject)=>{
        db.query(query,email, (err,results)=> {
        if(err) {
            reject("Some thing went wrong" + err);
        }
        else
            resolve(results);
        });
    }).then((result)=>{
        res.send(result);
    })
    .catch((error) => {
        res.send(error);
    });
});




app.use('/auth',authRoutes);

app.use(errorController.get404);

app.use(errorController.get500);



app.listen(ports, ()=> {
    console.log(`Listning on port ${ports}`);
});





