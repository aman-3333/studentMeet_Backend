import { Document, model, Schema } from "mongoose";

const tokenSchema = new Schema(
    {
        userid: {type: Schema.Types.ObjectId, required:true, ref:'userdetails'},
        token: {type:String},
        refreshToken: {type:String},
        tokenExpiryAt: {type:Number},
        refreshTokenExpiryAt: {type:Number},
        newTokenDuration:{type:Number},
        flag:{type:Number}
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
