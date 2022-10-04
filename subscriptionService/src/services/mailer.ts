var nodemailer = require('nodemailer');
import nconf from "nconf";

export async function mailer(emaildata: any) {

  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: '',
      pass: ''
    }
  });
  try {
    let response = await transporter.sendMail(emaildata);
  } catch (error) {
    console.log(error);
  }

}