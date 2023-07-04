import SponsorshipForm, { ISponsorshipForm } from "../models/sponsorshipBook";
import { ICategory } from "../models/category";
export default class SponsorshipFormController {

    public async createSponsorshipForm(body: any) {

        let SponsorshipFormInfo: any;
       
            SponsorshipFormInfo = await SponsorshipForm.create(body);
        
        return SponsorshipFormInfo;

    }

    public async editSponsorshipForm(body: ISponsorshipForm, SponsorshipFormId: string) {
        const SponsorshipFormInfo: ISponsorshipForm = await SponsorshipForm.findOneAndUpdate({ _id: SponsorshipFormId, isDeleted: false }, body, { new: true }).lean();
        return SponsorshipFormInfo;
    }

    public async getSponsorshipFormList(stateId: any) {
        const SponsorshipFormList: ISponsorshipForm[] = await SponsorshipForm.find({ stateId: stateId, isDeleted: false });
        return SponsorshipFormList;
    }

    public async getSponsorshipFormInfoById(SponsorshipFormId: any) {
        const SponsorshipFormInfo: any = await SponsorshipForm.findOne({ _id: SponsorshipFormId, isDeleted: false }).lean();
        return SponsorshipFormInfo;
    }

    public async deleteSponsorshipForm(SponsorshipFormId: String) {
        const SponsorshipFormInfo: ISponsorshipForm = await SponsorshipForm.findOneAndUpdate({ _id: SponsorshipFormId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return SponsorshipFormInfo;
    }
}