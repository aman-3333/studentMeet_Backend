import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    
    sponsorshipId: { type: Schema.Types.ObjectId, ref: "sponsorship" },
    applyInfo:[{
        userId: { type: Schema.Types.ObjectId, ref: "userdetail" },
        ownerId: { type: Schema.Types.ObjectId, ref: "userdetail" },
        dateTime:{type:Date},
        status:{type:String},
        text:{type:String}
    }],
   
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
   
}, {
    timestamps: true
});

export interface ISponsorshipApply extends Document {
    // sponsorshipId: ObjectId,
   
    // applyInfo:[{
    //     userId: ObjectId,
    //     dateTime:Date,
    //     status:String,
    //     text:String,
    //     ownerId: ObjectId,
    // }],
    // isActive: Boolean,
    // isDeleted: Boolean
}

export default model<ISponsorshipApply>("applysponsorship", schema);