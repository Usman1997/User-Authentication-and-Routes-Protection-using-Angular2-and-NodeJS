var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs');
var config = require('../config/database');

const UserSchema = mongoose.Schema({

  name : {type:String},
  email :{type:String,required:true},
  username :{type:String,required:true},
  password:{type:String,required:true}


});
const User = module.exports = mongoose.model('User',UserSchema);

module.exports.getUserById = function(id,callback){
    User.findById(id,callback);
}

module.exports.getUserByUsername = function(username,callback){
    const query = {username:username}
    User.findOne(query,callback);1
}
module.exports.addUser = function(newUser,callback){

    bcryptjs.genSalt(10,(err,salt)=>{
    bcryptjs.hash(newUser.password,salt,(err,hash)=>{
        if(err)
        throw err;
        newUser.password = hash;
        newUser.save(callback);
    });

    });

}

module.exports.comparePassword = function(candidatePassword,hash,callback){
    bcryptjs.compare(candidatePassword,hash,(err,isMatch)=> {
       if(err) throw err;
       callback(null,isMatch);
    });
}