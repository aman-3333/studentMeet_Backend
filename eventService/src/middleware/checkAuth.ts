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
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "365d" });
  return token;
};





module.exports = async (req:any, res:any, next:any) => {
    try {
        // check for auth header from client 
        const header = req.headers.authorization
console.log(header);

        if (!header) {
            next({ status: 403, message: "AUTH_HEADER_MISSING_ERR" })
            return
        }

        // verify  auth token
        const token = header.split("Bearer ")[1]
console.log("token",token);

        if (!token) {
            next({ status: 403, message: "AUTH_TOKEN_MISSING_ERR" })
            return
        }
        
        const userId = jwt.verify(token, JWT_SECRET);
        console.log(userId,"userId");
        if (!userId) {
            next({ status: 403, message: "JWT_DECODE_ERR" })
            return
        }

        const user = await userDetails.findOne({_id:userId.userId})

console.log(user,"user");

        if (!user) {
            next({status: 404, message: "USER_NOT_FOUND_ERR" })
            return
        }

        res.locals.user = user

        next()
    } catch (err) {
        next(err)
    }
}




