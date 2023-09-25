import TournamentMatch, { ITournamentMatch } from "../models/tournamentMatch.model";

export default class TournamentMatchController {

    public async createTournamentMatch(body: any) {
        let TournamentMatchInfo: any;
            TournamentMatchInfo = await TournamentMatch.create(body);
        return TournamentMatchInfo;

    }

    public async editTournamentMatch(body: ITournamentMatch, TournamentMatchId: string) {
        const TournamentMatchInfo: ITournamentMatch = await TournamentMatch.findOneAndUpdate({ _id: TournamentMatchId, isDeleted: false }, body, { new: true }).lean();
        return TournamentMatchInfo;
    }

    public async getTournamentMatchList() {
        const TournamentMatchList: ITournamentMatch[] = await TournamentMatch.find({  isDeleted: false });
        return TournamentMatchList;
    }

    public async getTournamentMatchInfoById(TournamentMatchId: any) {
        const TournamentMatchInfo: any = await TournamentMatch.findOne({ _id: TournamentMatchId, isDeleted: false }).lean();
        return TournamentMatchInfo;
    }

    public async deleteTournamentMatch(TournamentMatchId: String) {
        const TournamentMatchInfo: ITournamentMatch = await TournamentMatch.findOneAndUpdate({ _id: TournamentMatchId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return TournamentMatchInfo;
    }





    
}