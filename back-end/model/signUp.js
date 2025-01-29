const mongoose = require('mongoose');
const signUpSchema = mongoose.Schema({
       username:{
        type:String,
        required:[true,"please add the contact name"],
        unique:true,
       },
       password:{
        type:String,
        required:[true,"please add pasword"]
       },
},
{
    timestamps:true,
}
)
module.exports=mongoose.model("signUp",signUpSchema);