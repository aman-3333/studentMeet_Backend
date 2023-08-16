import Achivement, { IAchivement } from "../models/achivement";

export default class AchivementController {

    public async createAchivement(body: any) {

        let AchivementInfo: any;
        AchivementInfo = await Achivement.findOne({userId:body.userId,isDeleted:false});
    
        
        if (AchivementInfo) {
           for (let i = 0; i < body.achievements.length; i++) {

            AchivementInfo = await Achivement.findOneAndUpdate({userId:body.userId},{
                $push:{
                   achievements: {
               
              picture: body.achievements[i].picture,
                description: body.achievements[i].description,
                 state:body.achievements[i].state,
                 city:body.achievements[i].city,
                 country:body.achievements[i].country,
              tournament:body.achievements[i].tournament
            }  
                }
            });

         
            

            
           }


        }
 else{

    AchivementInfo = await Achivement.create(body);
 }
       
        
        return AchivementInfo;

    }

    
    public async deletePerticulerAchivement(body: any) {

        let AchivementInfo: any;
        AchivementInfo = await Achivement.findOne({userId:body.userId,isDeleted:false});
    
        
        if (AchivementInfo) {
           for (let i = 0; i < body.achievements.length; i++) {

            AchivementInfo = await Achivement.findOneAndUpdate({userId:body.userId},{
                $pull:{
                   achievements: {
               _id:body.achievements[i]._id
             
            }  
                }
            });

         
            console.log(AchivementInfo,"AchivementInfo");
            

            
           }


        }
   
        
        return AchivementInfo;

    }

    public async editAchivement(body: IAchivement, AchivementId: string) {
        const AchivementInfo: IAchivement = await Achivement.findOneAndUpdate({ _id: AchivementId, isDeleted: false }, body, { new: true }).lean();
        return AchivementInfo;
    }

    public async getAchivementList(stateId: any) {
        const AchivementList: IAchivement[] = await Achivement.find({ stateId: stateId, isDeleted: false });
        return AchivementList;
    }

    public async getAchivementInfoById(AchivementId: any) {
        const AchivementInfo: any = await Achivement.findOne({ _id: AchivementId, isDeleted: false }).lean();
        return AchivementInfo;
    }

    public async deleteAchivement(AchivementId: String) {
        const AchivementInfo: IAchivement = await Achivement.findOneAndUpdate({ _id: AchivementId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return AchivementInfo;
    }


}