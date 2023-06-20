import { Document, model, ObjectId, Schema } from "mongoose";
import { DATETIME_FORMAT } from "../utils/Constants";


const userAchievementSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId,ref:"userDeatils" },
   Achievement:[{
    tournament:{type:String},
    position:{type:String},
    date:{type:Date},
    sports:{type: Schema.Types.ObjectId,ref:"sportsCategory"},
    picture:[{type:String}]
   }]
  },
  {
    timestamps: true,
  }
);
export default model ("userAchievement", userAchievementSchema);
