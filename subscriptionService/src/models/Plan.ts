import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    ownerId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    planGrandTotal: { type: Number },
    planValidity: { type: Number },
    services: [{
        Count: { type: Number },
        noOfDays: { type: Number },
        description: { type: String },
        images: [{ type: String }],
        Price: { type: Number }
    }],
    products: [{
        Count: { type: Number },
        noOfDays: { type: Number },
        description: { type: String },
        images: [{ type: String }],
        Price: { type: Number }
    }],
    voucher: [{
        Count: { type: Number },
        noOfDays: { type: Number },
        description: { type: String },
        images: [{ type: String }],
        Price: { type: Number },
        couponId: { type: Schema.Types.ObjectId, ref: 'coupon', }
    }],
    consultancy: [{
        noOfDays: { type: Number },
        description: { type: String },
        images: [{ type: String }],
        Price: { type: Number }
    }],
    blog: [{
        Count: { type: Number },
        noOfDays: { type: Number },
        description: { type: String },
        images: [{ type: String }],
        Price: { type: Number }
    }],
    digitalMarketing: [{
        noOfDays: { type: Number },
        description: { type: String },
        images: [{ type: String }],
        Price: { type: Number },
        service: { type: String }
    }],
    promotion: [{
        noOfDays: { type: Number },
        Price: { type: Number },
        description: { type: String },
        images: [{ type: String }],
        service: { type: String }
    }],
    advertisementFormat: [{
        noOfDays: { type: Number },
        Price: { type: Number },
        description: { type: String },
        images: [{ type: String }],
        service: { type: String }
    }],
    payAttention: [{
        noOfDays: { type: Number },
        Price: { type: Number },
        description: { type: String },
        images: [{ type: String }],
        service: { type: String }
    }],
    Recomendition: [{
        noOfDays: { type: Number },
        Price: { type: Number },
        description: { type: String },
        images: [{ type: String }],
        service: { type: String }
    }],
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface IPlan extends Document {
    ownerId: ObjectId,
    userId: ObjectId,
    planGrandTotal: Number,
    services: [{
        Count: String,
        description: String,
        images: [String],
        Price: Number
    }],
    products: [{
        Count: Number,
        description: String,
        noOfDays: Number,
        images: [String],
        Price: Number
    }],
    voucher: [{
        Count: Number,
        description: String,
        noOfDays: Number,
        images: [String],
        Price: Number
    }],
    consultancy: [{
        noOfDays: Number,
        description: String,
        images: [String],
        Price: Number
    }],
    blog: [{
        Count: Number,
        description: String,
        noOfDays: Number,
        images: [String],
        Price: Number
    }],
    digitalMarketing: [{
        noOfDays: Number,
        description: String,
        images: [String],
        Price: Number,
        service: String
    }],
    promotion: [{
        noOfDays: Number,
        description: String,
        images: [String],
        Price: Number,
        service: String
    }],
    advertisementFormat: [{
        noOfDays: Number,
        description: String,
        images: [String],
        Price: Number,
        service: String
    }],
    payAttention: [{
        noOfDays: Number,
        Price: Number,
        description: String,
        images: [String],
        service: String
    }],
    Recomendition: [{
        noOfDays: Number,
        description: String,
        images: [String],
        Price: Number,
        service: String
    }],
    isDeleted: Boolean
}



export default model<IPlan>("Plan", schema);