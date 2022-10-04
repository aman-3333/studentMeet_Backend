import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    State: { type: String, required: true },
    Description: { type: String },
    picture: { type: String },
    active: { type: Boolean, default: true },
    userId: { type: Schema.Types.ObjectId },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface IState extends Document {
    State: String,
    Description: String,
    userId: ObjectId,
    picture: String,
    active: Boolean,
    isDeleted: Boolean
}

export default model<IState>("State", schema);