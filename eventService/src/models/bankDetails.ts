import { Document, model, Schema } from "mongoose";
import { ObjectId } from "bson";

const BankDetailsSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "userdetails" },
    academyOwner: { type: Schema.Types.ObjectId, ref: "academy_owners" },
    sponsorshipPartner: { type: Schema.Types.ObjectId, ref: "sponsor_partners" },
    schoolOwner: { type: Schema.Types.ObjectId, ref: "school_owners" },
    account_number: { type: Number },
    ifsc_code: { type: String },
    Bank_name: { type: String },
    Bank_address: { type: String },
    account_holder_name: { type: String },
    isActive: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export interface IBankDetails extends Document {
  user_id: ObjectId;
  academyOwner: ObjectId,
  sponsorshipPartner: ObjectId,
  account_number: Number;
  ifsc_code: String;
  Bank_name: String;
  Bank_address: String;
  account_holder_name: String;
  isActive: Boolean;
  isBlocked: Boolean;
  isDeleted: Boolean;
}

export default model<IBankDetails>("bank_details", BankDetailsSchema);
