import { Document, model, Schema } from "mongoose";

const tokenSchema = new Schema(
    {
        userid: {type: Schema.Types.ObjectId, required:true, ref:'user'},
        token: String,
        refreshToken: String,
        tokenExpiryAt: Number,
        refreshTokenExpiryAt: Number,
        newTokenDuration:Number,
        flag:Number
    },
    { timestamps: true }
);

export interface IToken extends Document {
    userid: string;
    token: string;
    refreshToken: string;
    tokenExpiryAt: Number;
    refreshTokenExpiryAt: Number;
    newTokenDuration:Number;
    flag:Number
}

export default model<IToken>("Token", tokenSchema);
