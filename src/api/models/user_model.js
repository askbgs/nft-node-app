const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

var userschema = new Schema ({
    name : {
        type:String,
        required:true
    },
    phone : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    dateofbirth : {
        type:String
    },
    profile_pic : {
        type:String
    },
    account_has : {
        type:Boolean,
        default:false
    },
    password : {
        type:String,
        required:true
    }
})

userschema.plugin(uniqueValidator);

userschema.pre('save', function(next) {
    var user = this;
    if(this.isModified('password') || this.isNew)
    {
        bcrypt.genSalt(10, function(err,salt){
            if(err)
            {
                return next(err)
            }
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err)
                {
                    return next(err)
                }
                user.password = hash;
                next()
            })
        })
    }
    else
    {
        return next()
    }
})

userschema.methods.comparePassword = function(passw, next){
    bcrypt.compare(passw, this.password, function(err, isMatch){
        if(err)
        {
            return next(err)
        }
        next(null,isMatch)
    })
}

module.exports = mongoose.model('User', userschema);

    
