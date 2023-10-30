import academyOwner from "../models/academyOwner";
import BankDetails, { IBankDetails } from "../models/bankDetails";
import schoolsOwnerModel from "../models/schoolsOwner.model";
import userDetails from "../models/userDetails";
import { CapturePayment, createVendorAccount } from "../services/razorpayServices"
var razorpayConfig = require("../../config/razorpay/betaProperties").RAZORPAY
export default class BankDetailsController {

    public async createBankDetails(body: any) {
let userInfo;
let data;
        let BankDetailsInfo: any;
       
            BankDetailsInfo = await BankDetails.create(body);
            // user_id: { type: Schema.Types.ObjectId, ref: "userdetails" },
            // academyOwner: { type: Schema.Types.ObjectId, ref: "academy_owners" },
            // sponsorshipPartner: { type: Schema.Types.ObjectId, ref: "sponsor_partners" },
            // schoolOwner: { type: Schema.Types.ObjectId, ref: "school_owners" },
            if(body.user_id){
                userInfo = await userDetails.findOne({_id:body.user_id,isDeleted:false}).lean();
                
                 data = {   
                    type:"route",
                    contact_name:"Gaurav Kumar",
                    email:"gaurav.kumar@example.com",
                    phone:"9000090000",
                    
                };
            }
            if(body.academyOwner){
                userInfo = await academyOwner.findOne({_id:body.academyOwner,isDeleted:false}).lean()
            }
       
            if(body.schoolOwner){
                userInfo = await schoolsOwnerModel.findOne({_id:body.schoolOwner,isDeleted:false}).lean()
            }
           
      let a=  await createVendorAccount(data,razorpayConfig.key_id,razorpayConfig.key_secret)
      console.log(a,"a")
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