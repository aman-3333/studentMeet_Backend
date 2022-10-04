import express, { Application } from "express";
import morgan from "morgan";
import Router from "./routes";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import mongoose from "mongoose";

import nconf from "nconf";
import setEnvironment from "./env";



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
app.use("/subscriptionService", Router);
setEnvironment();

mongoose.connect(nconf.get('mongodb'), 
  {
    useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true 
  }, 

  () => {
    console.log("Connected to database");
  }
);

app.listen(nconf.get('port'), () => {
  console.log("api is running on port", nconf.get('port'));
});
// typescript