const mongoose = require('mongoose');
const studentSchema = mongoose.Schema({
       username:{
        type:String,
        required:[true,"please add the contact name"],
        unique:true,
       },
       password:{
        type:String,
        required:[true,"please add pasword"]
       },
       projectId: {
        type: String,
        required: [true, "Please add the project ID"],
        unique: true,
      },
},
{
    timestamps:true,
}
)
module.exports=mongoose.model("student",studentSchema);