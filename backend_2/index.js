const express = require('express')
const Joi = require('joi');


const app = express();

const ports = process.env.PORT || 3000;

app.post('/signup',(res,req) => {

    
});

















app.listen(ports, ()=> {
    console.log(`Listning on port ${ports}`);
});
