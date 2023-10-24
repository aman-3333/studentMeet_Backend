import Scholarship, { IScholarship } from "../models/scholarship.model";

export default class ScholarshipController {
  public async createScholarship(body: any) {
    let scholarshipInfo: any;
    scholarshipInfo = await Scholarship.create(body);
    return scholarshipInfo;
  }

  public async editScholarship(body: IScholarship) {
    const scholarshipInfo: IScholarship = await Scholarship.findOneAndUpdate(
      { _id: body._id, isDeleted: false },
      body,
      { new: true }
    ).lean();
    return scholarshipInfo;
  }

  
  public async getScholarshipList(schoolId:any) {
    const scholarshipList: IScholarship[] = await Scholarship.find({
      schoolId:schoolId,
      isDeleted: false,
    });
    console.log(scholarshipList,"scholarshipList")
    return scholarshipList;
  }

  public async getScholarshipInfoById(scholarshipId: any) {
    const scholarshipInfo: any = await Scholarship.findOne({
      _id: scholarshipId,
      isDeleted: false,
    }).lean();
    return scholarshipInfo;
  }

  public async deleteScholarship(scholarshipId: String) {
    const scholarshipInfo: IScholarship = await Scholarship.findOneAndUpdate(
      { _id: scholarshipId, isDeleted: false },
      { $set: { isDeleted: true } },
      { new: true }
    ).lean();
    return scholarshipInfo;
  }
}
