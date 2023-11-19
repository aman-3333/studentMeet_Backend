import academyOwner from "../models/academyOwner";
import BankDetails, { IBankDetails } from "../models/bankDetails";
import schoolsOwnerModel from "../models/schoolsOwner.model";
import userDetails from "../models/userDetails";
import {
  linkedAccount,
  createProduct,
  CapturePayment,
  addBankDetail,
  verifyBankDetail
} from "../services/razorpayServices";
var razorpayConfig = require("../../config/razorpay/betaProperties").RAZORPAY;
export default class BankDetailsController {
  public async createBankDetails(body: any) {
    let userInfo;
    let data;
    let BankDetailsInfo: any;



    BankDetailsInfo = await BankDetails.create(body);
    if (body.user_id) {
      userInfo = await userDetails
        .findOne({ _id: body.user_id, isDeleted: false })
        .lean();

        console.log("userInfo",userInfo);
        
      data = {
        email: "amansharma141998@gmail.com",
        phone: userInfo.contact,
        type: "route",
        reference_id: "9888120067779",
        legal_business_name: "userInfo.fullName",
        business_type: "",
        contact_name: userInfo.fullName,
        profile: {
          category: "healthcare",
          subcategory: "clinic",
          addresses: {
            registered: {
              street1: "507, Koramangala 1st block",
              street2: "MG Road",
              city: "Bengaluru",
              state: "KARNATAKA",
              postal_code: "131001",
              country: "IN",
            },
          },
        },
      };
    }
    if (body.academyOwner) {
      userInfo = await academyOwner
        .findOne({ _id: body.academyOwner, isDeleted: false })
        .lean();
    }

    if (body.schoolOwner) {
      userInfo = await schoolsOwnerModel
        .findOne({ _id: body.schoolOwner, isDeleted: false })
        .lean();
    }

    let account:any = await linkedAccount(data);
    let product:any = await createProduct(account.id);
     let updateProduct:any = await addBankDetail(account.id,product.id,body);

      await verifyBankDetail()
    return updateProduct;
  }

  public async editBankDetails(body: IBankDetails, BankDetailsId: string) {
    const BankDetailsInfo: IBankDetails = await BankDetails.findOneAndUpdate(
      { _id: BankDetailsId, isDeleted: false },
      body,
      { new: true }
    ).lean();
    return BankDetailsInfo;
  }

  public async getBankDetailsList(stateId: any) {
    const BankDetailsList: IBankDetails[] = await BankDetails.find({
      stateId: stateId,
      isDeleted: false,
    });
    return BankDetailsList;
  }

  public async getBankDetailsInfoById(BankDetailsId: any) {
    const BankDetailsInfo: any = await BankDetails.findOne({
      _id: BankDetailsId,
      isDeleted: false,
    }).lean();
    return BankDetailsInfo;
  }

  public async deleteBankDetails(BankDetailsId: String) {
    const BankDetailsInfo: IBankDetails = await BankDetails.findOneAndUpdate(
      { _id: BankDetailsId, isDeleted: false },
      { $set: { isDeleted: true } },
      { new: true }
    ).lean();
    return BankDetailsInfo;
  }
}
