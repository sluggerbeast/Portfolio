
import mongoose from "mongoose"

const dbCloud = "mongodb+srv://seth:seth@clusterhero.eqyr7.mongodb.net/?retryWrites=true&w=majority"
const dbUrl = "mongodb://localhost:27017/saurabhSupport";

export default  mongoose.connect(dbCloud,{useNewUrlParser:true})

const OneTicketSchema = {

    uuid:{
        type:String
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    from:{
        type:String
    },
    message:{
        type:String
    },
    
    to:{
        type:String
    },
    timestamp:{
        type:String
    }
    
}

const TicketCollectionSchema = {

    ticketNo:{
        type:String
    },
    name:{
        type:String
    },
    email:{
        type:String
    }
    
}

const contactMeSchema = { /// this schema is for the contact me from

    name:{
        type:String
    },
    email:{
        type:String
    },
    subject:{
        type:String
    },
    msg:{
        type:String
    },
    
}

export const OneTicketSchemaObj = new mongoose.Schema(OneTicketSchema)

const TicketCollectionSchemaObj = new mongoose.Schema(TicketCollectionSchema)

const contactMeSchemaObj = new mongoose.Schema(contactMeSchema)

export const contactMeTable = mongoose.model("contactme",contactMeSchemaObj);

export const CommonTicketTable = mongoose.model("Ticket",OneTicketSchemaObj)
export const TicketCollectionTable = mongoose.model("TicketCollection",TicketCollectionSchemaObj)


//UserData.create({username:"Saurabh",email:"saurabh@gmail.com",password:"saurabh"})

