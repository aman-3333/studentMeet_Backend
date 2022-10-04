import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    services: [{
        Count: { type: String },
        Price: { type: Number }
    }],
    products: [{
        Count: { type: String },
        Price: { type: Number }
    }],
    voucher: [{
        Count: { type: String },
        Price: { type: Number }
    }],
    consultancy: [{
        noOfDays: { type: String },
        Price: { type: Number }
    }],
    blog: [{
        Count: { type: String },
        Price: { type: Number }
    }],
    digitalMarketing: [{
        noOfDays: { type: String },
        Price: { type: Number },
        service: { type: String }
    }],
    promotion: [{
        noOfDays: { type: String },
        Price: { type: Number },
        service: { type: String }
    }],
    advertisementFormat: [{
        noOfDays: { type: String },
        Price: { type: Number },
        service: { type: String }
    }],
    Recomendition: [{
        noOfDays: { type: String },
        Price: { type: Number },
        service: { type: String }
    }],
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface Item extends Document {
    services: [{
        Count: String,
        Price: Number
    }],
    products: [{
        Count: String,
        Price: Number
    }],
    voucher: [{
        Count: String,
        Price: Number
    }],
    consultancy: [{
        noOfDays: String,
        Price: Number
    }],
    blog: [{
        Count: String,
        Price: Number
    }],
    digitalMarketing: [{
        noOfDays: String,
        Price: Number,
        service: String
    }],
    promotion: [{
        noOfDays: String,
        Price: Number,
        service: String
    }],
    advertisementFormat: [{
        noOfDays: String,
        Price: Number,
        service: String
    }],
    Recomendition: [{
        noOfDays: String,
        Price: Number,
        service: String
    }],
    isDeleted: Boolean
}



export default model("Subscription", schema);