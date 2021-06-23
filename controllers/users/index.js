const mongoose = require('mongoose')
const {Users} = require('../../models/users')

var createUser = (userInfo) => {
    var emailExists = Users.findOne({email: userInfo.email})
    if(emailExists) return 'Email Already Exists'
    var user = new Users(userInfo)
    return user;
}


var updateUser = (id, userInfo) => {
    var update = Users.updateOne({_id: id}, userInfo)
    if(update == null) return "User Not Found"
    return "User Updated"
} 


var deleteUser = (id) => {
    var userExists = Users.findOne({_id: id})
    if(userExists == null) return "User Doesn't Exist"
    var del = Users.findByIdAndDelete({ _id: id})
    return del;

}

var getUsers = (id) => {
    if(id == null) return Users.find()
    var user = Users.findById(id)
    if(user == null) return "User not Found!"
    return user
}

modules.exports = {createUser, updateUser, deleteUser, getUsers}