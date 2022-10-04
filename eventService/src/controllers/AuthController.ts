// //npm libraries
// import * as jwt from "jsonwebtoken";
// import moment, { now } from "moment";
// import async, { nextTick } from "async";
// import bcrypt from "bcryptjs";
// import mongoose, { ObjectId } from "mongoose";
// //Edneed objects
// import Users, { IUser } from "../models/Users";
// import institute from "../models/institute.model";
// import Userrole from "../models/userrole.model";
// import profileModel from "../models/publicprofile";
// import profileInfoModel from "../models/personalinfo";
// import profileContactModel from "../models/profilecontact";
// import Domains from "../models/Domain";
// import { IEdneedResponse, IError, IOtp } from "../models/Interfaces";
// import Tokens, { IToken } from "../models/Tokens";
// import * as constants from "../utils/Constants";
// import nconf from "nconf";
// import { isUnparsedPrepend, tokenToString } from "typescript";
// import { mailer } from "../services/mailer";
// import { emailExistance } from "../services/emailExistance";
// import { generateOtp } from "../services/generateOtp";
// import { verifyOtp } from "../services/verifyOtp";
// import Otp from "../models/Otp";
// import { baseUrl } from "../middleware/authMiddleware";
// import instituteModel from "../models/institute.model";
// import SignupOtp from "../models/SignupOtp";
// import userroleModel from "../models/userrole.model";
// // import SignupOtp from "../models/SignupOtp";

// const fs = require("fs");
// const Hogan = require("hogan.js");
// const saltRounds = 10;

// function generateOTP(length: Number) {
//   var digits = "1234567890";
//   let OTP = "";
//   for (let i = 0; i < length; i++) {
//     OTP += digits[Math.floor(Math.random() * 10)];
//   }
//   return OTP;
// }
// function generateToken(length: Number) {
//   var digits = "1234567890";
//   let token = "";
//   for (let i = 0; i < length; i++) {
//     token += digits[Math.floor(Math.random() * 10)];
//   }
//   return token;
// }
// async function sendOtpPrivateDomain(phone: any, body: any) {
//   let otp = generateOTP(6);
//   let resp = await generateOtp(phone, otp);

//   if (resp.Status == "Success") {
//     const otpInfo = await Otp.findOne({
//       contact: body.contact,
//       country_code: body.country_code,
//     }).lean();
//     const userInfo = await Users.findOne({ contact: body.contact }).lean();
//     if (userInfo) {
//       const user = await Users.findOne({
//         contact: body.contact,
//         country_code: body.country_code,
//       }).lean();
//       if (!user) {
//         await Users.findOneAndUpdate(
//           { contact: body.contact },
//           { $set: { country_code: body.country_code } }
//         );
//       }
//     }
//     if (!otpInfo) {
//       const info = new Otp({
//         contact: body.contact,
//         country_code: body.country_code,
//         otp: otp,
//         otpId: resp.Details,
//       });
//       const data = await info.save();
//     } else {
//       await Otp.findOneAndUpdate(
//         { contact: body.contact, country_code: body.country_code },
//         { otp: otp, otpId: resp.Details }
//       );
//     }
//   }
//   return resp;
// }

// export default class AuthController {
//   public async login(
//     email: string,
//     password: string
//   ): Promise<IEdneedResponse | IError> {
//     const user = await this.getUser(email, password);
//     if (user) {
//       const instituteInfo = await institute
//         .findOne({ _id: user.institute })
//         .lean();
//       const userRoleInfo :any = await userroleModel
//         .findOne({ role: user.activeRole,institute:user.institute,user:user._id })
//         .lean();
//       const userToken = await this.getNewToken(user);
//       user.token = userToken.token;
//       user.refreshToken = userToken.refreshToken;
//       return {
//         status: 201,
//         statusText: constants.SUCCESS,
//         data: user,
//         institute: instituteInfo,
//         user_role:userRoleInfo,
//         token_data: userToken,
//       };
//     } else {
//       return {
//         status: 401,
//         statusText: constants.FAILED,
//         message: constants.UNAUTHORIZED_USER,
//       };
//     }
//   }

//   public async sendContactVerifyOtp(body: any) {
//     let phone = body.country_code.toString() + body.contact.toString();
//     let otp = generateOTP(6);
//     let count = 0;
//     let ContactExists = false;
//     const allContact = await Users.find({ contact: body.contact }).lean();
//     if (allContact.length > 0) {
//       for (let i = 0; i < allContact.length; i++) {
//         if (
//           body.contact == allContact[i].contact &&
//           body.userId == allContact[i]._id
//         ) {
//           count = count + 1;
//         }
//       }
//       if (count > 0) {
//         ContactExists = false;
//       } else {
//         ContactExists = true;
//       }
//     } else {
//       ContactExists = false;
//     }

//     if (!ContactExists) {
//       let resp = await generateOtp(phone, otp);
//       // console.log(resp);
//       if (resp.Status == "Success") {
//         const otpInfo = await Otp.findOne({
//           contact: body.contact,
//           country_code: body.country_code,
//         }).lean();
//         if (!otpInfo) {
//           const info = new Otp({
//             contact: phone,
//             country_code: body.country_code,
//             otp: otp,
//             otpId: resp.Details,
//           });
//           const data = await info.save();
//         } else {
//           await Otp.findOneAndUpdate(
//             { contact: body.contact, country_code: body.country_code },
//             { otp: otp, otpId: resp.Details }
//           );
//         }
//       }
//       return resp;
//     } else {
//       return { message: "Contact is used." };
//     }
//   }

//   public async sendotp(body: any) {
//     let phone = body.country_code.toString() + body.contact.toString();
//     const userInfo = await Users.findOne({ contact: body.contact }).lean();
//     if (body.action == "checkexist") {
//       if (!userInfo) {
//         return {
//           Status: "Error",
//           Details: "Invalid number. Please recheck and enter again.",
//         };
//       }
//     }
//     if (body.action == "checknotexist") {
//       if (userInfo) {
//         return {
//           Status: "Error",
//           Details:
//             "This phone number is already taken. Please try with a new number.",
//         };
//       }
//     }
//     let otp = generateOTP(6);
//     let resp = await generateOtp(phone, otp);

//     if (resp.Status == "Success") {
//       const otpInfo = await Otp.findOne({
//         contact: body.contact,
//         country_code: body.country_code,
//       }).lean();
//       const userInfo = await Users.findOne({ contact: body.contact }).lean();
//       if (userInfo) {
//         const user = await Users.findOne({
//           contact: body.contact,
//           country_code: body.country_code,
//         }).lean();
//         if (!user) {
//           await Users.findOneAndUpdate(
//             { contact: body.contact },
//             { $set: { country_code: body.country_code } }
//           );
//         }
//       }
//       if (!otpInfo) {
//         const info = new Otp({
//           contact: body.contact,
//           country_code: body.country_code,
//           otp: otp,
//           otpId: resp.Details,
//         });
//         const data = await info.save();
//       } else {
//         await Otp.findOneAndUpdate(
//           { contact: body.contact, country_code: body.country_code },
//           { otp: otp, otpId: resp.Details }
//         );
//       }
//     }
//     return resp;
//   }
//   public async emailUniqueCheck(body: any) {
//     let emailCheck = body.email;
//     let insitituteCheck = body.institute;
//     const instituteDetails = await institute
//       .find({ institute_email: emailCheck, isDeleted: false })
//       .lean();
//     const instituteDetailsSingle = await institute
//       .findOne({ _id: insitituteCheck, isDeleted: false })
//       .lean();
//     if (instituteDetails.length > 1) {
//       return { message: "Email Already Exist" }
//     } else if (instituteDetails.length === 1) {
//       if (instituteDetails[0]._id.toString() === insitituteCheck.toString()) {
//         return { message: "Email is Unique" }
//       } else {
//         return { message: "Email Already Exist" }
//       }
//     } else {
//       return { message: "Email is Unique" }
//     }
//   }
//   public async signUpEmailSend(body: any) {
//     console.log("hello")
//     let otp = generateOTP(6);
//     let prevEmailSend = await SignupOtp.find({ email: body.email, isDeleted: false }).lean();
//     if (prevEmailSend.length > 0) {
//       await SignupOtp.updateMany({ email: body.email, isDeleted: false }, { isDeleted: true });
//     }
//     let result = await this.sendOtpEmail(body.email, body.fullname, otp);
//     if (result) {
//       const data = {
//         email: body.email,
//         otp: otp,
//       }
//       await SignupOtp.create(data)
//     }
//     return { message: "Verification link sent", }
//   }

//   public async verifyEmailSignUpOtp(body: any) {

//     let prevEmailSend = await SignupOtp.findOne({ email: body.email, otp: body.otp, isDeleted: false }).lean();
//     if (prevEmailSend && body.otp == prevEmailSend.otp) {
//       console.log("truee")
//       // const info = new Users(body);
//       // const data = await info.save();
//       const uName = await this.randomUserName(body.fullname)
//       // const cD = {
//       //   username: uName,
//       //   password: body.password,
//       //   email: body.email
//       // }
//       // const data = await Users.create(cD)

//       const info = new Users({
//         fullname: body.fullname,
//         username: uName,
//         password: bcrypt.hashSync(body.password, saltRounds),
//         email: body.email
//       });
//       const data = await info.save();
//       console.log(data, "line 288")
//       let result: any = await Users.findOneAndUpdate({ _id: data._id }, { email_verify: true, verifyShortToken: null, isVerified: true }).lean();
//       console.log(result, "line 290")

//       if (result) {

//         const userData: any = await Users.findOne({ email: result.email });
//         // let user = userData._id;
//         // let email = userData.email;
//         // let name = userData.fullname;
//         // let role = "Other";
//         // let username = uName

//         console.log(userData, "helloy")
//         const info = new profileModel({
//           name: userData.fullname,
//           user: userData._id,
//           username: uName,
//           role: "Other",
//         });
//         let res = await info.save();
//         console.log(res, "profile");

//         if (res) {
//           const profileData = await profileModel.findOne({ user: userData._id }).lean();
//           let profileData1 = profileData._id;
//           const data2 = new profileInfoModel({ profile: profileData1 });
//           let ress = await data2.save();
//           console.log(ress, "profileInfo");

//           if (ress) {
//             let profile = profileData._id;
//             let addContact = {
//               profile: profile,
//               primary_email: { email: body.email },
//               // primary_contact: { contact: contact },
//             };
//             const data3 = new profileContactModel(addContact);
//             let ress = await data3.save();
//             console.log(ress, "contact");
//             if (ress) {
//               const userInfo = await Users.findOneAndUpdate(
//                 { _id: userData._id },
//                 { username: uName }
//               ).lean();
//             }
//           }
//         }
//         const userToken = await this.getNewToken(userData);
//         return {
//           status: 201,
//           statusText: constants.SUCCESS,
//           data: userData,
//           token_data: userToken,
//         };
//       } else {
//         return { message: "Error Occured." }
//       }
//     } else {
//       return { message: "Wrong Otp" }
//     }

//   }


//   public async privateDomainSendOtp(body: any) {
//     let phone = body.country_code.toString() + body.contact.toString();
//     const instituteDetails = await institute
//       .findOne({ domain: body.institute_domain, isDeleted: false })
//       .lean();
//     const userDetails = await Users.findOne({
//       contact: body.contact,
//       institute: instituteDetails._id,
//     }).lean();

//     if (!userDetails) {
//       let userEmailData: any = await Users.findOne({
//         contact: body.contact,
//         isDeleted: false,
//       }).lean();
//       if (userEmailData) {
//         let roleDetails: any = await Userrole.findOne({
//           institute: instituteDetails._id,
//           user: userEmailData._id,
//           isDeleted: false,
//         }).lean();

//         if (roleDetails) {
//           let patchUserForUserRole: any = await Users.findOneAndUpdate(
//             { _id: userEmailData._id, isDeleted: false },
//             { institute: roleDetails.institute, activeRole: roleDetails.role },
//             { new: true }
//           ).lean();
//           if (patchUserForUserRole) {
//             let userDetailsReCheck: any = await Users.findOne({
//               contact: body.contact,
//               institute: instituteDetails._id,
//             }).lean();
//             if (userDetailsReCheck) {
//               let result = await sendOtpPrivateDomain(phone, body);
//               return result;
//             } else {
//               throw "You are not associated with this institute.";
//             }
//           }
//         } else {
//           throw "You are not associated with this institute.";
//         }
//       } else {
//         throw "Contact is incorrect or invaalid.";
//       }
//     } else {
//       let result = await sendOtpPrivateDomain(phone, body);
//       return result;
//     }
//   }

//   public async sendotpforlogin(body: any) {
//     let phone = body.country_code.toString() + body.contact.toString();
//     const userInfo = await Users.findOne({ contact: body.contact }).lean();
//     if (!userInfo) {
//       return {
//         Status: "Error",
//         Details: "Invalid number. Please recheck and enter again.",
//       };
//     }
//     let otp = generateOTP(6);
//     let resp = await generateOtp(phone, otp);

//     if (resp.Status == "Success") {
//       const otpInfo = await Otp.findOne({
//         contact: body.contact,
//         country_code: body.country_code,
//       }).lean();
//       const userInfo = await Users.findOne({ contact: body.contact }).lean();
//       if (userInfo) {
//         const user = await Users.findOne({
//           contact: body.contact,
//           country_code: body.country_code,
//         }).lean();
//         if (!user) {
//           await Users.findOneAndUpdate(
//             { contact: body.contact },
//             { $set: { country_code: body.country_code } }
//           );
//         }
//       }
//       if (!otpInfo) {
//         const info = new Otp({
//           contact: body.contact,
//           country_code: body.country_code,
//           otp: otp,
//           otpId: resp.Details,
//         });
//         const data = await info.save();
//       } else {
//         await Otp.findOneAndUpdate(
//           { contact: body.contact, country_code: body.country_code },
//           { otp: otp, otpId: resp.Details }
//         );
//       }
//     }
//     return resp;
//   }

//   public async sendotpforsignup(body: any) {
//     let phone = body.country_code.toString() + body.contact.toString();
//     const userInfo = await Users.findOne({ contact: body.contact }).lean();
//     if (userInfo) {
//       return {
//         Status: "Error",
//         Details:
//           "This phone number is already taken. Please try with a new number.",
//       };
//     }
//     let otp = generateOTP(6);
//     let resp = await generateOtp(phone, otp);

//     if (resp.Status == "Success") {
//       const otpInfo = await Otp.findOne({
//         contact: body.contact,
//         country_code: body.country_code,
//       }).lean();
//       const userInfo = await Users.findOne({ contact: body.contact }).lean();
//       if (userInfo) {
//         const user = await Users.findOne({
//           contact: body.contact,
//           country_code: body.country_code,
//         }).lean();
//         if (!user) {
//           await Users.findOneAndUpdate(
//             { contact: body.contact },
//             { $set: { country_code: body.country_code } }
//           );
//         }
//       }
//       if (!otpInfo) {
//         const info = new Otp({
//           contact: body.contact,
//           country_code: body.country_code,
//           otp: otp,
//           otpId: resp.Details,
//         });
//         const data = await info.save();
//       } else {
//         await Otp.findOneAndUpdate(
//           { contact: body.contact, country_code: body.country_code },
//           { otp: otp, otpId: resp.Details }
//         );
//       }
//     }
//     return resp;
//   }

//   public async verifyotp(body: IOtp) {
//     const otpInfo = await Otp.findOne({
//       contact: body.contact,
//       country_code: body.country_code,
//     }).lean();

//     // If details are not found by the requested details
//     if (otpInfo === null || otpInfo === "null" || !otpInfo) {
//       return { Status: "Error", Details: "Invalid request." };
//     }
//     let resp = await verifyOtp(otpInfo, body.otp);

//     if (resp.Status == "Success" && resp.Details != "OTP Expired") {
//       await Users.findOneAndUpdate(
//         {
//           contact: body.contact,
//           country_code: body.country_code,
//           isDeleted: false,
//         },
//         { $set: { contact_verify: true } }
//       );
//     }
//     if (resp.Status == "Success" && resp.Details == "OTP Expired") {
//       return { Status: "Error", Details: "OTP Expired" };
//     }
//     return resp;
//   }

//   public async verifyContactOtp(body: any) {
//     const otpInfo = await Otp.findOne({
//       contact: body.contact,
//       country_code: body.country_code,
//     }).lean();
//     let resp = await verifyOtp(otpInfo, body.otp);
//     if (resp.Status == "Success" && resp.Details != "OTP Expired") {
//       await Users.findOneAndUpdate(
//         { _id: body.userId, isDeleted: false },
//         {
//           $set: {
//             contact_verify: true,
//             contact: body.contact,
//             country_code: body.country_code,
//             whatsapp_contact: body.whatsapp_contact,
//             whatsapp_country_code: body.whatsapp_country_code,
//           },
//         }
//       );
//     }
//     if (resp.Status == "Success" && resp.Details == "OTP Expired") {
//       return { Status: "Error", Details: "OTP Expired" };
//     }
//     return resp;
//   }

//   public async getOtpInfo(body: any) {
//     if (body.contact) {
//       const otpInfo = await Otp.find({ contact: body.contact }).lean();
//       return otpInfo;
//     } else {
//       const otpInfo = await Otp.find().lean();
//       return otpInfo;
//     }
//   }

//   public async managephone(body: any) {
//     if (body.oldcontact && body.newcontact) {
//       const newInfo = await Users.findOne({
//         contact: body.newcontact,
//         country_code: body.country_code,
//         isDeleted: false,
//       }).lean();
//       if (newInfo) {
//         return { Status: "Error", Details: "Already registered" };
//       }
//       await Users.findOneAndUpdate(
//         {
//           contact: body.oldcontact,
//           country_code: body.country_code,
//           isDeleted: false,
//         },
//         {
//           $set: {
//             contact: body.newcontact,
//             country_code: body.country_code,
//             contact_verify: false,
//           },
//         }
//       );
//       let phone = body.country_code.toString() + body.newcontact.toString();
//       let otp = generateOTP(6);
//       let resp = await generateOtp(phone, otp);

//       if (resp.Status == "Success") {
//         const otpInfo = await Otp.findOne({
//           contact: body.newcontact,
//           country_code: body.country_code,
//         }).lean();
//         const userInfo = await Users.findOne({
//           contact: body.oldcontact,
//         }).lean();
//         if (userInfo) {
//           const user = await Users.findOne({
//             contact: body.oldcontact,
//             country_code: body.country_code,
//           }).lean();
//           if (!user) {
//             await Users.findOneAndUpdate(
//               { contact: body.oldcontact },
//               { $set: { country_code: body.country_code } }
//             );
//           }
//         }
//         if (!otpInfo) {
//           const info = new Otp({
//             contact: body.newcontact,
//             country_code: body.country_code,
//             otp: otp,
//             otpId: resp.Details,
//           });
//           const data = await info.save();
//         } else {
//           await Otp.findOneAndUpdate(
//             { contact: body.newcontact, country_code: body.country_code },
//             { otp: otp, otpId: resp.Details }
//           );
//         }
//       }
//       return resp;
//     } else {
//       return { message: "Enter both oldcontact and newcontact" };
//     }
//   }

//   public async accountVerification(body: any) {
//     if (body.oldemail && body.newemail) {
//       let verifyShortToken = generateOTP(6);
//       body.oldemail = body.oldemail.toLowerCase();
//       body.newemail = body.newemail.toLowerCase();
//       const emailExist = await emailExistance(
//         body.newemail,
//         nconf.get("api_key_email")
//       );
//       if (emailExist.smtpCheck === "false" || emailExist.dnsCheck === "false") {
//         throw Error(
//           "Invalid email address. Please recheck your email and enter again"
//         );
//       }
//       const userinfo = await Users.findOne({
//         email: body.newemail,
//         isDeleted: false,
//       }).lean();
//       if (!userinfo) {
//         await Users.findOneAndUpdate(
//           { email: body.oldemail, isDeleted: false },
//           {
//             email: body.newemail,
//             verifyShortToken: verifyShortToken,
//             isVerified: false,
//           }
//         );
//         const data = await Users.findOne({
//           email: body.newemail,
//           isDeleted: false,
//         }).lean();
//         await this.sendVerificationEmail(verifyShortToken, data);
//         return { message: "email verification mail sent." };
//       } else {
//         return { message: "Email Already Exist." };
//       }
//     }
//     return { message: "Enter both oldemail and newemail" };
//   }

//   private sendVerificationEmail(verifyShortToken: string, data: any) {
//     let verificationLink = `${baseUrl}auth/emailverify/${verifyShortToken}`;
//     let fileContent = fs.readFileSync("email/institute-admin-signup.html");
//     fileContent = fileContent.toString("utf8");
//     let compiledTemplate = Hogan.compile(fileContent);
//     if (data.email) {
//       const emaildata = {
//         from: "noreply@edneed.com",
//         to: data.email,
//         subject: "Edneed Email Verification",
//         html: compiledTemplate.render({
//           fullname: data.fullname,
//           usertype: data.usertype,
//           vlink: verificationLink,
//           link: verificationLink,
//         }),
//       };
//       mailer(emaildata);
//     }
//   }

//   private sendOtpEmail(email: any, fullname: any, otp: string) {
//     // let verificationLink = `${baseUrl}auth/emailverify/${verifyShortToken}`;
//     /// feathers se template dalna h 
//     let fileContent = fs.readFileSync("email/email-otp-verification.html");
//     fileContent = fileContent.toString("utf8");
//     let compiledTemplate = Hogan.compile(fileContent);
//     if (email) {
//       const emaildata = {
//         from: "noreply@edneed.com",
//         to: email,
//         subject: "Edneed Email Verification",
//         html: compiledTemplate.render({
//           fullname: fullname,
//           OTP: otp
//         }),
//       };
//       mailer(emaildata);
//     }
//     return { message: "Verification link resent" }
//   }

//   public async resetpassword(body: any) {
//     const otpInfo = await Otp.findOne({
//       contact: body.contact,
//       country_code: body.country_code,
//     }).lean();
//     let resp = await verifyOtp(otpInfo, otpInfo.otp);

//     if (resp.Status == "Success" && resp.Details != "OTP Expired") {
//       const userInfo = await Users.findOne({
//         contact: body.contact,
//         country_code: body.country_code,
//         isDeleted: false,
//       }).lean();
//       if (userInfo) {
//         let newPassword = bcrypt.hashSync(body.password, saltRounds);
//         await Users.findOneAndUpdate(
//           {
//             contact: body.contact,
//             country_code: body.country_code,
//             isDeleted: false,
//           },
//           { password: newPassword }
//         );
//         return {
//           message: "Password changed",
//         };
//       }
//     }

//     if (resp.Status == "Success" && resp.Details == "OTP Expired") {
//       return { Status: "Error", Details: "OTP Expired" };
//     }

//     return resp;
//   }

//   public async addWhatsappNumber(body: any) {
//     await Users.findOneAndUpdate(
//       { _id: body.userId, isDeleted: false },
//       {
//         whatsapp_contact: body.whatsapp_contact,
//         whatsapp_country_code: body.whatsapp_country_code,
//       }
//     );
//     return { message: "WhatsApp notifications has been enabled" };
//   }

//   public randomArrayShuffle(array: any) {
//     var currentIndex = array.length, temporaryValue, randomIndex;
//     while (0 !== currentIndex) {
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex -= 1;
//       temporaryValue = array[currentIndex];
//       array[currentIndex] = array[randomIndex];
//       array[randomIndex] = temporaryValue;
//     }
//     return array;
//   }
//   public convertArrayintoString(arr: any) {
//     let str = ""
//     for (let i = 0; i < arr.length; i++) {
//       str = str + arr[i];
//     }
//     return str
//   }

//   public async randomUserName(fullName: any) {

//     let userName = fullName.toString().substring(0, 4);
//     userName = this.convertArrayintoString(userName)
//     var num = Math.floor(Math.random() * 900000) + 100000;
//     let random = num.toString();
//     let testUserName = userName + "-" + random;
//     let userNameExit = await Users.find({ username: testUserName, isDeleted: false }).lean()
//     if (userNameExit.length > 0) {
//       var num2 = Math.floor(Math.random() * 900) + 1000;
//       let random2 = num2.toString();
//       let finalUserName = testUserName + random2;
//       return finalUserName.toString();
//     } else {
//       return testUserName.toString();
//     }
//   }

//   public async otpsignup(body: IUser) {
//     let otp = body.otp;
//     let verifyShortToken = generateOTP(6);
//     let otpInfo: any = await Otp.findOne({
//       contact: body.contact,
//       country_code: body.country_code,
//     }).lean();
//     console.log("otpInfo",otpInfo);
    
//     let resp = await verifyOtp(otpInfo, otp);
//     let userInfo = await Users.findOne({
//       contact: body.contact,
//       country_code: body.country_code,
//     }).lean();
//     console.log("userInfo",userInfo);
    
//     if (userInfo) {
//       return { message: "Contact Already Exist." };
//     }

//     if (resp.Status == "Success" && resp.Details != "OTP Expired") {
//       // body.email = body.email.toLowerCase();
//       body.username = await this.randomUserName(body.fullname);
//       body.password = bcrypt.hashSync(body.password, saltRounds);
//       // const userinfo = await Users.findOne({ email: body.email }).lean();
//       // const emailExist = await emailExistance(
//       //   body.email,
//       //   nconf.get("api_key_email")
//       // );
//       // if (emailExist.smtpCheck === "false" || emailExist.dnsCheck === "false") {
//       //   throw Error(
//       //     "Invalid email address. Please recheck your email and enter again"
//       //   );
//       // }

//       const info = new Users(body);
//       const data = await info.save();
//       let result: any = await Users.findOneAndUpdate(
//         { _id: data._id },
//         { contact_verify: true, verifyShortToken: null, isVerified: false }
//       ).lean();

//       if (result) {
//         // if (guser) {
//         const userData: any = await Users.findOne({ contact: result.contact });
//         let user = userData._id;
//         // let email = userData.email;
//         let contact = userData.contact;
//         let name = userData.fullname;
//         let role = "Other";
//         let username = userData.username;
//         //   console.log(name, "120");
//         // var num = Math.floor(Math.random() * 90000) + 10000;
//         // let random = num.toString();
//         // let usernam = name.split(" ").join("-");
//         // let username = usernam + "-" + random;
//         //   console.log("126");

//         const data1 = new profileModel({
//           name,
//           user,
//           username,
//           role,
//         });
//         let res = await data1.save();
//         console.log(res, "profile");

//         if (res) {
//           const profileData = await profileModel
//             .findOne({ user: user._id })
//             .lean();
//           let profile = profileData._id;
//           const data2 = new profileInfoModel({ profile });
//           let ress = await data2.save();
//           console.log(ress, "profileInfo");

//           if (ress) {
//             let profile = profileData._id;
//             let addContact = {
//               profile: profile,
//               // primary_email: { email: email },
//               primary_contact: { contact: contact },
//             };
//             const data3 = new profileContactModel(addContact);
//             let ress = await data3.save();
//             console.log(ress, "contact");
//             if (ress) {
//               const userInfo = await Users.findOneAndUpdate(
//                 { _id: userData._id },
//                 { username: username }
//               ).lean();

//             }
//           }
//         }
//         // }
//       }

//       await this.sendVerificationEmail(verifyShortToken, data);
//       let user: any = await Users.findOne({ _id: data._id }).lean();
//       const instituteInfo = await institute
//         .findOne({ _id: user.institute, isDeleted: false })
//         .lean();
//         const userRoleInfo :any = await userroleModel
//         .findOne({ role: user.activeRole,institute:user.institute,user:user._id })
//         .lean();
//       const userToken = await this.getNewToken(user);
//       return {
//         status: 201,
//         statusText: constants.SUCCESS,
//         data: user,
//         user_role:userRoleInfo,
//         institute: instituteInfo,
//         token_data: userToken,
//       };

//     } else if (resp.Status == "Success" && resp.Details == "OTP Expired") {
//       return { Status: "Error", Details: "OTP Expired" };
//     } else {
//       return resp;
//     }
//   }

//   public async otplogin(body: any) {
//     let otp = body.otp;
//     let user: any = await Users.findOne({
//       contact: body.contact,
//       country_code: body.country_code,
//       isDeleted: false,
//     }).lean();
//     const instituteInfo = await institute
//       .findOne({ _id: user.institute, isDeleted: false })
//       .lean();
//     let otpInfo = await Otp.findOne({
//       contact: body.contact,
//       country_code: body.country_code,
//     }).lean();

//     let resp = await verifyOtp(otpInfo, otp);

//     if (resp.Status == "Success" && resp.Details != "OTP Expired") {
//       if (user && user.contact_verify == false) {
//         user = await Users.findOneAndUpdate(
//           {
//             contact: body.contact,
//             country_code: body.country_code,
//             isDeleted: false,
//           },
//           { contact_verify: true },
//           { new: true }
//         ).lean();
//       }
//       const userRoleInfo :any = await userroleModel
//       .findOne({ role: user.activeRole,institute:user.institute,user:user._id })
//       .lean();

//       const userToken = await this.getNewToken(user);
//       return {
//         status: 201,
//         statusText: constants.SUCCESS,
//         data: user,
//         user_role:userRoleInfo,
//         institute: instituteInfo,
//         token_data: userToken,
//       };
//     } else if (resp.Status == "Success" && resp.Details == "OTP Expired") {
//       return { Status: "Error", Details: "OTP Expired" };
//     } else {
//       return resp;
//     }
//   }

//   public getUser = async (
//     email: string,
//     password: string
//   ): Promise<IUser | null> => {
//     // const user = await Users.findOne({"email": email} );
//     let user = await Users.findOne({ email: email, isDeleted: false });
//     //let instituteInfo = null;
//     if (!user) {
//       throw "Invalid Login";
//     } else {
//       if (!user.isVerified) {
//         throw "Email Verification is Pending";
//       } else {
//         var xyz = bcrypt.compareSync(password, user.password);
//         if (xyz != true) {
//           throw "Incorrect Password";
//         } else {
//           //instituteInfo= await institute.findOne({_id:user.institute}).lean();
//           //  console.log("password is matched");
//         }
//       }
//     }

//     return user;
//   };

//   public async isTokenValid(token: string): Promise<boolean> {
//     const decoded = jwt.verify(token, constants.ACCESS_TOKEN_SECRET);
//     //console.log(decoded);
//     const { id } = <any>decoded;
//     var utcDate1 = new Date(Date.now());
//     const utcDate = moment(new Date()).unix();
//     if (utcDate === null) {
//       throw Error("utc can not be null");
//     }

//     const validToken = await Tokens.findOne({
//       flag: 1,
//       userid: id,
//       $or: [
//         {
//           token: token,
//           tokenExpiryAt: { $gt: utcDate },
//         },
//         {
//           refreshToken: token,
//           refreshTokenExpiryAt: { $gt: utcDate },
//         },
//       ],
//     });
//     //console.log(validToken) //
//     if (validToken) {
//       return true;
//     } else {
//       return false;
//     }
//   }

//   public async isLogout(username: string, id: number): Promise<boolean> {
//     //console.log(username +" "+ id);
//     const logout = await Tokens.findOneAndUpdate(
//       { _id: id },
//       { $set: { flag: 0 } },
//       { new: true },
//       (err: any, doc: any) => {
//         if (err) {
//           console.log("Something wrong when updating data!");
//         }
//       }
//     );
//     if (logout) {
//       return true;
//     } else {
//       return false;
//     }
//   }

//   private getNewToken = async (user: IUser): Promise<IToken> => {
//     const accessToken = jwt.sign(
//       { id: user._id, role: user.role },
//       constants.ACCESS_TOKEN_SECRET,
//       { expiresIn: "480m" }
//     );
//     const refreshToken = jwt.sign(
//       { id: user._id, role: user.role },
//       constants.REFRESH_TOKEN_SECRET,
//       { expiresIn: "1440m" }
//     );

//     var final = moment()
//       .add(constants.TOKEN_EXPIRY_IN_MINUTES, "minutes")
//       .unix();
//     var final2 = moment()
//       .add(constants.REFRESH_TOKEN_EXPIRY_IN_MINUTES, "minutes")
//       .unix();
//     var newTokenDuration = moment()
//       .add(constants.NEW_TOKEN_EXPIRY_IN_MINUTES, "minutes")
//       .unix();
//     const token: IToken = new Tokens({
//       id: Date.now().toString(),
//       userid: user._id,
//       token: accessToken,
//       refreshToken: refreshToken,
//       tokenExpiryAt: final,
//       refreshTokenExpiryAt: final2,
//       newTokenDuration: newTokenDuration,
//       flag: 1,
//     });
//     const update = {
//       lastLoginDate: new Date(),
//     };
//     console.log(update);
//     const newUser = await Users.updateOne(
//       { _id: user._id, isDeleted: false },
//       update
//     );
//     const newToken: IToken = await token.save();
//     return newToken;
//   };

//   // start google logins

//   public async privateDoaminGoogleLogin(
//     googleId: string,
//     email: string,
//     imageUrl: string,
//     name: string,
//     country_code: number,
//     whatsapp_contact: number,
//     institute_domain: any
//   ): Promise<IEdneedResponse | IError | IUser | null> {
//     let guser: any = await this.privateDoaminGetGoogleUser(
//       googleId,
//       email,
//       name,
//       country_code,
//       whatsapp_contact,
//       institute_domain
//     );
//     const instituteInfo = await institute
//       .findOne({ _id: guser.institute })
//       .lean();
//     const userToken = await this.getNewToken(guser);
//     guser.token = userToken.token;
//     guser.refreshToken = userToken.refreshToken;

//     const userRoleInfo :any = await userroleModel
//     .findOne({ role: guser.activeRole,institute:guser.institute,user:guser._id })
//     .lean();

//     if (guser) {
//       return {
//         status: 201,
//         statusText: constants.SUCCESS,
//         data: guser,
//         user_role:userRoleInfo,
//         institute: instituteInfo,
//         token_data: userToken,
//       };
//     } else {
//       return {
//         status: 201,
//         statusText: constants.SUCCESS,
//         data: guser,
//         user_role:userRoleInfo,
//         institute: instituteInfo,
//         token_data: userToken,
//       };
//     }
//   }

//   public privateDoaminGetGoogleUser = async (
//     googleId: string,
//     email: string,
//     name: string,
//     country_code: number,
//     whatsapp_contact: number,
//     institute_domain: any
//   ): Promise<IUser | null> => {
//     const instituteDetails = await institute
//       .findOne({ domain: institute_domain })
//       .lean();
//     let guser = await Users.findOne({
//       $and: [
//         { email: email, isVerified: true, institute: instituteDetails._id },
//       ],
//     });
//     if (!guser) {
//       let userEmailData: any = await Users.findOne({
//         email: email,
//         isDeleted: false,
//       }).lean();
//       if (userEmailData) {
//         let roleDetails: any = await Userrole.findOne({
//           institute: institute,
//           user: userEmailData._id,
//           isDeleted: false,
//         }).lean();
//         if (roleDetails) {
//           let patchUserForUserRole: any = await Users.findOneAndUpdate(
//             { _id: userEmailData._id, isDeleted: false },
//             { institute: roleDetails.institute, activeRole: roleDetails.role },
//             { new: true }
//           ).lean();
//           if (patchUserForUserRole) {
//             let userDetailsReCheck: any = await Users.findOne({
//               email: email,
//               institute: instituteDetails._id,
//               isDeleted: false,
//             }).lean();
//             if (userDetailsReCheck) {
//               return userDetailsReCheck;
//             } else {
//               throw "You are not associated with this institute.";
//             }
//           } else {
//             throw "You are not associated with this institute.";
//           }
//         } else {
//           throw "You are not associated with this institute.";
//         }
//       } else {
//         throw "Email is incorrect or invalid.";
//       }
//     } else {
//       return guser;
//     }
//   };

//   public async googleLogin(
//     googleId: string,
//     email: string,
//     imageUrl: string,
//     name: string,
//     country_code: number,
//     whatsapp_contact: number
//   ): Promise<IEdneedResponse | IError | IUser | null> {
//     let guser: any = await this.getGoogleUser(
//       googleId,
//       email,
//       name,
//       country_code,
//       whatsapp_contact
//     );
//     const instituteInfo = await institute
//       .findOne({ _id: guser.institute })
//       .lean();
//     const userToken = await this.getNewToken(guser);
//     guser.token = userToken.token;
//     guser.refreshToken = userToken.refreshToken;
//     const userRoleInfo :any = await userroleModel
//     .findOne({ role: guser.activeRole,institute:guser.institute,user:guser._id })
//     .lean();

//     if (guser) {
//       return {
//         status: 201,
//         statusText: constants.SUCCESS,
//         data: guser,
//         user_role:userRoleInfo,
//         institute: instituteInfo,
//         token_data: userToken,
//       };
//     } else {
//       return {
//         status: 201,
//         statusText: constants.SUCCESS,
//         data: guser,
//         user_role:userRoleInfo,
//         institute: instituteInfo,
//         token_data: userToken,
//       };
//     }
//   }

//   public getGoogleUser = async (
//     googleId: string,
//     email: string,
//     name: string,
//     country_code: number,
//     whatsapp_contact: number
//   ): Promise<IUser | null> => {
//     let guser = await Users.findOne({
//       $and: [{ email: email, isDeleted: false, isVerified: true }],
//     });
//     if (guser == null) {
//       let uName = await this.randomUserName(name)
//       //throw "Invalid googleID & email and here ";
//       const googleuser: IUser = new Users({
//         isVerified: true,
//         googleID: googleId,
//         email: email,
//         password: "123",
//         verifyShortToken: null,
//         fullname: name,
//         role: false,
//         usertype: "Other",
//         password_change: true,
//         country_code: country_code,
//         whatsapp_contact: whatsapp_contact,
//         contact_verify: false,
//         createdAt: now(),
//         updatedAt: now(),
//         lastLoginDate: new Date(),
//         username: uName,
//       });
//       const guser: IUser = await googleuser.save();
//       if (guser) {
//         const userData: any = await Users.findOne({ email: guser.email });
//         let user = userData._id;
//         let email = userData.email;
//         let contact = userData.contact;
//         let name = userData.fullname;
//         let role = "Other";
//         //   console.log(name, "120");
//         // var num = Math.floor(Math.random() * 90000) + 10000;
//         // let random = num.toString();
//         // let usernam = name.split(" ").join("-");
//         let username = await this.randomUserName(name);
//         //   console.log("126");

//         const data1 = new profileModel({
//           name,
//           user,
//           username,
//           role,
//         });
//         let res = await data1.save();
//         console.log(res, "profile");

//         if (res) {
//           const profileData = await profileModel
//             .findOne({ user: user._id })
//             .lean();
//           let profile = profileData._id;
//           const data2 = new profileInfoModel({ profile });
//           let ress = await data2.save();
//           console.log(ress, "profileInfo");

//           if (ress) {
//             let profile = profileData._id;
//             let addContact = {
//               profile: profile,
//               // primary_email: { email: email },
//               primary_contact: { contact: contact },
//             };
//             const data3 = new profileContactModel(addContact);
//             let ress = await data3.save();
//             console.log(ress, "contact");
//             if (ress) {
//               const userInfo = await Users.findOneAndUpdate(
//                 { _id: userData._id },
//                 { username: username }
//               ).lean();
//               if (userInfo) {
//                 console.log("message: Successfully  created ", userInfo);
//               }
//             }
//           }
//         }
//       }
//       let guserdata = await Users.findOne({
//         $and: [{ email: email, isDeleted: false, isVerified: true }],
//       });
//       return guserdata;
//     } else {
//       console.log("GoogleID & Email found");
//     }

//     return guser;
//   };

//   // new generate token

//   public newTokenAgain = async (
//     userid: string,
//     userexp: number
//   ): Promise<IEdneedResponse | IError> => {
//     let user: any = await Tokens.findOne({
//       userid: userid,
//       tokenExpiryAt: userexp,
//     });
//     if (userexp < user.newTokenDuration) {
//       if (user == null) {
//         throw "Incorrect Expired Token";
//       }
//       const newUserToken = await this.getUserForNewToken(user.userid);
//       if (newUserToken) {
//         const instituteInfo = await institute
//           .findOne({ _id: newUserToken.institute })
//           .lean();
//           const userRoleInfo :any = await userroleModel
//           .findOne({ role: user.activeRole,institute:user.institute,user:userid})
//           .lean();
 
//         const userToken = await this.getNewToken(user);
//         user.token = userToken.token;
//         user.refreshToken = userToken.refreshToken;
//         return {
//           status: 201,
//           statusText: constants.SUCCESS,
//           data: user,
//           user_role:userRoleInfo,
//           institute: instituteInfo,
//           token_data: userToken,
//         };
//       } else {
//         return {
//           status: 401,
//           statusText: constants.FAILED,
//           message: constants.UNAUTHORIZED_USER,
//         };
//       }
//     } else {
//       throw "New Token generate time is over. Now you can login again.";
//     }
//   };
//   // for new token

//   public getUserForNewToken = async (userid: any): Promise<IUser | null> => {
//     let user = await Users.findOne({ _id: userid });

//     if (user == null) {
//       throw "Invalid Login or user is null";
//     }
//     return user;
//   };

//   // for private domain
//   public async privateDomainLogin(
//     email: string,
//     password: string,
//     institute_domain: any,
//   ): Promise<IEdneedResponse | IError> {
//     let isContactLogin = false
//     const user = await this.getPrivateDomainUser(
//       email,
//       password,
//       institute_domain,
//       isContactLogin
//     );

//     if (user) {
//       const instituteInfo: any = await institute
//         .findOne({ _id: user.institute })
//         .lean();
//         const userRoleInfo :any = await userroleModel
//         .findOne({ role: user.activeRole,institute:user.institute,user:user._id })
//         .lean();

//       const userToken = await this.getNewToken(user);
//       user.token = userToken.token;
//       user.refreshToken = userToken.refreshToken;
//       return {
//         status: 201,
//         statusText: constants.SUCCESS,
//         user_role:userRoleInfo,
//         data: user,
//         institute: instituteInfo,
//         token_data: userToken,
//       };
//     } else {
//       return {
//         status: 401,
//         statusText: constants.FAILED,
//         message: constants.UNAUTHORIZED_USER,
//       };
//     }
//   }

//   // get user for private domain
//   public getPrivateDomainUser = async (
//     email: string,
//     password: string,
//     institute_domain: any,
//     isContactLogin: any
//   ): Promise<IUser | null | undefined> => {
//     let instituteDetails: any = await institute
//       .findOne({ domain: institute_domain, isDeleted: false })
//       .lean();
//     if (instituteDetails) {
//       let userDetails: any = await Users.findOne({
//         email: email,
//         institute: instituteDetails._id,
//         isDeleted: false,
//       }).lean();
//       if (!userDetails) {
//         let userEmailData: any = await Users.findOne({
//           email: email,
//           isDeleted: false,
//         }).lean();

//         if (userEmailData) {
//           let roleDetails: any = await Userrole.findOne({
//             institute: instituteDetails._id,
//             user: userEmailData._id,
//             isDeleted: false,
//           }).lean();
//           if (roleDetails) {
//             let patchUserForUserRole: any = await Users.findOneAndUpdate(
//               { _id: userEmailData._id, isDeleted: false },
//               { institute: roleDetails.institute, activeRole: roleDetails.role },
//               { new: true }
//             ).lean();
//             if (patchUserForUserRole) {
//               let userDetailsReCheck: any = await Users.findOne({
//                 email: email,
//                 institute: instituteDetails._id,
//                 isDeleted: false,
//               }).lean();
//               if (userDetailsReCheck) {
//                 if (userDetailsReCheck.isVerified) {
//                   var comparePassword = bcrypt.compareSync(
//                     password,
//                     userDetailsReCheck.password
//                   );
//                   if (comparePassword != true) {
//                     throw "Incorrect Password.";
//                   } else {
//                     return userDetailsReCheck;
//                   }
//                 } else {
//                   throw "Verfication Pending.";
//                 }
//               } else {
//                 throw "You are not associated with this institute.";
//               }
//             }
//           } else {

//             throw "You are not associated with this institute.";
//           }
//         } else {
//           if (isContactLogin) {
//             throw "Contact is incorrect or invalid.";
//           } else {
//             throw "Email is incorrect or invalid.";
//           }
//         }
//       } else {
//         if (userDetails.isVerified) {
//           var comparePassword = bcrypt.compareSync(
//             password,
//             userDetails.password
//           );
//           if (comparePassword != true) {
//             throw "Incorrect Password.";
//           } else {
//             return userDetails;
//           }
//         } else {
//           throw "Verfication Pending.";
//         }
//       }
//       return userDetails;
//     } else {
//       throw "Invalid Login";
//     }

//   };

//   // start private domain otp login
//   public async privateDomainOtpLogin(body: any) {
//     let otp = body.otp;
//     let instituteDetails: any = await institute
//       .findOne({ domain: body.institute_domain, isDeleted: false })
//       .lean();
//     let user: any = await Users.findOne({
//       institute: instituteDetails._id,
//       contact: body.contact,
//       country_code: body.country_code,
//     }).lean();
//     const instituteInfo = await institute
//       .findOne({ _id: user.institute, isDeleted: false })
//       .lean();
//     let otpInfo = await Otp.findOne({
//       contact: body.contact,
//       country_code: body.country_code,
//     }).lean();

//     let resp = await verifyOtp(otpInfo, otp);
//     let role: any = await Userrole.findOne({
//       institute: instituteDetails._id,
//       isDeleted: false,
//     }).lean();
//     const userRoleInfo :any = await userroleModel
//     .findOne({ role: user.activeRole,institute:user.institute,user:user._id })
//     .lean();

//     if (role != null) {
//       if (resp.Status == "Success" && resp.Details != "OTP Expired") {
//         const userToken = await this.getNewToken(user);
//         return {
//           status: 201,
//           statusText: constants.SUCCESS,
//           data: user,
//           user_role:userRoleInfo,
//           institute: instituteInfo,
//           token_data: userToken,
//         };
//       } else if (resp.Status == "Success" && resp.Details == "OTP Expired") {
//         return { Status: "Error", Details: "OTP Expired" };
//       } else {
//         return resp;
//       }
//     } else {
//       throw "You are not associated with this institute.";
//     }
//   }
//   // end private domain otp login

//   public async privateDomainChangePassword(body: any) {
//     if (
//       !body.email ||
//       !body.oldpassword ||
//       !body.newpassword ||
//       !body.institute_domain
//     ) {
//       return { message: "Parameters are missing." };
//     } else {
//       let insitituteDetails: any = await institute
//         .findOne({ domain: body.institute_domain, isDeleted: false })
//         .lean();
//       let role: any = await Userrole.findOne({
//         institute: insitituteDetails._id,
//         isDeleted: false,
//       }).lean();
//       if (role != null) {
//         const user3 = await Users.findOne({
//           email: body.email,
//           institute: insitituteDetails._id,
//           isVerified: true,
//           isDeleted: false,
//         }).lean();

//         if (user3 == null) {
//           throw Error(
//             "Invalid Username or Password. Please contact Institute Admin if you are part of this institute or Email Verification is Pending"
//           );
//         } else {
//           var xyz = bcrypt.compareSync(body.oldpassword, user3.password);
//           let newPassword = bcrypt.hashSync(body.newpassword, saltRounds);
//           const update4 = { password: newPassword };

//           if (xyz != true) {
//             return { message: "old password you have entered is wrong" };
//           } else {
//             const passwordUpdate = await Users.findOneAndUpdate(
//               { _id: user3._id },
//               { $set: update4 }
//             );
//             let fileContent = fs.readFileSync(
//               "email/changed_password_success.html"
//             );
//             fileContent = fileContent.toString("utf8");
//             let compiledTemplate = Hogan.compile(fileContent);
//             if (user3.email) {
//               const emaildata = {
//                 from: "noreply@edneed.com",
//                 to: user3.email,
//                 subject: "Password Set Successfully",
//                 html: compiledTemplate.render({
//                   fullname: user3.fullname,
//                   email: user3.email,
//                 }),
//                 //html: "Dear " + data.email + ",<br><br>Your Password has been changed."
//               };

//               mailer(emaildata);
//             }


//             return { message: "Password changed" };
//           }
//         }
//       }
//       {
//         throw "You are not associated with this institute.";
//       }
//     }
//   }

//   public async privateDomainSendResetPassword(body: any) {
//     let instituteDetails: any = await institute
//       .findOne({ domain: body.institute_domain, isDeleted: false })
//       .lean();
//     let userDetails: any = await Users.findOne({
//       email: body.email,
//       isDeleted: false,
//     }).lean();
//     if (userDetails) {
//       let role: any = await Userrole.findOne({
//         institute: instituteDetails._id,
//         user: userDetails._id,
//         isDeleted: false,
//       }).lean();
//       if (role) {
//         if (body.email) {
//           var token2 = generateToken(6);
//           let userDetail1 = await Users.findOne({
//             email: body.email,
//             isVerified: true,
//             isDeleted: false,
//           }).lean();

//           if (!userDetail1) {
//             return {
//               message: "email not found",
//             };
//           } else {
//             // const domainData = await Domains.findOne({ "email": body.email, "institute": instituteDetails._id, "isDeleted": false }).lean();
//             // if (domainData == null) {
//             //     return { message: "Domain data is null" }
//             // }

//             const verificationLink = body.institute_domain;

//             const filter2 = { email: body.email, isDeleted: false };
//             const update2 = { resetShortToken: token2 };

//             await Users.findOneAndUpdate(filter2, update2);

//             let verificationLink1 = `${baseUrl}auth/resetpassword/${token2}`;
//             let fileContent = fs.readFileSync("email/forgot_password.html");
//             fileContent = fileContent.toString("utf8");
//             let compiledTemplate = Hogan.compile(fileContent);
//             if (userDetail1.email) {
//               const emaildata1 = {
//                 from: "noreply@edneed.com",
//                 to: userDetail1.email,
//                 subject: "Edneed password reset code",
//                 html: compiledTemplate.render({
//                   fullname: userDetail1.fullname,
//                   email: userDetail1.email,
//                   vlink: verificationLink1,
//                   link: verificationLink1,
//                 }),
//                 //html: "Dear " + data.email + ",<br><br>reset password code : " + token2 + "<br><br>Reset your password.<br><br><br>Alternatively, please visit the link below and change password.<br><br><a href='" + verificationLink1 + "' target='_blank'>" + verificationLink1 + "</a>"
//               };
//               mailer(emaildata1);
//             }

//             return {
//               message: "Password reset link sent",
//             };
//           }
//         } else {
//           return {
//             message: "email is missing",
//           };
//         }
//       } else {
//         return { message: "You are not associated with this institute." };
//       }
//     } else {
//       return { message: "You are not associated with this institute." };
//     }
//   }

//   public async privateDomainResetPassword(body: any) {
//     let instituteDetails: any = await institute
//       .findOne({ domain: body.institute_domain, isDeleted: false })
//       .lean();
//     console.log("line1540")
//     let role: any = await Userrole.findOne({
//       institute: instituteDetails._id,
//       isDeleted: false,
//     }).lean();
//     if (role) {
//       if (!body.token || !body.password) {
//         return {
//           message: "Parameters are missing",
//         };
//       } else {
//         let user2 = await Users.findOne({
//           resetShortToken: body.token,
//           isDeleted: false,
//         }).lean();
//         let newPassword = bcrypt.hashSync(body.password, saltRounds);
//         const update3 = { password: newPassword, resetShortToken: null };
//         if (!user2) {
//           return {
//             message: "you have entered the wrong token",
//           };
//         } else {
//           // await Users.findOneAndUpdate(user2._id, update3);
//           const passwordUpdate = await Users.findOneAndUpdate(
//             { _id: user2._id },
//             { $set: update3 }
//           );
//           // const emaildata = {
//           //     from: "noreply@edneed.com",
//           //     to: user2.email,
//           //     subject: 'Forgot Password || EdNeed.com ||',
//           //     html: "Dear " + user2.email + ",<br><br>Your Password has been changed."
//           // }
//           //const passwordUpdate = await Users.findOneAndUpdate({ _id: user3._id }, { $set: update4 });
//           let fileContent = fs.readFileSync(
//             "email/changed_password_success.html"
//           );
//           fileContent = fileContent.toString("utf8");
//           let compiledTemplate = Hogan.compile(fileContent);
//           if (user2.email) {
//             const emaildata = {
//               from: "noreply@edneed.com",
//               to: user2.email,
//               subject: "Password Set Successfully",
//               html: compiledTemplate.render({
//                 fullname: user2.fullname,
//                 email: user2.email,
//               }),
//               //html: "Dear " + data.email + ",<br><br>Your Password has been changed."
//             };
//             mailer(emaildata);
//           }

//           return {
//             message: "Password changed",
//           };
//         }
//       }
//     } else {
//       return { message: "You are not associated with this institute." };
//     }
//   }

//   public async contact_password_login_private_domain(body: any) {
//     let contactUser: any = await Users.findOne({ isDeleted: false, contact: body.contact, country_code: body.country_code }).lean();
//     if (contactUser) {
//       var xyz = bcrypt.compareSync(body.password, contactUser.password);
//       if (xyz != true) {
//         return {
//           status: 401,
//           statusText: constants.FAILED,
//           message: "Incorrect Password",
//         };
//       } else {
//         const instituteInfo = await institute
//           .findOne({ _id: contactUser.institute })
//           .lean();
//           const userRoleInfo :any = await userroleModel
//           .findOne({ role: contactUser.activeRole,institute:contactUser.institute,user:contactUser._id })
//           .lean();

//         const userToken = await this.getNewToken(contactUser);
//         contactUser.token = userToken.token;
//         contactUser.refreshToken = userToken.refreshToken;
//         return {
//           status: 201,
//           statusText: constants.SUCCESS,
//           data: contactUser,
//           user_role:userRoleInfo,
//           institute: instituteInfo,
//           token_data: userToken,
//         };
//       }
//     } else {
//       return ({ message: "Invalid Credentials." })
//     }
//   }

//   public async contact_password_login(body: any) {
//     let contactUser: any = await Users.findOne({ isDeleted: false, contact: body.contact, country_code: body.country_code }).lean();
//     let isContactLogin = true;
//     console.log(contactUser, "line 1670")
//     if (body.institute_domain) {
//       console.log("line 1667")
//       let result: any = await this.getPrivateDomainUser(contactUser.email, body.password, body.institute_domain, isContactLogin)
//       if (result) {
//         const instituteInfo: any = await institute
//           .findOne({ _id: contactUser.institute })
//           .lean();
//           const userRoleInfo :any = await userroleModel
//           .findOne({ role: result.activeRole,institute:result.institute,user:result._id })
//           .lean();
  
//         const userToken = await this.getNewToken(result);
//         result.token = userToken.token;
//         result.refreshToken = userToken.refreshToken;
//         return {
//           status: 201,
//           statusText: constants.SUCCESS,
//           data: result,
//           user_role:userRoleInfo,
//           institute: instituteInfo,
//           token_data: userToken,
//         };
//       } else {
//         return {
//           status: 401,
//           statusText: constants.FAILED,
//           message: constants.UNAUTHORIZED_USER,
//         };
//       }
//     }
//     if (contactUser) {
//       var xyz = bcrypt.compareSync(body.password, contactUser.password);
//       console.log(xyz, "line 1697")
//       if (xyz != true) {
//         console.log("line 1699")
//         return {
//           status: 401,
//           statusText: constants.FAILED,
//           message: "Incorrect Password.",
//         };
//       } else {
//         console.log("line 1706")
//         const instituteInfo = await institute
//           .findOne({ _id: contactUser.institute })
//           .lean();
//           const userRoleInfo :any = await userroleModel
//           .findOne({ role: contactUser.activeRole,institute:contactUser.institute,user:contactUser._id })
//           .lean();

//         console.log("line 1710", instituteInfo)
//         const userToken = await this.getNewToken(contactUser);
//         console.log("line 1712", userToken)
//         contactUser.token = userToken.token;
//         contactUser.refreshToken = userToken.refreshToken
//         console.log("line 1715", userToken)
//         return {
//           status: 201,
//           statusText: constants.SUCCESS,
//           data: contactUser,
//           user_role:userRoleInfo,
//           institute: instituteInfo,
//           token_data: userToken,
//         };
//       }
//     } else {
//       console.log("line 1725")
//       return ({ message: "Invalid Credentials." })
//     }
//   }

//   // public async updateInsti() {
//   //   const instituteDetails = await instituteModel.find({ isDeleted: false }).lean()
//   //   for (let i = 0; instituteDetails.length > 0; i++) {
//   //     let sName = instituteDetails[i].institute_name
//   //     if (sName) {
//   //       sName = sName.split(" ");
//   //       await instituteModel.findByIdAndUpdate({ _id: instituteDetails[i]._id }, { institute_short_name: sName[0], institute_is_pwa: false })
//   //     }
//   //   }
//   //   return "Successfully Updated"
//   // }
//   // end
// }
