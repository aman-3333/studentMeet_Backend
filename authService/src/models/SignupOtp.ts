import { Document, model, ObjectId, Schema } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, trim: true},
  otp: { type: String, required: true },
  isDeleted: {type:Boolean, default: false}
});


export default model("signupotp", userSchema);
