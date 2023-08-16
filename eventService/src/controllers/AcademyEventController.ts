import AcademyEvent, { IAcademyEvent } from "../models/academyEvent";

export default class AcademyEventController {

    public async createAcademyEvent(body: any) {

        let AcademyEventInfo: any;
       
            AcademyEventInfo = await AcademyEvent.create(body);
        
        return AcademyEventInfo;

    }

    public async editAcademyEvent(body: IAcademyEvent, AcademyEventId: string) {
        const AcademyEventInfo: IAcademyEvent = await AcademyEvent.findOneAndUpdate({ _id: AcademyEventId, isDeleted: false }, body, { new: true }).lean();
        return AcademyEventInfo;
    }

    public async getAcademyEventList(academyId:any) {
        const AcademyEventList: any = await AcademyEvent.find({academy_id: academyId, isDeleted: false });
        return AcademyEventList;
    }

    public async getAcademyEventInfoById(AcademyEventId: any) {
        const AcademyEventInfo: any = await AcademyEvent.findOne({ _id: AcademyEventId, isDeleted: false }).lean();
        return AcademyEventInfo;
    }

    public async deleteAcademyEvent(AcademyEventId: String) {
        const AcademyEventInfo: IAcademyEvent = await AcademyEvent.findOneAndUpdate({ _id: AcademyEventId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return AcademyEventInfo;
    }
}