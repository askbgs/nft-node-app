const mongoose = require('mongoose')
const User = require('../models/user_model')
const jwt = require('jwt-simple');
const { use } = require('../emojis');
const jwttoken = require('jsonwebtoken');
const fs = require('fs')
var validator = require("email-validator");

async function addNewuser(req, res)
{
    var newUser = User({
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        password:req.body.password
    });

    let emailVlaidate = validator.validate(req.body.email);

    if(emailVlaidate)
    {
        await newUser.save(function(err, newuser){
            if(err)
            {
                res.status(403).json({success: false, msg:'failed to save'})
                console.log(err)
            }
            else
            {
                res.status(200).json({success: true, msg:'Successflly Savec'})
            }
        })
    }
    else
    {
        res.status(401).json({success: false, msg:'Incorrect email format'})
    }
}


async function authentcate(req, res)
{
    await User.findOne({
        email:req.body.email
    }, function(err, user){
        if(err) throw err
        if(!user)
        {
            res.status(403).send({success:false, msg:'Authentication failed'})
        }
        else
        {
            user.comparePassword(req.body.password, function(err,isMatch){
                if(isMatch && !err)
                {
                    let privateKey = fs.readFileSync('./private.pem', 'utf8');
                    let token = jwttoken.sign({ "body": user }, privateKey, { algorithm: 'HS256'});
                    //var token = jwt.encode(user,'flutter1981');
                    res.status(200).json({success:true, authtoken:token,user_id:user._id})
                }
                else
                {
                    res.status(403).send({success:false, msg:'Authentication failed'})
                }
            })
        }
    })
}

module.exports = {
    addNewuser,
    authentcate,
}