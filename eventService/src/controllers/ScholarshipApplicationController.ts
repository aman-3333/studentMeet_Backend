import ScholarshipApplication, { IScholarshipApplication } from "../models/scholarshipApplications.model";

export default class ScholarshipApplicationController {
  public async createScholarshipApplication(body: any) {
    let scholarshipApplicationInfo: any;
    scholarshipApplicationInfo = await ScholarshipApplication.create(body);
    return scholarshipApplicationInfo;
  }

  public async editScholarshipApplication(body: IScholarshipApplication) {
    const scholarshipApplicationInfo: IScholarshipApplication = await ScholarshipApplication.findOneAndUpdate(
      { _id: body._id, isDeleted: false },
      body,
      { new: true }
    ).lean();
    return scholarshipApplicationInfo;
  }

  public async getScholarshipApplicationList() {
    const scholarshipApplicationList: IScholarshipApplication[] = await ScholarshipApplication.find({
      isDeleted: false,
    });
    return scholarshipApplicationList;
  }

  public async getScholarshipApplicationInfoById(scholarshipApplicationId: any) {
    const scholarshipApplicationInfo: any = await ScholarshipApplication.findOne({
      _id: scholarshipApplicationId,
      isDeleted: false,
    }).lean();
    return scholarshipApplicationInfo;
  }

  public async deleteScholarshipApplication(scholarshipApplicationId: String) {
    const scholarshipApplicationInfo: IScholarshipApplication = await ScholarshipApplication.findOneAndUpdate(
      { _id: scholarshipApplicationId, isDeleted: false },
      { $set: { isDeleted: true } },
      { new: true }
    ).lean();
    return scholarshipApplicationInfo;
  }
}
