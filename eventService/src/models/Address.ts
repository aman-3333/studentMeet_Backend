
import { Document, model, ObjectId, Schema } from "mongoose";
console.log("line 3 Connected")
const schema = new Schema({
  name: { type: String },
  userId: { type: Schema.Types.ObjectId, required: true },
  domain: { type: String },
  phone: { type: Number },
  countryCode: { type: String },
  fullAddress: { type: String },
  addressLineTwo: { type: String },
  addressLineThree: { type: String },
  pinCode: { type: String },
  city: { type: String },
  state: { type: String },
  landmark: { type: String },
  country: { type: String },
  alternatePhone: { type: Number },
  addressType: { type: String },
  isDeleted: { type: Boolean, default: false },
  activeAddress: { type: Boolean, default: true }
});

export interface IOrderaddress extends Document {
  name: String,
  userId: ObjectId,
  domain: String,
  phone: Number,
  fullAddress: String,
  addressLineTwo: String,
  addressLineThree: String,
  country: String,
  city: String,
  state: String,
  landmark?: String,
  alternatePhone?: Number,
  addressType?: String,
  isDeleted: Boolean
}
// user

export default model<IOrderaddress>("Orderaddress", schema);