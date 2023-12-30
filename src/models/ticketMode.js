
import mongoose from "mongoose"

const dbUrl = "mongodb://localhost:27017/Users";

mongoose.connect(dbUrl,{useNewUrlParser:true})

const UserSchema = {

    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
    
}

const SchemaObj = new mongoose.Schema(UserSchema)


export const UserData = mongoose.model("users",SchemaObj)


//UserData.create({username:"Saurabh",email:"saurabh@gmail.com",password:"saurabh"})

