import State, { IState } from "../models/State";
import { ICategory } from "../models/Category";
export default class StateController {

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

    public async getStateList() {
        const StateList: IState[] = await State.find({ isDeleted: false });
        return StateList;
    }

    public async getStateInfoById(StateId: string) {
        const StateInfo: IState = await State.findOne({ _id: StateId, isDeleted: false }).lean();
        return StateInfo;
    }

    public async deleteState(StateId: String) {
        const StateInfo: IState = await State.findOneAndUpdate({ _id: StateId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return StateInfo;
    }
}