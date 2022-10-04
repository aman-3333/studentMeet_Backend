import winston from 'winston' ; 

var fs = require('fs');
var S3StreamLogger = require('s3-streamlogger').S3StreamLogger;
const AWS = require('aws-sdk');
const ID = 'AKIA6FN4CWVNS6NZTMMN';
const SECRET = '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';
const BUCKET_NAME = 'edneed-images-uat'


const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const level = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}
winston.addColors(colors)

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.json() , 
)


var s3_stream = new S3StreamLogger({
bucket:BUCKET_NAME ,
access_key_id: ID,
secret_access_key: SECRET , 
folder: "edminpanel",
// maxFileSize:5242880 //, //5MB

});


const transports = [
  new (winston.transports.Stream)({
    stream: s3_stream , 
  })
]



const Logger = winston.createLogger({
  
  level: level(),
  levels,
  format,
  transports,
})
export default Logger
