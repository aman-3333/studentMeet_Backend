import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    sport: { type: String, required: true },
    Description: { type: String },
    picture: { type: String },
    active: { type: Boolean, default: true },
    ownerId: { type: Schema.Types.ObjectId,ref:"userdetail" },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface ISports extends Document {
    sport: String,
    Description: String,
    ownerId: ObjectId,
    picture: String,
    active: Boolean,
    isDeleted: Boolean
}

export default model<ISports>("sport", schema);