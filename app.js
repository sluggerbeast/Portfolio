
import express from "express"
import cors from "cors"
import { getGlobals } from 'common-es'
const { __dirname, __filename } = getGlobals(import.meta.url)
import {TicketCollectionTable, OneTicketSchemaObj, CommonTicketTable, contactMeTable} from "./src/models/auth.js"
const app = express()
const UserData = null
import {Server} from "socket.io"
import {createServer} from "node:http"
import {WebSocketServer} from "ws"
import mongoose from "mongoose"
import path from "path"
import exp from "node:constants"

//---------------------------------------------------------------
////git push -u origin main----------------------------------------
//------------------------------------------------------------
// const wss = new WebSocketServer({ port: 8002 });// web socket example using ws library works with post man

// wss.on('connection', function connection(ws) {
//   ws.on('message', function message(data) {
//     console.log('received: %s', data);
//   });

//   ws.send('something');
// });

const socketServer = createServer()




app.use(cors())



  // to just check the server working
app.get("/get",(req,res)=>{
    console.log("get request");
    
    res.send("<h1>Server is acitive<h1>")
})
app.use(cors())
app.use(express.json());
app.post("/chat",(req,res)=>{ ///// this end point is doing the ticket creation, checks for the uuid if it exists in the ticket collections, if not then will create an entry in the table or collection.
    res.set('Access-Control-Allow-Origin', '*');
    console.log(req.body.ticketNo)
    TicketCollectionTable.findOne({"ticketNo":req.body.ticketNo}).then((r)=>{
        console.log(r)
        if(r==null){
            const data1 = {

                "ticketNo":req.body.ticketNo,
                "name":req.body.name,
                "email":req.body.email
                
            }
            console.log(data1)
        TicketCollectionTable.create(data1).then((r)=>{console.log(`data added ${r}`)
        
            }).catch((e)=>{console.log(`error ${e}`)})
        }
    }).catch((e)=>{console.log(`error from DB ${e}`)})


    
    
})

app.use(cors())
app.use(express.json());
app.post("/getchat",(req,res)=>{ /// this end point gets all the chat of the current chat selected.
    res.set('Access-Control-Allow-Origin', '*');
    console.log("contact with server")
    const TicketTable = mongoose.model(req.body.ticketNo,OneTicketSchemaObj)

    ////{"uuid":req.body.ticketNo}
    TicketTable.find({
        $or: [
          { "uuid":req.body.ticketNo },
          { "to": req.body.ticketNo }
        ]
      }).then((r)=>{
        
        //const msgHistory = { sender: "agent", Msg: "Hello, I am saurabh.\n Welcome to the chat." }
        //res.send(r);//console.log(r);
    
    }).catch((e)=>{console.log(`error ${e}`)})

    CommonTicketTable.find({
        $or: [
          { "uuid":req.body.ticketNo },
          { "to": req.body.ticketNo }
        ]
      }).then((r)=>{ //// new code for retriving current chat from a common chat table.
        
        //const msgHistory = { sender: "agent", Msg: "Hello, I am saurabh.\n Welcome to the chat." }
        res.send(r);console.log(r);
    
    }).catch((e)=>{console.log(`error ${e}`)})

        
})

app.use(cors())
app.use(express.json());
app.get("/tickets",(req,res)=>{ //// this end points gets all the entries in the ticketCollection table for the admin panel ticket info area.
         res.set('Access-Control-Allow-Origin', '*');
        TicketCollectionTable.find(req.body).then((r)=>{ r.reverse(); res.send(r);console.log(r)}).catch((e)=>{console.log(`error ${e}`)})
        
})

app.use(cors())
app.use(express.json());
app.post("/contactemail",(req,res)=>{ //// this get triggred from the contact me form 
    res.set('Access-Control-Allow-Origin', '*');
    console.log(req.body)
    // const contactMsg = {
        
    //     name:cName,
    // email:Cemail,
    // subject:Csubject,
    // msg:Cmsg}
            

    contactMeTable.create(req.body).then((r)=>{console.log("email recv ")}).catch((e)=>{console.log(`error ${e}`)})
})
 
app.use(cors())
app.use(express.json());
app.post("/signup",(req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    console.log(req.body)
    res.json(req.body)
    const data = {
        "username":req.body.fname,
        "email":req.body.email,
        "password":req.body.password
    }
    UserData.create(data).then((r)=>{console.log("data added ")}).catch((e)=>{console.log(`error ${e}`)})
})

app.use(express.json());
app.post("/login",(req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    console.log(req.body)
    res.json(req.body)
    const data = {
        "email":req.body.email,
        "password":req.body.password
    }
    UserData.findOne(data).then((r)=>{console.log(r)}).catch((e)=>{console.log(`error with /chat getting chat data: ${e}`)})
})

app.use(express.static(path.join(__dirname, "src/dist")));
app.use(express.static("public"));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/dist', 'index.html'));
});
const PORT= process.env.PORT || 8001;
const mainServer = app.listen(PORT,()=>{console.log("Chat Application server started. . .")});

var io =new Server(mainServer,{
    cors: {
      origin: ['http://localhost:5173'],
    }
  }
    
    );

let chatRoom = ''; // E.g. javascript, node,...
let allUsers = []; 
const socList= new Map();

// Set Map Values



// io.use((socket, next) => {
//     const userId = socket.handshake.auth.userId;
//     //console.log(userId)

//     // validation here using database ( for future improvement)
//     if (!userId) {
//       return next(new Error("invalid userID"));
//     }
//     socket.userId = userId;
//     next();
//   });

io.on('connection', (socket) => { 
    console.log("socket connected id: "+socket.id)
    // socket.on('send_message', (msg) => { 
    //     io.emit('send_message', (msg)); 
    // });
    
    const adminId = "12345";
    // socket.onAny((event, ...args) => {
    //     console.log(event, args);
    //   });

    
    socket.on("joinChat_admin",(soc)=>{
        const [username,room] = soc
        // socket.join(room)
        //console.log(`this is ${typeof username}`)
        allUsers.push({id:socket.id,username,room})
        socList.set(username, socket.id);
        console.log(socList)
        let ChatRoomUsers = allUsers.filter((user)=>user.room==room)
        //console.log(ChatRoomUsers)
        socket.on("send_privmsg",(data)=>{
            console.log(data)
            const [sender,message,to] = data;
            const toSock = socList.get(to)
            const sendSock = socList.get(sender)
            console.log(sendSock)

            /// this is where the message sent from the support chat box is recieved

            /// I will add the logic of adding the chat messages to DB here

           const ticketData= {uuid:sender,
            name:sender,
            email:"",
            from:sender,
            message:message,
            to:to,
            timestamp:""
        }

        if(ticketData.uuid!="12345"){
            const TicketTable = mongoose.model(ticketData.uuid,OneTicketSchemaObj)
        TicketTable.create(ticketData).then((res)=>{
                 console.log(res)
         }).catch((e)=>{console.log(`problem with adding message to DB: ${e}`)})
        }else{
            const TicketTable = mongoose.model(ticketData.to,OneTicketSchemaObj)
        TicketTable.create(ticketData).then((res)=>{
                 console.log(res)
         }).catch((e)=>{console.log(`problem with adding message to DB: ${e}`)})
        }
       

         CommonTicketTable.create(ticketData).then((res)=>{
            console.log(res)
    }).catch((e)=>{console.log(`problem with adding message to DB: ${e}`)})


            socket.to(toSock).emit("rcv_privmsg",{
                "sender":sender,
                "Msg":message
            })
            // socket.to(sendSock).emit("rcv_privmsg",{
            //     "sender":sender,
            //     "Msg":message
            // })

        })
        
    });

    //console.log(Users)
    socket.on('my_support_chat', (msg) => { 
        //     /// this is where the message sent from the support chat box is recieved

        //     /// I will add the logic of adding the chat messages to DB here

        //    const ticketData= {uuid:msg.uuid,
        //     name:msg.name,
        //     email:msg.email,
        //     from:msg.from,
        //     message:msg.message,
        //     timestamp:msg.timestamp
        // }

        
        // // const TicketTable = mongoose.model(ticketData.uuid,OneTicketSchemaObj)
        // // TicketTable.create(ticketData).then((res)=>{
        // //         console.log(res)
        // // }).catch((e)=>{console.log(`problem with adding message to DB: ${e}`)})
        

        // io.emit('my_support_chat', (msg)); 
    });
    
  
    
}); 

