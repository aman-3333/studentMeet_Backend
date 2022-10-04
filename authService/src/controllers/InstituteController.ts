

import Instutute, {IInstitute} from "../models/institute.model";

import { ObjectId } from "mongoose";




export default class InstututeController {

  

//////////////////////////////Instutute///////////////////////////////////////////////////////////


    public async createInstutute(body: IInstitute) {
        let InstututeInfo: IInstitute;
        InstututeInfo = await Instutute.create(body);

        return InstututeInfo;
    }


    public async editInstutute(body: IInstitute, InstututeId: string) {
       
        const InstututeInfo: IInstitute = await Instutute.findOneAndUpdate({ _id: InstututeId, isDeleted: false }, body, { new: true }).lean();
        return InstututeInfo;

    }


    public async getInstutute(businessTypeId: any) {
        const InstututeList: IInstitute[] = await Instutute.find({ businessType: businessTypeId, isDeleted: false });
        return InstututeList;
    }
    public async getInstututeCustomer() {
        const InstututeList: IInstitute[] = await Instutute.find({ isDeleted: false });
        return InstututeList;
    }


    public async getInstututeInfoById(InstututeId: string) {
        const InstututeInfo: IInstitute = await Instutute.findOne({ _id: InstututeId, isDeleted: false }).lean();
        return InstututeInfo;
    }

    public async deleteInstutute(InstututeId: string) {
       
        const InstututeInfo: IInstitute = await Instutute.findOneAndUpdate({ _id: InstututeId, isDeleted: false }, { $set: { isDeleted: true } }).lean()
        return InstututeInfo;


    }
    //////////////////////SubInstutute////////////////////////////////////////////////////////////
    
}