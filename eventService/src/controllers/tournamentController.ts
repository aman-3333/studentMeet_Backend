import Tournament, { ITournament } from "../models/tournament.model";
const mongoose = require("mongoose");
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
        const tournamentList: any = await Tournament.aggregate([
            {
      $match:{
        isDeleted: false
      }
            },
            {
                $lookup: {
                  localField: "academySubTypeId",
                  from: "academysubtypes",
                  foreignField: "_id",
                  as: "academySubType",
                },
              },
              { $unwind: { path: "$academySubType", preserveNullAndEmptyArrays: true } },
        ])
        return tournamentList;
    }

    public async getSchoolTournamentList(schoolId:any) {

        const tournamentList: any = await Tournament.aggregate([
            {
      $match:{
        schoolId:new mongoose.Types.ObjectId(schoolId), isDeleted: false
      }
            },
            {
                $lookup: {
                  localField: "academySubTypeId",
                  from: "academysubtypes",
                  foreignField: "_id",
                  as: "academySubType",
                },
              },
              { $unwind: { path: "$academySubType", preserveNullAndEmptyArrays: true } },
        ])


        return tournamentList;
    }
    public async getAcademyTournamentList(academyId:any) {
      
        
        const tournamentList: any = await Tournament.aggregate([
            {
      $match:{
        academyId:new mongoose.Types.ObjectId(academyId), isDeleted: false
      }
            },
            {
                $lookup: {
                  localField: "academySubTypeId",
                  from: "academysubtypes",
                  foreignField: "_id",
                  as: "academySubType",
                },
              },
              { $unwind: { path: "$academySubType", preserveNullAndEmptyArrays: true } },
        ])

        
        return tournamentList;
    }
    
    public async getTournamentInfoById(TournamentId: any) {
        let tournamentInfo: any = await Tournament.aggregate([
            {
      $match:{
        _id:new mongoose.Types.ObjectId(TournamentId), isDeleted: false
      }
            },
            {
                $lookup: {
                  localField: "academySubTypeId",
                  from: "academysubtypes",
                  foreignField: "_id",
                  as: "academySubType",
                },
              },
              { $unwind: { path: "$academySubType", preserveNullAndEmptyArrays: true } },
        ])


        tournamentInfo=tournamentInfo[0]




        return tournamentInfo;
    }

    public async deleteTournament(TournamentId: String) {
        const tournamentInfo: ITournament = await Tournament.findOneAndUpdate({ _id: TournamentId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return tournamentInfo;
    }
}