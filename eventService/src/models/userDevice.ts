import { Document, model, ObjectId, Schema } from "mongoose";
import { DATETIME_FORMAT } from "../utils/Constants";


const userdeviceSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId,ref:"userdetail" },
    gcmid: { type: String },
    fcmtoken: { type: String },
    ipAddress:{ type: String },
    modelName:{ type: String },
    manufacturer:{ type: String },
    maxMemorybigint:{ type: Number, trim: true },
    freeMemory:{ type: Number, trim: true },
    osVersion:{ type: Number, trim: true },
    appVersion:{ type: Number, trim: true },
    networkCarrier:{ type: String },
    dimension:{ type: String },
    currentLat:{ type: Number },
    currentLong:{ type: Number },
   
  },
  {
    timestamps: true,
  }
);
export default model ("userdevice", userdeviceSchema);
