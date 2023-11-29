import {Document, model, ObjectId, Schema } from "mongoose";

const schoolSchema = new Schema(
  {
    scholarship_id:{ type: Schema.Types.ObjectId,ref:"scholarship" },
    student_id:{ type: Schema.Types.ObjectId,ref:"userdetails" },
    status: { type: String},
    application_date: { type: Date },
    documents: [
            {
              document_type:  { type: String },
              file_url:  { type: String },
            }
          ],
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);


export interface IScholarshipApplication extends Document {
    scholarship_id:ObjectId,
    student_id:ObjectId,
    status: String,
    application_date: Date,
    documents: [
            {
              document_type:  String,
              file_url:  String,
            }
          ],
    isActive: Boolean,
    isDeleted: Boolean
}




export default model<IScholarshipApplication>("scholarship_application", schoolSchema);
