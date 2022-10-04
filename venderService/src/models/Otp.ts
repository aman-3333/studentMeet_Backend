import { Document, model, ObjectId, Schema } from "mongoose";

const userSchema = new Schema({
  contact: { type: Number, required: true, trim: true},
  country_code: {type: Number, required: true, trim: true},

  otp: { type: String, required: true },
  otpId: {type: String, required: true}
});


export default model("otp", userSchema);
