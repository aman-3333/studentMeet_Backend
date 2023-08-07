import SponsorshipForm, { ISponsorshipApply } from "../models/sponsorshipApply";

export default class SponsorshipFormController {

    public async createSponsorshipForm(body: any) {

        let SponsorshipFormInfo: any;
       
            SponsorshipFormInfo = await SponsorshipForm.create(body);
        
        return SponsorshipFormInfo;

    }

    public async editSponsorshipForm(body: ISponsorshipApply, SponsorshipFormId: string) {
        const SponsorshipFormInfo: ISponsorshipApply = await SponsorshipForm.findOneAndUpdate({ _id: SponsorshipFormId, isDeleted: false }, body, { new: true }).lean();
        return SponsorshipFormInfo;
    }

    public async getSponsorshipFormList(stateId: any) {
        const SponsorshipFormList: ISponsorshipApply[] = await SponsorshipForm.find({ stateId: stateId, isDeleted: false });
        return SponsorshipFormList;
    }

    public async getSponsorshipFormInfoById(SponsorshipFormId: any) {
        const SponsorshipFormInfo: any = await SponsorshipForm.findOne({ _id: SponsorshipFormId, isDeleted: false }).lean();
        return SponsorshipFormInfo;
    }

    public async deleteSponsorshipForm(SponsorshipFormId: String) {
        const SponsorshipFormInfo: ISponsorshipApply = await SponsorshipForm.findOneAndUpdate({ _id: SponsorshipFormId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return SponsorshipFormInfo;
    }
}