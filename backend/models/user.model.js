const mongoose, { Schema } = require("mongoose");

const user_Schema = new Schema({
    userName:{
        type:"String",
        required:true,
        unique:true,
        trim: true,
        minLength: 3
    }
},
{
    timestamps:true
})

const User= mongoose.model("User",user_Schema);

module.exports=User;