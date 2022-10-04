import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    contactName: { type: String, requried: true },
    shopName: { type: String },
    contactImage: [{ type: String }],
    shopImage: [{ type: String }],
    shopBannerImage: [{ type: String }],
    shopAddress: { type: String },
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
    contact: {
        type: Number, trim: true
    },
    country_code: {
        type: Number, trim: true
    },
    validContact: { type: Boolean, default: false },
    landline: {
        type: Number, trim: true
    },
    whatsappNo: { type: Number, trim: true },
    shopEmail: { type: String },
    shopWebsite: { type: String },
    shopInstagram: { type: String },
    shopFacebookId: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: 'user', },
    category: { type: Schema.Types.ObjectId, ref: 'category', },
    SubCategory: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
    subSubCategory: { type: Schema.Types.ObjectId, ref: 'subSubCategory' },

    planId: { type: Schema.Types.ObjectId, ref: 'category' },
    product: { type: Schema.Types.ObjectId, ref: 'product' },
    room: { type: Schema.Types.ObjectId, ref: 'room' },
    couponId: [{
        type: Schema.Types.ObjectId, ref: 'coupon'
    }],
    isBlackList: { type: Boolean, default: false },
    rating: { type: Number },


    city: { type: Schema.Types.ObjectId, ref: "city" },
    state: { type: Schema.Types.ObjectId, ref: "state" },
    postalCode: { type: Number },
    gstNo: { type: String },
    aadharCardNo: { type: Number },
    aadharCardImage: [{ type: String }],
    panCardNo: { type: String },
    panCardImage: [{ type: String }],
    gstImage: [{ type: String }],
    registrationNo: { type: String },
    registrationImage: [{
        type: String
    }],
    appVersion: { type: String },
    deviceVersion: { type: String },
    deviceType: { type: String },
    deviceName: { type: String },
    fssaiLicense: [{ type: String }],
    country: { type: String, default: "India" },
    isActive: { type: Boolean, default: false },
    contact_verify: { type: Boolean, default: false },
    isShopVerified: { type: Boolean, default: false },
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

export interface IShop extends Document {
    contactName: String,
    contactImage: [String],
    shopImage: [String],
    shopBannerImage: [String],
    shopName: String,
    shopAddress: String,
    otp: String,
    otpId: String,
    location: {
        type: String, // Don't do `{ location: { type: String } }`
        coordinates: [Number]
    }
    appVersion: String,
    deviceVersion: String,
    deviceType: String,
    deviceName: String,
    contact: Number,
    whatsappNo: Number,
    country_code: Number,
    landline: Number,
    validContact: Boolean,
    shopEmail: String,
    shopWebsite: String,
    shopInstagram: String,
    shopFacebookId: String,
    shopType: String,
    owner: ObjectId,
    category: ObjectId,
    subCategory: ObjectId,
    subSubCategory: ObjectId,
    planId: ObjectId,
    couponId: [ObjectId],
    room: ObjectId,
    product: [ObjectId],
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
    isShopVerified: Boolean,
    isFavourite: Boolean,
    isRequestSend: Boolean,
    isRequestAccept: Boolean,
    isRequestReject: Boolean,
    rejectDescription: String,
    isPublished: Boolean,
    isDeleted: Boolean
}
// user

export default model<IShop>("vendorshop", schema);
