import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
   
    donatedById: { type: Schema.Types.ObjectId, ref: "userdetails" },
    donatedToId: { type: Schema.Types.ObjectId, ref: "userdetails" },
    payment_method: {type:String},
      order_id: {type:String},
      receipt: {type:String},
      amount: {type:Number},
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});



export interface IDonate extends Document {
    donatedById: ObjectId,
    donatedToId: ObjectId,
    payment_method: String,
      order_id: String,
      receipt: String,
      amount: Number,
    isActive: Boolean,
    isDeleted: Boolean
}

export default model<IDonate>("donatation", schema);