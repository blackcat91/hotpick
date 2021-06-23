const mongoose = require('mongoose')
const {Users} = require('../../models/users')
const bcrupt = require('bcrypt')
var {registerValidation, loginValidation} = require('../../helpers/validation')
const saltRounds = 7;


var createUser = async (userInfo) => {
    
    const {error} = registerValidation(userInfo)
    if(error) return res.status(400).send(error.details[0].message);
    var emailExists = await Users.findOne({email: userInfo.email})
    if(emailExists) return 'Email Already Exists'
    userInfo.password = await bcrypt.hash(userInfo.password, saltRounds);
    var user = new Users(userInfo)
    var savedUser = await user.save()
    return savedUser;
}


var updateUser = async (id, userInfo) => {
   
    
    var update = await Users.updateOne({_id: id}, userInfo)
    if(update == null) return "User Not Found"
    return update
} 


var deleteUser = async (id) => {
    var userExists = await Users.findOne({_id: id})
    if(userExists == null) return "User Doesn't Exist"
    var del = await Users.findByIdAndDelete(id)
    return del;

}


//Grabs users, If id and userInfo is blank then granb

var getUsers = async ({id, userInfo}) => {
    var correctPass;
    var user;
    if(id == null){
        if(userInfo == null) return "Please pass some data."
        const {error} = loginValidation(userInfo)
        if(error) return res.status(400).send(error.details[0].message);
        user = await Users.findOne({email : userInfo.email})
        if(!user) return "User not Found!"
        correctPass = await bcrypt.compare(userInfo.password, user['password'])
        if(!correctPass) return 'Password Incorrect'
        return user

    }
    
    user = await Users.findById(id)
    if(!user) return "User not Found!"
    return user
}

module.exports = {createUser, updateUser, deleteUser, getUsers}