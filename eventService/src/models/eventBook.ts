import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    
    eventId: { type: Schema.Types.ObjectId, ref: "event" },
    userId: { type: Schema.Types.ObjectId },
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface IBookEvent extends Document {
    eventId: ObjectId,
    userId: ObjectId,
    active: Boolean,
    isDeleted: Boolean
}

export default model<IBookEvent>("bookevent", schema);