import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({

    school:{ type:Schema.Types.ObjectId, ref: "school" },
    userId:{ type:Schema.Types.ObjectId, ref: "userdetails" },
    Description: { type: String },
    picture: { type: String },
    is_star_performer:{ type: Boolean, default: false },
    performance_field:{ type: String },
    active: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true
});



export interface IStarPerformer extends Document {
    school:ObjectId,
    userId:ObjectId,
    Description: String,
    performance_field: String,
    picture: String,
    is_star_performer:Boolean,
    active: Boolean,
    isDeleted: Boolean,
}

export default model<IStarPerformer>("starperformer", schema);