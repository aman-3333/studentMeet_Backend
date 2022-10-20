import Userrole, { IUserrole } from "../models/UserRole";

export default class UserroleController {

    public async createUserrole(body: any) {
        let UserroleInfo: any = await Userrole.create(body);
        return UserroleInfo;
    }

    public async editUserrole(body: IUserrole, UserroleId: string) {
        const UserroleInfo: IUserrole = await Userrole.findOneAndUpdate({ _id: UserroleId, isDeleted: false }, body, { new: true }).lean();
        return UserroleInfo;
    }

    public async getUserrole() {
        const UserroleList: IUserrole[] = await Userrole.find({ isDeleted: false });
        return UserroleList;
    }

    

    public async getUserroleInfoById(UserroleInfoById: any) {
        const UserroleInfo: any = await Userrole.findOne({ _id: UserroleInfoById, isDeleted: false }).lean();
        return UserroleInfo;
    }

    public async deleteUserrole(UserroleId: String) {
        const UserroleInfo: IUserrole = await Userrole.findOneAndUpdate({ _id: UserroleId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return UserroleInfo;
    }
}