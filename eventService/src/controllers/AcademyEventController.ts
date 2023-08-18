import AcademyEvent, { IAcademyEvent } from "../models/academyEvent";
import userDetails from "../models/userDetails";

export default class AcademyEventController {

    public async createAcademyEvent(body: any) {

        let AcademyEventInfo: any;
       
            AcademyEventInfo = await AcademyEvent.create(body);
        
        return AcademyEventInfo;

    }

    public async editAcademyEvent(body: IAcademyEvent, AcademyEventId: string) {
        const AcademyEventInfo: IAcademyEvent = await AcademyEvent.findOneAndUpdate({ _id: AcademyEventId, isDeleted: false }, body, { new: true }).lean();
        return AcademyEventInfo;
    }

    public async getAcademyEventList(academyId:any) {
        const AcademyEventList: any = await AcademyEvent.find({academy_id: academyId, isDeleted: false });
        return AcademyEventList;
    }

    public async getAcademyEventInfoById(AcademyEventId: any,status:any,academyId:any) {
        var AcademyEventInfo:any
        let coachDetails:any;
        AcademyEventInfo= await AcademyEvent.findOne({_id: AcademyEventId, isDeleted: false })
        if(status=="coachInfo"){
     
        
           coachDetails= await userDetails.aggregate([{
            $match:{
                isDeleted:false,_id:{$in:AcademyEventInfo.secoudryCoachId}}
            
          },{
            $lookup: {
                'localField': '_id',
                'from': 'achivements',
                'foreignField': 'user_id',
                'as': 'achivements',
              },
          }])
          
          
        }
        if(status=="academyAchivment"){
     
        
            coachDetails= await AcademyEvent.aggregate([{
             $match:{
                 isDeleted:false,
                 academyEventId:AcademyEventId
                }       
           },{
             $lookup: {
                 'localField': '_id',
                 'from': 'achivements',
                 'foreignField': 'academyEventId',
                 'as': 'achivements',
               },
           }])

         
           
           
           
         }

       

        return coachDetails;
    }

    public async getAcademyRegistrationDetail(academyEventId: any) {
       console.log(academyEventId,"academyEventId");
       
       let   AcademyEventInfo= await AcademyEvent.findOne({_id: academyEventId, isDeleted: false }).populate("academy_id")
    //  let   AcademyEventInfo= await AcademyEvent.aggregate([{
    //         $match:{_id: academyEventId, isDeleted: false }
            
    //       },{
    //         $lookup: {
    //             'localField': 'academy_id',
    //             'from': 'academies',
    //             'foreignField': '_id',
    //             'as': 'academies',
    //           },
    //       }])
          
          
        
     

       

        return AcademyEventInfo;
    }

    public async deleteAcademyEvent(AcademyEventId: String) {
        const AcademyEventInfo: IAcademyEvent = await AcademyEvent.findOneAndUpdate({ _id: AcademyEventId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return AcademyEventInfo;
    }
}