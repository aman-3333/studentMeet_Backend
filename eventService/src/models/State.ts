import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    State: { type: String, required: true },
    Description: { type: String },
    picture: { type: String },
    active: { type: Boolean, default: true },
    ownerId: { type: Schema.Types.ObjectId },
    isDeleted: { type: Boolean, default: false },
    countryId:{ type:Schema.Types.ObjectId, ref: "country" },
}, {
    timestamps: true
});

export interface IState extends Document {
    State: String,
    Description: String,
    ownerId: ObjectId,
    countryId: ObjectId,
    picture: String,
    active: Boolean,
    isDeleted: Boolean
}

export default model<IState>("State", schema);