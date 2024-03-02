import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    Description: { type: String },
    location: { type: String },
    
    picture: [{ type: String }],
    result: { type: String },
    participants:[{ type:Schema.Types.ObjectId, ref: "userdetails" }],
    tournamentId:{ type:Schema.Types.ObjectId, ref: "tournaments" },
    date:{type: Date},
    active: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true
});


export interface ITournamentMatch extends Document {
    Description: String,
    location: String,
    picture: [String],
    result: Date,
    participants:[ObjectId],
    participant2:ObjectId,
    tournamentId:ObjectId,
    date:Date,
    active:Boolean,
    isDeleted: Boolean
}

export default model<ITournamentMatch>("tournament_match", schema);