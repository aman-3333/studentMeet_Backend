import {Document, model, Schema} from "mongoose";

const schema = new Schema({
    domain: { type: String, required: true },
    domain_years:{type: String, required: true },
    invoiceID: {type: String},
    reciept: {type: String, required: true},
    discount: {type: String},
    email: {type: String, required: true},
    // password: {type: String, required: true},
    fullname: {type: String, required: true},
    company: {type: String},
    address: {type: String},
    city: {type: String},
    state: {type: String},
    country: {type: String},
    zipcode: {type: String},
    phone: {type: String},
    country_code: {type: String},
    language_code: {type: String},
    customerId: {type: Schema.Types.ObjectId, ref:'customer'},
    user: {type: Schema.Types.ObjectId, required:true, ref:'user'},
    institute :{type: Schema.Types.ObjectId, required:true, ref:'institute'},
    privacy_protection:{type: Boolean},
    privacy_protection_years:{type: String},
    web_hosting:{type: Boolean},
    web_hosting_years:{type: String},
    ssl:{type: Boolean},
    ssl_years:{type: String },
    domain_tlds:{type: String, required: true},
    tax_fee:{type: String },
    total_amount:{type: String},
    isDeleted: {type:Boolean, default: false},
  }, {
    timestamps: true
  });

  export default model("domain", schema);