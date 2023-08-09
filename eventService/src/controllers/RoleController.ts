import role, { IRole } from "../models/role";

export default class RoleController {

    public async createRole(body: any) {
        let RoleInfo: any;
       
            RoleInfo = await role.create(body);
       
        return RoleInfo;

    }

    public async editRole(body: IRole, RoleId: string) {
        const RoleInfo: IRole = await role.findOneAndUpdate({ _id: RoleId, isDeleted: false }, body, { new: true }).lean();
        return RoleInfo;
    }

    public async getRoleList(stateId: any) {
        const RoleList: IRole[] = await role.find({ stateId: stateId, isDeleted: false });
        return RoleList;
    }

    public async getRoleInfoById(RoleId: any) {
        const RoleInfo: any = await role.findOne({ _id: RoleId, isDeleted: false }).lean();
        return RoleInfo;
    }

    public async deleteRole(RoleId: String) {
        const RoleInfo: IRole = await role.findOneAndUpdate({ _id: RoleId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return RoleInfo;
    }
}