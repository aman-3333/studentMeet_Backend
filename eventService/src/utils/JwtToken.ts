import { log } from "util";
import userDetails from "../models/userDetails";

const jwt = require("jsonwebtoken");

const  JWT_SECRET ="jp'anj;fqjkljxpf'jpxqjp'fjcjg;lk'";

let security: {
    sessionSecret:  'base64:Olvke97cjrcZg4ZYv2nlXxHTLNIs2XWFw9oVuH/OH5E=',
    sessionExpiration:  31536000, 
    saltRounds:  12,
}

exports.createJwtToken = (payload:any) => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" });
  
  return token;
};










