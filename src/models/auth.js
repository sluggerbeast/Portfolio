
import mongoose from "mongoose"


const dbUrl = "mongodb://localhost:27017/saurabhSupport";

export default  mongoose.connect(dbUrl,{useNewUrlParser:true})

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

export const OneTicketSchemaObj = new mongoose.Schema(OneTicketSchema)

const TicketCollectionSchemaObj = new mongoose.Schema(TicketCollectionSchema)


 //const TicketTable = mongoose.model("Ticket",OneTicketSchemaObj)
export const TicketCollectionTable = mongoose.model("TicketCollection",TicketCollectionSchemaObj)


//UserData.create({username:"Saurabh",email:"saurabh@gmail.com",password:"saurabh"})

