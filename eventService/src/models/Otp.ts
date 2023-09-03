import { Document, model, ObjectId, Schema } from "mongoose";

const userSchema = new Schema({
  contact: { type: Number,  trim: true},
  country_code: {type: Number,  trim: true},
  email: { type: String, },
  otp: { type: String, required: true },
  otpId: {type: String, required: true}
});


export default model("otp", userSchema);
