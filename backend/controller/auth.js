const { Console } = require('console');
const { validationResult } = require('express-validator');

const User = require('../models/user');

exports.signup = async(req,res,next) => {
    
    
    const errors = validationResult(req);
    
    // if(!errors.isEmpty()) return;
    
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;

    try{
        const userDetails = {
            fname : fname,
            lname : lname,
            email : email,
            password : password
        }
        
        const result = await User.save(userDetails);
        res.status(201).json({message : 'User registered'});
    }
    catch(err){
        if(!err.statusCode)
        {
            err.statusCode = 500;
        }
        next(err);
    }
}





