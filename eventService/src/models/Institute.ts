import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    instituteName:[{
        type: String
    }],
    StateId: { type: Schema.Types.ObjectId,ref:"State" },
    Description: { type: String },
    picture: { type: String },
    isActive: { type: Boolean, default: true },
    ownerId: { type: Schema.Types.ObjectId,ref:"Users"},
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface IInstitute extends Document {
    instituteName:[String],
    StateId: ObjectId,
    Description: String,
    ownerId: ObjectId,
    picture: String,
    isActive: Boolean,
    isDeleted: Boolean
}

export default model<IInstitute>("Institute", schema);