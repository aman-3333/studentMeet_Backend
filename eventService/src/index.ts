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
const socketIO = require("socket.io");
const CryptoJS = require("crypto-js");
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
import academytype from "./routes/academyType";
import academysubtype from "./routes/academySubType";
import academyOwner from "./routes/academyOwner";
import academyRepresentative from "./routes/academyRepresentative";
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
import sponsorsRepresentative from "./routes/sponsorRepresentative";
import sponsorshipForm from "./routes/sponsorshipForm";
import sports from "./routes/sportsCategory";
import state from "./routes/state";
import school from "./routes/school";
import schoolOwner from "./routes/schoolOwner";
import schoolInfrastructure from "./routes/schoolInfrastructure";
import scholarship from "./routes/scholarship.routes";
import scholarshipApplication from "./routes/scholarshipApplication.routes";
import starPerformer from "./routes/starPermormer";
import tournament from "./routes/tournament.route";
import tournamentMATCH from "./routes/tournament.route";
import stage from "./routes/stage";
import notification from "./routes/notification";
import user from "./routes/userDetails";
import vendor from "./routes/vendorShop";
import servicePurchase from "./routes/servicePurchase";
 import role from "./routes/role";

app.use("/api/auth", auth);
app.use("/api/academy", academy);
app.use("/api/academy/type", academytype);
app.use("/api/academy/subtype", academysubtype);
app.use("/api/academy/owner", academyOwner);
app.use("/api/academy/representative", academyRepresentative);
app.use("/api/achivement", achivement);
app.use("/api/bankdetail", bankdetail);
app.use("/api/service", servicePurchase);
// app.use("/api/category", category);
app.use("/api/chat", chat);
app.use("/api/connection", followers);
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
app.use("/api/sponsor/representative", sponsorsRepresentative);
app.use("/api/sponsorshipForm", sponsorshipForm);
app.use("/api/sports", sports);
app.use("/api/school", school);
app.use("/api/school/owner", schoolOwner);
app.use("/api/notification", notification); 
app.use("/api/tournament", tournament);
app.use("/api/tournament/match", tournamentMATCH);
app.use("/api/stage", stage);
app.use("/api/location", state);
app.use("/api/scholarship", scholarship);
app.use("/api/school/infrastructure", schoolInfrastructure);
app.use("/api/scholarship/application", scholarshipApplication);
app.use("/api/starperformer", starPerformer);
app.use("/api/location", state);
app.use("/api/user", user);
app.use("/api/vendorshop", vendor);
app.use("/api/role", role);






















//////////////////////////////////////////////////
//  app.use("/eventService", Auth.authManagement,router);

const server:any = http.createServer(app);
// const io = require("socket.io")(server,{
//   pingTimeout: 20000,
// pingInterval: 25000,
//   cors: {
//     origin: "*",
//     credentials: true,
//   },
// });

console.log(server,"server")
const io = socketIO(server);
console.log(io,"io")


io.on("connection", (socket:any) => {
  // ...

  socket.on("chat message", (msg:any) => {
    const encryptedMessage = CryptoJS.AES.encrypt(
      msg,
      "secret passphrase"
    ).toString();
    socket.broadcast.emit("chat message", encryptedMessage);
  });
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
   socket.on("typing", (room:any) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room:any) => socket.in(room).emit("stop typing")); 

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


  socket.on("chat message", (msg:any) => {
    const encryptedMessage = CryptoJS.AES.encrypt(
      msg,
      "secret passphrase"
    ).toString();
    socket.broadcast.emit("chat message", encryptedMessage);
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

