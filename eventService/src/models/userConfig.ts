import { Document, model, ObjectId, Schema } from "mongoose";
import { DATETIME_FORMAT } from "../utils/Constants";


const userConfigSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId,ref:"userdetail" },
    current_app_version: { type: String },
    device_token: { type: String },
    location_coords:{ type: String },
    uninstalled_on:{type:Date},
  },
  {
    timestamps: true,
  }
);
export default model ("userconfig", userConfigSchema);
