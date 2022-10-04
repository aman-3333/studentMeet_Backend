import {Document, model, Schema} from "mongoose";

const userroleSchema = new Schema(
  {
    kind: { type: String, required: true, default:"normal", enum:['normal','owner','teacher','student'] },
    user: { type: Schema.Types.ObjectId, required: true, ref:'user' }, // Student, Teacher, Owner
    owner: { type: Schema.Types.ObjectId, ref:'user' }, // PAGE OWNER ID
    role: { type: Schema.Types.ObjectId, required: true, ref:'role' }, // Role_id
    institute: { type: Schema.Types.ObjectId, ref:'institute',required:true }, // PageID, other reference id,
    admission_no:{type:String},
    isDeleted:{type:Boolean,default:false},
    isApproved:{type: Boolean, default:true},
    isDefault:{type: Boolean, default:false}
  },
  {
    timestamps: true,
  }
);


export default model("userrole", userroleSchema);
