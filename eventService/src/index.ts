import express, { Application } from "express";
import morgan from "morgan";
// import Router from "./routes";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import mongoose from "mongoose";
import Auth from "./middleware/authMiddleware";
import nconf from "nconf";
import setEnvironment from "./env";
import morganMiddleware from './middleware/morganMiddleware';
import Logger from "./lib/logger";
import router from "./routes";
const http = require('http');
const PORT = process.env.PORT || nconf.get('port');

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use("/eventService", Auth.authManagement, router);
app.use(morganMiddleware)
const server1:any = http.createServer(app);
const io = require("socket.io")(server1,{
  pingTimeout: 20000,
pingInterval: 25000,
  cors: {
    origin: "*",
    credentials: true,
  },
});


// !

io.on("connection", (socket:any) => {

  socket.on("setup", (userData:any) => {
    
    let id=userData.token_data.userid;
    // console.log(id)

    // socket.join(userData._id);
    socket.join(id);



    // console.log(userData,"userData")
    socket.emit("connected");

   

  });


  // !1
  socket.on("join chat", (room:any) => {
    socket.join(room);
    // console.log("User Joined Room: " + room);

  });
 /*  socket.on("typing", (room:any) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room:any) => socket.in(room).emit("stop typing")); */

  socket.on("new message", (newMessageRecieved:any) => {
   
    var chat = newMessageRecieved.chat;
   
    if (!chat.users) return ("chat.users not defined");

    chat.users.forEach((user:any) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
     /*  // !
      socket.in(newMessageRecieved._id).emit("message2",newMessageRecieved);
      //! */
    });
  });

 
 /*  socket.on('forceDisconnect', function(){
    console.log("disconnect")
    socket.disconnect(true);
    console.log("disconnect 1")
}); */
   socket.on("setupl", (id:any) => {
    
    socket.leave(id);
   });
  

  
});
setEnvironment();

mongoose.connect(nconf.get('mongodb'),
  {
    useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:true
  }
  // ,
  // () => {
  //   console.log("Connected to edneed DB for auth api");
  // }
).then(() => {
  console.log("Connected to  DB for auth api");
}).catch((error:any) => {
  console.log(error)
})


var server = app.listen(nconf.get('port'), () => {
  console.log("event Service is running on port", nconf.get('port'));
  Logger.debug(`Server is up and running @ http://localhost:${nconf.get('port')}`);
});
server.timeout = 1000000;
// typescript