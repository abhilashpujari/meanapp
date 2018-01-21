const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
const jwtConfig = require('../config/jwt');
const commonHelper = require("../helpers/common-helper")();
const moment = require('moment');

/**
 * Create an user
 */
exports.register = function (req, res) {
    var user = new User(),
        email = req.body.email;

    user.email = email;
    user.password = req.body.password;
    user.username = commonHelper.getUsernameFromEmail(email);
    user.name = commonHelper.ucFirst(user.username);

    user.save(function(err, user) {
        if (err) {
            res.json({
                success  : false,
                message : 'Failed to register user'
            });
        } else {
            res.json({
                success  : true,
                message : 'User registered successfully'
            });
        }
    });
}

/**
 * Authenticate user
 */
exports.authenticate = function (req, res) {
    var email = req.body.email,
        password = req.body.password,
        query = {email : email},
        tokenExpiry = 604800 /* 1 week */;

    User.findOne(query, function(err, user) {
        if (err) throw err;
    
        if (user) {
            if (user.validatePassword(password)) {
                const token = jwt.sign(
                    {data : user}, 
                    jwtConfig.jwtSecret, 
                    {
                        expiresIn: tokenExpiry  
                    }
                );

                // Save the last login time
                user.lastLogin = new Date();
                user.save();

                res.json({
                    success : true,
                    token : token,
                    expiresIn : tokenExpiry,
                    user : {
                        id : user._id,
                        name : user.name,
                        username : user.username,
                        email : user.email
                    }
                });
            } else {
                res.json({
                    success : false,
                    message : 'Invalid password'
                });
            }
        } else {
            res.json({
                success : false,
                message : 'Invalid User'
            });
        }
    });
}

/**
 * Get User Profile
 */
exports.profile = function (req, res) {
    res.json({
        'id' : req.user.id,
        'username' : req.user.username,
        'name' : req.user.name,
        'email' : req.user.email
    });
}