import { Document, model, ObjectId, Schema } from "mongoose";
import { DATETIME_FORMAT } from "../utils/Constants";

const eventSchema = new Schema( 
  {
    participentId:[{type:Schema.Types.ObjectId,ref:"Users"}],
    eventId:{type:Schema.Types.ObjectId,ref:"event"},
    participentImages:[{ type: String }],
    aadharCardNo:{ type: String },
    aadharCardImages:{ type: String },
    panCard:{ type: String },
    panCardImages:{ type: String },
    gstNo:{ type: String },
    gstImage:{ type: String }
  },
  {
    timestamps: true,
  }
);

export interface IEvent extends Document {
    participentId:ObjectId,
    eventId:ObjectId,
    participentImages:[String],
    aadharCardNo:String,
    aadharCardImages:String,
    panCard:String,
    panCardImages:String,
    gstNo:String,
    gstImage:String
}
// user

export default model<IEvent>("event", eventSchema);
