import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    workerName: { type: String, required: true },
    wokerPicture: [{ type: String }],
    wokerJobs: { type: Number },
    wokerRate: { type: Number },
    workExperience: { type: Number },
    workAbout: { type: String },
    otp: { type: String },
    otpId: { type: String },
    workerAccountNo: { type: Number },
    workerIfscCode: { type: String },
    workerSignature: { type: String },
    workerAadharCard: { type: String },
    workerPanCard: { type: String },
    workerDrivingLicence: { type: String },
    AgentId: { type: Schema.Types.ObjectId, ref: 'agent' },
    isSelfConnected: { type: Boolean, default: false },
    BookingCategory: { type: Schema.Types.ObjectId, ref: 'BookingCategory', required: true },
    subBookingCategory: {
        type: Schema.Types.ObjectId, ref: 'subBookingCategory'
    },
    //shopType: { type: String, default: "retailer", enum: ['Single-location retailers', 'Chain stores', 'Franchises', 'Department stores', 'Grocery stores, supermarkets and hypermarkets', 'Discount retailers', 'Outlet retailers', 'Warehouse stores', 'Convenience stores', 'wholesale'] },
    shopAddress: { type: String },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'

        },
        coordinates: {
            type: [Number],

        }
    },
    contact: { type: Number },
    country_code: { type: Number },
    landline: { type: Number },
    alternativePhoneNo: { type: Number },
    shopPicture: [{ type: String }],
    shopEmail: { type: String },
    shopWebsite: { type: String },
    shopInstagram: { type: String },
    shopFacebookId: { type: String },
    SubscriptionId: { type: Schema.Types.ObjectId, ref: 'category' },
    product: { type: Schema.Types.ObjectId, ref: 'product' },
    room: { type: Schema.Types.ObjectId, ref: 'room' },
    blackList: { type: Boolean, default: false },
    address1: { type: String, required: true },
    address2: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: Number },
    gstNo: { type: String },
    registrationNo: { type: String },
    country: { type: String, default: "India" },
    isShopVerified: { type: Boolean, default: false },
    isFavourite: { type: Boolean, default: false },
    isRequestSend: { type: Boolean, default: false },
    isRequestAccept: { type: Boolean, default: false },
    isRequestReject: { type: Boolean, default: false },
    rejectDescription: { type: String },
    isPublished: { type: Boolean, default: false },
    rating: [{
        userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
        rating: { type: Number }
    }],
    comment: [{
        userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
        comment: { type: String }
    }],
    likeProfile: [{
        userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
        likeProfile: { type: Number }
    }],
    Review: [{
        userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
        likeProfile: { type: Number },
        Review: { type: String },
        images: [{
            type: String
        }]
    }],

    isDeleted: { type: Boolean, default: false }

}, {
    timestamps: true
});

export interface IWorker extends Document {
    workerName: String,
    wokerPicture: [String],
    otp: String,
    otpId: String,
    workExperience: { type: Number },
    workAbout: { type: String },
    workerAccountNo: { type: Number },
    workerIfscCode: String,
    workerSignature: String,
    workerAadharCard: String,
    workerPanCard: String,
    workerDrivingLicence: String,
    AgentId: ObjectId,
    shopAddress: String,
    isSelfConnected: Boolean,
    location: {
        type: String,
        coordinates: [Number]
    },
    contact: Number,
    country_code: Number,
    landline: Number,
    alternativePhoneNo: Number,
    BookingCategory: ObjectId,
    subBookingCategory: ObjectId,
    shopPicture: [String],
    shopEmail: String,
    shopWebsite: String,
    shopInstagram: String,
    shopFacebookId: String,
    shopType: String,
    owner: ObjectId,

    SubscriptionId: ObjectId,
    room: ObjectId,
    product: [ObjectId],
    blackList: Boolean,
    address1: String,
    address2: String,
    city: String,
    state: String,
    postalCode: Number,
    gstNo: String,
    registrationNo: String,
    country: String,
    rating: [{
        userId: ObjectId,
        rating: Number
    }],
    comment: [{
        userId: ObjectId,
        comment: String
    }],
    likeProfile: [{
        userId: ObjectId,
        likeProfile: Number
    }],
    Review: [{
        userId: ObjectId,
        likeProfile: Number,
        Review: String
        images: [{
            type: String
        }]
    }],
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

export default model<IWorker>("Worker", schema);
