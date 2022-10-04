import express, { Application } from "express";
import morgan from "morgan";
import Router from "./routes";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import mongoose from "mongoose";
import Auth from "./middleware/authMiddleware";
import nconf from "nconf";
import setEnvironment from "./env";
import morganMiddleware from './middleware/morganMiddleware' ; 
import Logger from "./lib/logger";

const PORT = process.env.PORT || nconf.get('port');

const http = require('http');

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

// !todo
const server = http.createServer(app);
// !imp
const io = require("socket.io")(server, {
  pingTimeout: 20000,
pingInterval: 25000,
  cors: {
    origin: "*",
    credentials: true,
  },
});


// !

io.on("connection", (socket:any) => {
  console.log("Connected to socket.io",);
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
    console.log("new message",newMessageRecieved)
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
    console.log("USER DISCONNECTED",id);
    socket.leave(id);
   });
  

  
});
// !imp-end


// !todo


app.use("", Router);
app.use(morganMiddleware)

setEnvironment();

mongoose.connect(nconf.get('mongodb'),
  {
    useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true
  },
  () => {
    console.log("Connected to edneed DB for chat api");
  }
);



server.listen(nconf.get('port'), () => {
  console.log(`listening on  ,${nconf.get('port')}`);
});
// TODO
// app.listen(nconf.get('port'), () => {
//   console.log("Auth Service is running on port", nconf.get('port'));
//   Logger.debug(`Server is up and running @ http://localhost:${nconf.get('port')}`);
// });
// todo