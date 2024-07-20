const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 name:String,
 email:String,
 password:String  
});

// const clientschema  = new mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
//     },
//     email:{
//         type:String,
//         unique:true,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     }
// })

module.exports = mongoose.model("users",userSchema);