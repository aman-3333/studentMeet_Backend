import State, { IState } from "../models/State";
import Country, { ICountry } from "../models/country";
import City, { ICity } from "../models/city";
export default class StateController {
    public async createCountry(body: any) {
        let CountryInfo: any;
        if (body.length > 0) {
            CountryInfo = await Country.create(body);
        }
        return CountryInfo;

    }

    public async editCountry(body: ICountry, CountryId: string) {
        const CountryInfo: ICountry = await Country.findOneAndUpdate({ _id: CountryId, isDeleted: false }, body, { new: true }).lean();
        return CountryInfo;
    }

    public async getCountryList() {
        const CountryList: ICountry[] = await Country.find({ isDeleted: false });
        return CountryList;
    }

    public async getCountryInfoById(CountryId: any) {
        const CountryInfo: ICountry = await Country.findOne({ _id: CountryId, isDeleted: false }).lean();
        return CountryInfo;
    }

    public async deleteCountry(CountryId: String) {
        const CountryInfo: ICountry = await Country.findOneAndUpdate({ _id: CountryId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return CountryInfo;
    }

    public async createState(body: any) {
        let StateInfo: any;
        if (body.length > 0) {
            StateInfo = await State.create(body);
        }
        return StateInfo;

    }

    public async editState(body: IState, StateId: string) {
        const StateInfo: IState = await State.findOneAndUpdate({ _id: StateId, isDeleted: false }, body, { new: true }).lean();
        return StateInfo;
    }

    public async getStateList(countryId:any) {
        const StateList: IState[] = await State.find({ countryId:countryId,isDeleted: false });
        return StateList;
    }

    public async getStateInfoById(StateId: any) {
        const StateInfo: IState = await State.findOne({ _id: StateId, isDeleted: false }).lean();
        return StateInfo;
    }

    public async deleteState(StateId: String) {
        const StateInfo: IState = await State.findOneAndUpdate({ _id: StateId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return StateInfo;
    }



    public async createCity(body: any) {
        let CityInfo: any;
        if (body.length > 0) {
            CityInfo = await City.create(body);
        }
        return CityInfo;

    }

    public async editCity(body: ICity, CityId: string) {
        const CityInfo: ICity = await City.findOneAndUpdate({ _id: CityId, isDeleted: false }, body, { new: true }).lean();
        return CityInfo;
    }

    public async getCityList(stateId:any) {
        const CityList: ICity[] = await City.find({stateId:stateId, isDeleted: false });
        return CityList;
    }

    public async getCityInfoById(CityId: any) {
        const CityInfo: ICity = await City.findOne({ _id: CityId, isDeleted: false }).lean();
        return CityInfo;
    }

    public async deleteCity(CityId: String) {
        const CityInfo: ICity = await City.findOneAndUpdate({ _id: CityId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return CityInfo;
    }
}