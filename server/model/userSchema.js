import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username:{type:String,required:true,trim:true},
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true,
    },
    phone:{
        type: String
    },
},
{
    timestamps:true
}
)

const usermodel=mongoose.model('users',userSchema)
export default usermodel