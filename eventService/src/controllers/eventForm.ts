import City, { ICity } from "../models/City";
import { ICategory } from "../models/Category";
export default class CityController {

    public async createCity(body: any) {

        let CityInfo: any;
       
            CityInfo = await City.create(body);
        
        return CityInfo;

    }

    public async editCity(body: ICity, CityId: string) {
        const CityInfo: ICity = await City.findOneAndUpdate({ _id: CityId, isDeleted: false }, body, { new: true }).lean();
        return CityInfo;
    }

    public async getCityList(stateId: any) {
        const CityList: ICity[] = await City.find({ stateId: stateId, isDeleted: false });
        return CityList;
    }

    public async getCityInfoById(CityId: any) {
        const CityInfo: any = await City.findOne({ _id: CityId, isDeleted: false }).lean();
        return CityInfo;
    }

    public async deleteCity(CityId: String) {
        const CityInfo: ICity = await City.findOneAndUpdate({ _id: CityId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return CityInfo;
    }
}