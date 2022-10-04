import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({

        subscriptionName: { type: String },

        PlanId: { type: Schema.Types.ObjectId, required: true },
        validityDays: { type: Number },
        couponId: { type: Schema.Types.ObjectId },
        ownerId: { type: Schema.Types.ObjectId, required: true },
        isDownGrade: { type: Boolean, default: false },
        isUpgrade: { type: Boolean, default: false },
        isRenewel: { type: Boolean, default: false },
        isActive: { type: Boolean, default: false },

        isDeleted: { type: Boolean, default: false },

}, {
        timestamps: true
});

export interface ISubscription extends Document {
        subscriptionName: String,

        PlanId: ObjectId
        validityDays: Number,

        ownerId: ObjectId,
        isDownGrade: Boolean,
        isUpgrade: Boolean,
        isRenewel: Boolean,
        isActive: Boolean,



        isDeleted: Boolean
}



export default model<ISubscription>("Subscription", schema);