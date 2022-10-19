import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({

    organizerName: { type: String, required: true },
    eventId: [{ type: Schema.Types.ObjectId, ref: "event" }],
    organizerAddress: { type: String },
    contact: { type: Number },
    country_code: { type: Number },
    validContact: { type: Boolean, default: false },
    landline: { type: Number },
    whatsappNo: { type: Number, unique: false },
    createrId: { type: Schema.Types.ObjectId, ref: 'user' },
    isBlackList: { type: Boolean, default: false },
    city: { type: Schema.Types.ObjectId, ref: "city" },
    state: { type: Schema.Types.ObjectId, ref: "state" },
    postalCode: { type: Number },
    aadharCardNo: { type: Number },
    aadharCardImage: [{ type: String }],
    panCardNo: { type: String },
    panCardImage: [{ type: String }],
    country: { type: String, default: "India" },
    isActive: { type: Boolean, default: false },
    contact_verify: { type: Boolean, default: false },
    isorganizerVerified: { type: Boolean, default: false },
    bankaccountno: { type: Number },
    bankIFSECode: { type: String },
    isRequestSend: { type: Boolean, default: false },
    isRequestAccept: { type: Boolean, default: false },
    isRequestReject: { type: Boolean, default: false },
    rejectDescription: { type: String },
    isPublished: { type: Boolean, default: false },

    isDeleted: { type: Boolean, default: false }

}, {
    timestamps: true
});

export interface Iorganizer extends Document {
    organizerName: { type: String, required: true },
    eventId: [{ type: Schema.Types.ObjectId, ref: "event" }],
    organizerAddress: String,
    contact: Number,
    country_code: Number,
    validContact: Boolean,
    landline: Number,
    whatsappNo: { type: Number, unique: false },
    createrId: ObjectId,
    isBlackList: Boolean,
    city: ObjectId,
    state: ObjectId,
    postalCode: Number,
    aadharCardNo: Number,
    aadharCardImage: [String],
    panCardNo: String,
    panCardImage: [String],
    country: { type: String },
    isActive: Boolean,
    contact_verify: Boolean,
    isorganizerVerified: Boolean,
    bankaccountno: Number,
    bankIFSECode: String,
    isRequestSend: Boolean,
    isRequestAccept: Boolean,
    isRequestReject: Boolean,
    rejectDescription: String,
    isPublished: Boolean,
    isDeleted: Boolean
}
// user

export default model<Iorganizer>("eventorganizer", schema);
