import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    guildLines: { type: String, required: true },
    type:{ type: String },
    categoryId: { type: Schema.Types.ObjectId,ref:"category" },
    ownerId: { type: Schema.Types.ObjectId,ref:"userDetails" },
    guildLinesImages: [{ type: String }],
    guildLinesVideo: [{ type: String }],
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface IEventGuildLines extends Document {
    guildLines: String,
    type:String,
    ownerId: ObjectId,
    categoryId: ObjectId,
    guildLinesImages: [String],
    guildLinesVideo: [String],
    active: Boolean,
    isDeleted: Boolean
}

export default model<IEventGuildLines>("eventguildlines", schema);