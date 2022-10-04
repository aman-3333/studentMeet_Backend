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

app.use("/", Auth.authManagement, router);
app.use(morganMiddleware)

setEnvironment();

mongoose.connect(nconf.get('mongodb'),
  {
    useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true
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
  console.log("Auth Service is running on port", nconf.get('port'));
  Logger.debug(`Server is up and running @ http://localhost:${nconf.get('port')}`);
});
server.timeout = 1000000;
// typescript