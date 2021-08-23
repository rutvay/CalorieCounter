const express = require('express');

const {body} = require('express-validator');
const { Module } = require('module');
const { promises } = require('stream');

const router = express.Router();

const User = require('../models/user');

const authController = require('../controller/auth');

router.post(
    '/signup',
    [
        body('fname').trim().not().isEmpty(),
        body('lname').trim().not().isEmpty(),
        body('email').isEmail().withMessage("Please enter a valid email")
        .custom(async(email)=>{
            
            const user = await User.find(email);
            if(user[0].length>0){
                return Promise.reject("Email already exsist");
            }
        })
        .normalizeEmail(),
        body('password').trim()
    ], authController.signup
)


module.exports = router;

