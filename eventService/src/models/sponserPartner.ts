import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    domain: { type: String},
    partnerName: { type: String, required: true },
    businessIndustry: [{}],
    partnerAddress: { type: String },
    otp: { type: String },
    otpId: { type: String },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'

        },
        coordinates: {
            type: [Number],

        }
    },
    partnerDescription: { type: String },
    contact: { type: Number },
    country_code: { type: Number },
    validContact: { type: Boolean, default: false },
    landline: { type: Number },
    whatsappNo: { type: Number, unique: false },
    partnerEmail: { type: String },
    partnerWebsite: { type: String },
    partnerInstagram: { type: String },
    partnerFacebookId: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'category', },
    SubCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
    subSubCategory: { type: Schema.Types.ObjectId, ref: 'subSubCategory' },
    createrId: { type: Schema.Types.ObjectId, ref: 'user' },
    isBlackList: { type: Boolean, default: false },
    rating: { type: Number },
    city: { type: Schema.Types.ObjectId, ref: "city" },
    state: { type: Schema.Types.ObjectId, ref: "state" },
    postalCode: { type: Number },
    gstNo: { type: String },
    gstImage: [{ type: String }],
    aadharCardNo: { type: Number },
    aadharCardImage: [{ type: String }],
    panCardNo: { type: String },
    panCardImage: [{ type: String }],
    registrationNo: { type: String },
    registrationImage: [{
        type: String
    }],
    fssaiLicense: [{ type: String }],
    country: { type: String, default: "India" },
    isCreatedByOrginzer: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    contact_verify: { type: Boolean, default: false },
    ispartnerVerified: { type: Boolean, default: false },
    isFavourite: { type: Boolean, default: false },
    isRequestSend: { type: Boolean, default: false },
    isRequestAccept: { type: Boolean, default: false },
    isRequestReject: { type: Boolean, default: false },
    rejectDescription: { type: String },
    isPublished: { type: Boolean, default: false },

    isDeleted: { type: Boolean, default: false }

}, {
    timestamps: true
});

export interface IPartner extends Document {
    domain: String,
    category: ObjectId,
    subCategory: ObjectId,
    subSubCategory: ObjectId,
    ownerId: ObjectId,
    contactName: String,
    partnerDescription: String,
    partnerName: String,
    partnerAddress: String,
    otp: String,
    otpId: String,
    location: {
        type: String, // Don't do `{ location: { type: String } }`
        coordinates: [Number]
    }

    contact: Number,
    whatsappNo: Number,
    country_code: Number,
    landline: Number,
    validContact: Boolean,
    partnerEmail: String,
    partnerWebsite: String,
    partnerInstagram: String,
    partnerFacebookId: String,
    partnerType: String,
    createrId: ObjectId,

    planId: ObjectId,

    isBlackList: Boolean,
    rating: Number,
    city: ObjectId,
    state: ObjectId,
    postalCode: Number,
    aadharCardNo: Number,
    gstNo: String,
    gstImage: [String],
    fssaiLicense: [String],
    registrationNo: String,
    registrationImage: [String
    ],
    panCardNo: String,
    panCardImage: [String],
    country: String,
    isActive: Boolean,
    contact_verify: Boolean,
    ispartnerVerified: Boolean,
    isFavourite: Boolean,
    isRequestSend: Boolean,
    isRequestAccept: Boolean,
    isRequestReject: Boolean,
    isCreatedByOrginzer: Boolean,
    rejectDescription: String,
    isPublished: Boolean,
    isDeleted: Boolean
}
// user

export default model<IPartner>("eventpartner", schema);
