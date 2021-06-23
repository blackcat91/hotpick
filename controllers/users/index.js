const mongoose = require('mongoose')
const {Users} = require('../../models/users')
const bcrupt = require('bcrypt')

var createUser = async (userInfo) => {
    var emailExists = await Users.findOne({email: userInfo.email})
    if(emailExists) return 'Email Already Exists'
    userInfo.password = await bcrypt.hash(userInfo.password, saltRounds);
    var user = new Users(userInfo)
    return user;
}


var updateUser = async (id, userInfo) => {
    var update = await Users.updateOne({_id: id}, userInfo)
    if(update == null) return "User Not Found"
    return "User Updated"
} 


var deleteUser = async (id) => {
    var userExists = await Users.findOne({_id: id})
    if(userExists == null) return "User Doesn't Exist"
    var del = await Users.findByIdAndDelete(id)
    return del;

}


//Grabs users, If id and userInfo is blank then granb

var getUsers = async (id, userInfo) => {
    var correctPass;
    var user;
    if(id == null){
        if(userInfo == null) return "Please pass some data."
        user = await Users.findOne({email : userInfo.email})
        if(!user) return "User not Found!"
        correctPass = await bcrypt.compare(userInfo.password, user['password'])
        if(!correctPass) return 'Password Incorrect'
        return user

    }
    
    user = await Users.findById(id)
    if(!user) return "User not Found!"
    correctPass = await bcrypt.compare(userInfo.password, user['password'])
    if(!correctPass) return 'Password Incorrect'
    return user
}

modules.exports = {createUser, updateUser, deleteUser, getUsers}