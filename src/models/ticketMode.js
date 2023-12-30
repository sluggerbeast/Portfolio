
import mongoose from "mongoose"

const dbUrl = "mongodb://localhost:27017/Users";
const dbCloud = "mongodb+srv://seth:seth@clusterhero.eqyr7.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(dbCloud,{useNewUrlParser:true})

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

