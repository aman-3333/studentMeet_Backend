import CartProduct from "../models/cartProduct";
import VendorShop, { IVendorShop } from "../models/VendorShop";

export default class VendorShopController {

    public async createVendorShop(body: any) {

        let VendorShopInfo: any;
       
            VendorShopInfo = await VendorShop.create(body);
        
        return VendorShopInfo;

    }

    public async editVendorShop(body: IVendorShop, VendorShopId: string) {
        const VendorShopInfo: IVendorShop = await VendorShop.findOneAndUpdate({ _id: VendorShopId, isDeleted: false }, body, { new: true }).lean();
        return VendorShopInfo;
    }

    public async getVendorShopList(stateId: any) {
        const VendorShopList: IVendorShop[] = await VendorShop.find({ stateId: stateId, isDeleted: false });
        return VendorShopList;
    }

    public async getVendorShopInfoById(VendorShopId: any) {
        const VendorShopInfo: any = await VendorShop.findOne({ _id: VendorShopId, isDeleted: false }).lean();
        return VendorShopInfo;
    }

    public async deleteVendorShop(VendorShopId: String) {
        const VendorShopInfo: IVendorShop = await VendorShop.findOneAndUpdate({ _id: VendorShopId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return VendorShopInfo;
    }





    
}