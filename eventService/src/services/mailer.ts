var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
import nconf from "nconf";

export async function mailer(emaildata: any) {

  var transporter = nodemailer.createTransport({
    host: nconf.get("mailer_host"),
    port: 465,
    secure: true,
    auth: {
      user: 'info@toofunn.com',
      pass: 'toofunn@233518'
    }
  });
  try {
    let response = await transporter.sendMail(emaildata);
  } catch (error) {
    console.log(error);
  }

}