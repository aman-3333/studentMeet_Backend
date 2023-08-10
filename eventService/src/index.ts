import express, { Application } from "express";
import morgan from "morgan";
// import Router from "./routes";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import mongoose from "mongoose";
import Auth from "./middleware/authMiddleware";
import nconf from "nconf";
import setEnvironment from "./env";
const session = require('express-session');
import router from "./routes/fileUpload";
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
app.use(
  session({
    secret:"bsdhkw.NFK/JFW'K;JRHWF/J/rfG;",
    resave: false,
    saveUninitialized: true,
  })
);
/////////////Api Routes/////////////////////
import auth from "./routes/auth"
import academy from "./routes/academy";
import achivement from "./routes/achivements";
import bankdetail from "./routes/bankDetails";
// import category from "./routes/category";
import chat from "./routes/chat";
// import city from "./routes/city";
import followers from "./routes/followers";
import guidelines from "./routes/guidelines";
import index from "./routes/fileUpload";
import institute from "./routes/institute";
import post from "./routes/post";
import product from "./routes/product";
import fileUpload from "./routes/fileUpload";
import starPermormer from "./routes/starPermormer";
import sponsorship from "./routes/sponsor";
import sportsBrand from "./routes/sportsBrand";
import sponsorsPartner from "./routes/sponsorsPartner";
import sponsorshipForm from "./routes//sponsorshipForm";
import state from "./routes/state";
import user from "./routes/userDetails";
import vendor from "./routes/vendorShop";
 import role from "./routes/role";

app.use("/api/auth", auth);
app.use("/api/academy", academy);
app.use("/api/achivement", achivement);
app.use("/api/bankdetail", bankdetail);

// app.use("/api/category", category);
app.use("/api/chat", chat);
// app.use("/api/city", city);
app.use("/api/follower", followers);
app.use("/api/fileUpload", fileUpload);
app.use("/api/guidelines", guidelines);1
app.use("/api/index", index);


app.use("/api/institute", institute);
app.use("/api/post", post);
app.use("/api/product", product);
app.use("/api/starPermormer", starPermormer);
app.use("/api/sponsorship", sponsorship);
app.use("/api/sportsbrand", sportsBrand);
app.use("/api/sponsorsPartner", sponsorsPartner);
app.use("/api/sponsorshipForm", sponsorshipForm);
app.use("/api/location", state);
app.use("/api/user", user);
app.use("/api/vendorshop", vendor);
app.use("/api/role", role);

























//////////////////////////////////////////////////
//  app.use("/eventService", Auth.authManagement,router);

const server:any = http.createServer(app);
const io = require("socket.io")(server,{
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
    socket.join(id)

;



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
    
    socket.leave(id)

;
   });
  

  
});
setEnvironment();

mongoose.connect(nconf.get('mongodb'),
  {
    useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true
  }).then(() => {
  console.log("Connected to  DB for auth api");
}).catch((error:any) => {
  console.log(error)
})


server.listen(nconf.get('port'), () => {
  console.log("event Service is running on port", nconf.get('port'));

});
server.timeout = 1000000;
// typescript

