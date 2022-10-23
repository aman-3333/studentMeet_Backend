import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    
    eventId: { type: Schema.Types.ObjectId, ref: "event" },
    userId: { type: Schema.Types.ObjectId },
    isEventBook: { type: Boolean, default: false },
    isEventOrganize: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface IBookEvent extends Document {
    eventId: ObjectId,
    userId: ObjectId,
    isEventBook: Boolean,
    isEventOrganize: Boolean,
    active: Boolean,
    isDeleted: Boolean
}

export default model<IBookEvent>("bookevent", schema);