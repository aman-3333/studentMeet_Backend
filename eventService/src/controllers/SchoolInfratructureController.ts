import bankDetails from "../models/bankDetails";
import SchoolInfrastructure, { ISchoolInfrastructure } from "../models/schoolInfrasturcture";

export default class SchoolInfrastructureController {
  public async createSchoolInfrastructure(body: any) {
    let schoolInfrastructureInfo: any;
    schoolInfrastructureInfo = await SchoolInfrastructure.create(body);
    return schoolInfrastructureInfo;
  }

  public async editSchoolInfrastructure(body: ISchoolInfrastructure) {
    const schoolInfrastructureInfo: ISchoolInfrastructure = await SchoolInfrastructure.findOneAndUpdate(
      { _id: body._id, isDeleted: false },
      body,
      { new: true }
    ).lean();
    return schoolInfrastructureInfo;
  }

  public async getSchoolInfrastructureList(schoolId: any) {
    const schoolInfrastructureList: ISchoolInfrastructure[] = await SchoolInfrastructure.find({
      schoolId: schoolId,
      isDeleted: false,
    });
    return schoolInfrastructureList;
  }

  public async getSchoolInfrastructureInfoById(schoolInfrastructureId: any) {
    const schoolInfrastructureInfo: any = await SchoolInfrastructure.findOne({
      _id: schoolInfrastructureId,
      isDeleted: false,
    }).lean();
    return schoolInfrastructureInfo;
  }



  
  public async getBankdetailInfoById(schoolInfrastructureId: any) {
    const schoolInfrastructureInfo: any = await bankDetails.findOne({
      schoolInfrastructure: schoolInfrastructureId,
      isDeleted: false,
    }).lean();
    return schoolInfrastructureInfo;
  }

  public async deleteSchoolInfrastructure(schoolInfrastructureId: String) {
    const schoolInfrastructureInfo: ISchoolInfrastructure = await SchoolInfrastructure.findOneAndUpdate(
      { _id: schoolInfrastructureId, isDeleted: false },
      { $set: { isDeleted: true } },
      { new: true }
    ).lean();
    return schoolInfrastructureInfo;
  }
}
