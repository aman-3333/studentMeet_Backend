import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    
    eventId: { type: Schema.Types.ObjectId, ref: "event" },
    userId: { type: Schema.Types.ObjectId, ref: "userdetail" },
    isEventBook: { type: Boolean, default: false },
    isEventOrganizer: { type: Boolean, default: false },
    order_id: { type: String },
    receipt: { type: String },
    payment_status: { type: String },
    payment_method: { type: String },
    payment_id: { type: String },
    receipt_generation_date: { type: Date },
    orderTotal: { type: Number },
    refund_requested: { type: Boolean, default: false },
    refund_status: { type: String, enum: ["approved", "rejected", "processed", "completed", "requested"], trim: true },
    refund_reason: { type: String, trim: true },
    refund_rejection_reason: { type: String, trim: true },
    refund_approval: { type: Boolean, default: false },
    refund_request_date: { type: Date },
    refund_rejection_date: { type: Date },
    refund_completion_date: { type: Date },
    refund_approval_date: { type: Date },
    tax: { type: Number },
    refundMassage: { type: String },
    refundStatus: { type: Boolean, default: false },
    order_payment_method: { type: String },
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
   
}, {
    timestamps: true
});

export interface IBookEvent extends Document {
    eventId: ObjectId,
    userId: ObjectId,
    isEventBook: Boolean,
    isEventOrganizer: Boolean,
    order_id: String,
    receipt: String,
    payment_status: String,
    payment_method: String,
    payment_id: String,
    receipt_generation_date:Date,
    orderTotal: Number,
    refund_requested: Boolean,
    refund_status: String,
    refund_reason: String,
    refund_rejection_reason: String,
    refund_approval: Boolean,
    refund_request_date:Date,
    refund_rejection_date:Date,
    refund_completion_date:Date,
    refund_approval_date:Date,
    tax: Number,
    refundMassage: String,
    refundStatus: Boolean,
    order_payment_method: String,
    active: Boolean,
    isDeleted: Boolean
}

export default model<IBookEvent>("bookevent", schema);