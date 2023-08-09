import BankDetails, { IBankDetails } from "../models/bankDetails";

export default class BankDetailsController {

    public async createBankDetails(body: any) {

        let BankDetailsInfo: any;
       
            BankDetailsInfo = await BankDetails.create(body);
        
        return BankDetailsInfo;

    }

    public async editBankDetails(body: IBankDetails, BankDetailsId: string) {
        const BankDetailsInfo: IBankDetails = await BankDetails.findOneAndUpdate({ _id: BankDetailsId, isDeleted: false }, body, { new: true }).lean();
        return BankDetailsInfo;
    }

    public async getBankDetailsList(stateId: any) {
        const BankDetailsList: IBankDetails[] = await BankDetails.find({ stateId: stateId, isDeleted: false });
        return BankDetailsList;
    }

    public async getBankDetailsInfoById(BankDetailsId: any) {
        const BankDetailsInfo: any = await BankDetails.findOne({ _id: BankDetailsId, isDeleted: false }).lean();
        return BankDetailsInfo;
    }

    public async deleteBankDetails(BankDetailsId: String) {
        const BankDetailsInfo: IBankDetails = await BankDetails.findOneAndUpdate({ _id: BankDetailsId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return BankDetailsInfo;
    }
}