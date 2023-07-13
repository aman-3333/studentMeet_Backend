import { Document, model, ObjectId, Schema } from "mongoose";
import { DATETIME_FORMAT } from "../utils/Constants";

const schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId },
    domain: { type: String },
    CartTotal: { type: Number, default: 0 },
    businessShopId: { type: Schema.Types.ObjectId },
    deliveryFees: { type: Number, default: 0 },
    shipping_price: { type: Number, default: 0 },
    disCountflat: { type: Number, default: 0 },
    disCountPercent: { type: Number, default: 0 },
    GrandTotal: { type: Number, default: 0 },
    beforediscount: { type: Number, default: 0 },
    afterdiscount: { type: Number, default: 0 },
    tax_amount: { type: Number, default: 0 },
    tax_included: Boolean,
    total_discount: { type: Number, default: 0 },
    cartProduct: [{ 
      productId:{type:Schema.Types.ObjectId,ref:"Product"},
      quantity:{ type: Number, default: 0 },
     }],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export interface ICart extends Document {

}
// user

export default model<ICart>("Cart", schema);