// import userRole, { IUserrole } from "../models/userRole";

// export default class UserroleController {

//     public async createUserrole(body: any) {
//         let UserroleInfo: any = await userRole.create(body);
//         return UserroleInfo;
//     }

//     public async editUserrole(body: IUserrole, UserroleId: string) {
//         const UserroleInfo: IUserrole = await userRole.findOneAndUpdate({ _id: UserroleId, isDeleted: false }, body, { new: true }).lean();
//         return UserroleInfo;
//     }

//     public async getUserrole() {
//         const UserroleList: IUserrole[] = await userRole.find({ isDeleted: false });
//         return UserroleList;
//     }

    

//     public async getUserroleInfoById(UserroleInfoById: any) {
//         const UserroleInfo: any = await userRole.findOne({ _id: UserroleInfoById, isDeleted: false }).lean();
//         return UserroleInfo;
//     }

//     public async deleteUserrole(UserroleId: String) {
//         const UserroleInfo: IUserrole = await userRole.findOneAndUpdate({ _id: UserroleId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
//         return UserroleInfo;
//     }
// }