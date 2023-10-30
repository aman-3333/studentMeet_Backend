import Tournament, { ITournament } from "../models/tournament.model";

export default class TournamentController {

    public async createTournament(body: any) {
        let tournamentInfo: any;
       
            tournamentInfo = await Tournament.create(body);
       
        return tournamentInfo;

    }

    public async editTournament(body: ITournament, TournamentId: string) {
        const tournamentInfo: ITournament = await Tournament.findOneAndUpdate({ _id: TournamentId, isDeleted: false }, body, { new: true }).lean();
        return tournamentInfo;
    }

    public async getTournamentList() {
        const TournamentList: ITournament[] = await Tournament.find({  isDeleted: false });
        return TournamentList;
    }

    public async getSchoolTournamentList(schoolId:any) {
        const TournamentList: ITournament[] = await Tournament.find({ schoolId:schoolId, isDeleted: false });
        return TournamentList;
    }
    public async getAcademyTournamentList(academyId:any) {
        const TournamentList: ITournament[] = await Tournament.find({ academyId:academyId, isDeleted: false });
        return TournamentList;
    }
    
    public async getTournamentInfoById(TournamentId: any) {
        const tournamentInfo: any = await Tournament.findOne({ _id: TournamentId, isDeleted: false }).lean();
        return tournamentInfo;
    }

    public async deleteTournament(TournamentId: String) {
        const tournamentInfo: ITournament = await Tournament.findOneAndUpdate({ _id: TournamentId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return tournamentInfo;
    }
}