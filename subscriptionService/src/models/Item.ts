import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    itemName: {type: String},
    itemSize: {type: String},
    itemColor: {type: String},
    itemPrice: {type: String},
    itemImage: {type: String},
    itemDiscount: {type: String},
    productId: {type: Schema.Types.ObjectId, ref: 'product', required: true},
    vendorShopId: {type: Schema.Types.ObjectId, ref: 'vendorshop', required: true},
    isDeleted: {type:Boolean,default:false}
}, {
    timestamps: true
});

export interface Item extends Document {
    itemName: String,
    itemSize: String,
    itemColor: String,
    itemPrice: String,
    itemImage: String,
    itemDiscount: String,
    productId: ObjectId,
    vendorShopId: ObjectId,
    isDeleted: Boolean
}
// user

export default model("item", schema);