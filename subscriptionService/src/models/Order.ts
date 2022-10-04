import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'product', required: true },
    status: { type: String },
    price: { type: Number },
    sku: { type: Number },
    quantity: { type: Number },
    subTotal: { type: Number },
    itemDiscount: { type: Number },
    tax: { type: Number },
    shipping: { type: Number },
    total: { type: Number },
    promo: { type: String },
    discount: { type: Number },
    grandTotal: { type: Number },
    fullname: { type: String },
    contact: { type: Number, trim: true },
    email: { type: String },
    address: { type: String },
    city: { type: String },
    postalCode: { type: Number },
    country_code: { type: Number, trim: true },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface IOrder extends Document {
    userId: ObjectId,
    productId: ObjectId,
    status: String,
    price: Number,
    sku: Number,
    quantity: Number,
    subTotal: Number,
    itemDiscount: Number,
    tax: Number,
    shipping: Number,
    total: Number,
    promo: String,
    discount: Number,
    grandTotal: Number,
    fullname: String,
    contact: Number,
    email: String,
    address: String,
    city: String,
    postalCode: Number,
    country_code: Number,
}
// user

export default model<IOrder>("Order", schema);