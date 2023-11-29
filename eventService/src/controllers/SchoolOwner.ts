import bankDetails from "../models/bankDetails";
import SchoolOwner, { ISchoolOwner } from "../models/schoolsOwner.model";

export default class SchoolOwnerController {
  public async createSchoolOwner(body: any) {
    let schoolOwnerInfo: any;
    schoolOwnerInfo = await SchoolOwner.create(body);
    return schoolOwnerInfo;
  }

  public async editSchoolOwner(body: ISchoolOwner) {
    const schoolOwnerInfo: ISchoolOwner = await SchoolOwner.findOneAndUpdate(
      { _id: body._id, isDeleted: false },
      body,
      { new: true }
    ).lean();
    return schoolOwnerInfo;
  }

  public async getSchoolOwnerList(stateId: any) {
    const schoolOwnerList: ISchoolOwner[] = await SchoolOwner.find({
      stateId: stateId,
      isDeleted: false,
    });
    return schoolOwnerList;
  }

  public async getSchoolOwnerInfoById(schoolOwnerId: any) {
    const schoolOwnerInfo: any = await SchoolOwner.findOne({
      _id: schoolOwnerId,
      isDeleted: false,
    }).lean();
    return schoolOwnerInfo;
  }



  
  public async getBankdetailInfoById(schoolOwnerId: any) {
    const schoolOwnerInfo: any = await bankDetails.findOne({
      schoolOwner: schoolOwnerId,
      isDeleted: false,
    }).lean();
    return schoolOwnerInfo;
  }

  public async deleteSchoolOwner(schoolOwnerId: String) {
    const schoolOwnerInfo: ISchoolOwner = await SchoolOwner.findOneAndUpdate(
      { _id: schoolOwnerId, isDeleted: false },
      { $set: { isDeleted: true } },
      { new: true }
    ).lean();
    return schoolOwnerInfo;
  }
}
