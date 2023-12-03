import academyOwner from "../models/academyOwner";
import BankDetails, { IBankDetails } from "../models/bankDetails";
import schoolsOwnerModel from "../models/schoolsOwner.model";
import userDetails from "../models/userDetails";
import {
  linkedAccount,
  createProduct,
  capturePayment,
  addBankDetail,
  verifyBankDetail,
  accountStatusUpdate
} from "../services/razorpayServices";
var razorpayConfig = require("../../config/razorpay/betaProperties").RAZORPAY;
export default class BankDetailsController {
  public async createBankDetails(body: any) {
    let userInfo;
    let data:any;
    let BankDetailsInfo: any;
let random_no:any=Math.floor(1000000000 + Math.random() * 9000000000);
random_no=random_no.toString()

    BankDetailsInfo = await BankDetails.create(body);
    if (body.user_id) {
      userInfo = await userDetails
        .findOne({ _id: body.user_id, isDeleted: false })
        .lean();

        data =   {
          "email":userInfo.email,
          "phone":userInfo.contact,
          "type":"route",
          "reference_id":random_no,
          "legal_business_name":"Acme Corp",
          "business_type":"partnership",
          "contact_name":userInfo.fullName,
          "profile":{
             "category":"healthcare",
             "subcategory":"clinic",
             "addresses":{
                "registered":{
                   "street1":"507, Koramangala 1st block",
                   "street2":"MG Road",
                   "city":"Bengaluru",
                   "state":"KARNATAKA",
                   "postal_code":"560034",
                   "country":"IN"
                }
             }
          }
       } 
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
    let updateProduct:any = await addBankDetail(account.id,product.id,body,data.contact_name);

    await accountStatusUpdate(account.id)
await BankDetails.updateOne({_id:BankDetailsInfo._id},{
  $set:{
    razorpay_product_id:updateProduct.id,razorpay_account_id:updateProduct.account_id,activation_status:updateProduct.activation_status,requested_at:updateProduct.requested_at,product_name:updateProduct.product_name
  }
})

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


  public async createOder(BankDetailsId: String) {
    const BankDetailsInfo: IBankDetails = await BankDetails.findOneAndUpdate(
      { _id: BankDetailsId, isDeleted: false },
      { $set: { isDeleted: true } },
      { new: true }
    ).lean();
    return BankDetailsInfo;
  }


}
