import {Document, model, Schema} from "mongoose";

const roleSchema = new Schema(
  {
    kind: { type: String, required: true, default:"normal", enum:['normal','institute'] },
    role:{type:String, required:true},
    access:{type:Array, defult:[]},
    isDefault:{type:Boolean, defult:false},
    roletype:{type:String ,enum:['institute_admin','teacher','student','edneed_user']}
  },
  {
    timestamps: true,
  }
);


export default model("role", roleSchema);
