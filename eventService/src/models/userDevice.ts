import { Document, model, ObjectId, Schema } from "mongoose";
import { DATETIME_FORMAT } from "../utils/Constants";


const userdeviceSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId,ref:"userDeatils" },
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

    
   
  },
  {
    timestamps: true,
  }
);
export default model ("userdevice", userdeviceSchema);
