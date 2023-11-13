import AcademyOwner, { IAcademyOwner } from "../models/academyOwner";

export default class AcademyOwnerController {
  public async createAcademyOwner(body: any) {
    let AcademyOwnerInfo: any;
    AcademyOwnerInfo = await AcademyOwner.create(body);
    return AcademyOwnerInfo;
  }

  public async editAcademyOwner(body: IAcademyOwner) {
    const AcademyOwnerInfo: IAcademyOwner = await AcademyOwner.findOneAndUpdate(
      { _id: body._id, isDeleted: false },
      body,
      { new: true }
    ).lean();
    return AcademyOwnerInfo;
  }

  public async getAcademyOwnerList(stateId: any) {
    const AcademyOwnerList: IAcademyOwner[] = await AcademyOwner.find({
      stateId: stateId,
      isDeleted: false,
    });
    return AcademyOwnerList;
  }


  public async getAcademyOwnerInfoById(AcademyOwnerId: any) {
    const AcademyOwnerInfo: any = await AcademyOwner.findOne({
      _id: AcademyOwnerId,
      isDeleted: false,
    }).lean();
    return AcademyOwnerInfo;
  }

  
  public async deleteAcademyOwner(AcademyOwnerId: String) {
    const AcademyOwnerInfo: IAcademyOwner = await AcademyOwner.findOneAndUpdate(
      { _id: AcademyOwnerId, isDeleted: false },
      { $set: { isDeleted: true } },
      { new: true }
    ).lean();
    return AcademyOwnerInfo;
  }
}
