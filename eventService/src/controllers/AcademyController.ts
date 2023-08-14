
import academy, { IAcademy } from "../models/academy";
import userActivity from "../models/userActivity";

export default class academyController {

    public async createAcademy(body: any) {

       
     let academyInfo:any= await academy.create(body);
        
        return academyInfo;

    }

    public async editAcademy(body: IAcademy, academyId: string) {
        const academyInfo: IAcademy = await academy.findOneAndUpdate({ _id: academyId, isDeleted: false }, body, { new: true }).lean();
        return academyInfo;
    }

    public async getAcademyList(userId:any) {
        const academyList: IAcademy[] = await academy.find({  isDeleted: false });
        return academyList;
    }

    public async getAcademyInfoById(academyId: any) {
        const academyInfo: any = await academy.findOne({ _id: academyId, isDeleted: false }).lean();
        return academyInfo;
    }

    public async deleteAcademy(academyId: String) {
        const academyInfo: IAcademy = await academy.findOneAndUpdate({ _id: academyId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return academyInfo;
    }

    public async getAcademyfilter() {
        const academyInfo: any = await academy.findOne({ isDeleted: false }).lean();
        return academyInfo;
    }


    public async searchAcademy(search:any){
 
        let academyInfo:any=await academy.aggregate(
        [
            {
              $search: {
                index: "search-text",
                text: {
                  query: search,
                  path: {
                    wildcard: "*"
                  }
                }
              }
            }
          ])
      return  academyInfo 
    
    }
    public async academyActivity(userId: any, academyId:any, status: any, academyComment: any, academyCommentId: any, body: any) {
      let userInfo: any;
      let data: any = [];
      let a: any = [];
      let info: any;
     let academyInfo :any;
    
      if (status == "academyLike") {  
    

                  
  
              await academy.findOneAndUpdate({ _id: body.academyId },
                  { $inc: { academyLikeCount: 1 } }, { new: true }).lean()
                  academyInfo =   await academy.findOneAndUpdate({
                  _id: body.academyId
              }, {
                  $push: {
                      academyLike:
                          userId
  
                  }
              },{ new: true })

              console.log(academyInfo);
              
              await userActivity.findOneAndUpdate({ userId: academyInfo.userId },
                  { $inc: { academyLikeCount: 1 } }, { new: true })
              return academyInfo;
          
      }
      if (status == "removeacademyLike") {
   
          await academy.findOneAndUpdate({ _id: body.academyId },
              { $inc: { academyLikeCount: -1 } }, { new: true })
              
              academyInfo =   await academy.findOneAndUpdate({
              _id: body.academyId
          }, {
              $pull: {
                  academyLike:
                      userId
              }
          },{ new: true })

          await userActivity.findOneAndUpdate({ userId: academyInfo.userId },
              { $inc: { academyLikeCount: -1 } }, { new: true })
          return academyInfo;
      }
 
      if (status == "academyComment") {
     
          
          let currentTime: any = new Date();
          for (let i = 0; i < body.academyComment.length; i++) {
             
           
                  academyInfo =    await academy.findOneAndUpdate(
                  {
                      _id: body.academyId,
                  },
                  {
                      $push: {
                          academyComment: {
                              userId: body.academyComment[i].userId,
                              comment: body.academyComment[i].comment,
                              dateTime: currentTime
                          }
                      }
                  })
                  
                  academyInfo=   await academy.findOneAndUpdate({ _id: body.academyId },
                  { $inc: { academyCommentCount: 1 } }, { new: true })
  
  
                  await userActivity.findOneAndUpdate({ userId: academyInfo.userId },
                      { $inc: { academyCommentCount: 1 } }, { new: true })
              return  academyInfo ;
          }
      }
      if (status == "removeacademyComment") {
          for (let i = 0; i < body.academyComment.length; i++) {
           
                  academyInfo =    await academy.findOneAndUpdate(
                  {
                      _id: body.academyComment[i].academyId,
                  },
                  {
                      $pull: {
                          academyComment: {
                              _id: body.academyComment[i]._id,
  
                          }
                      },
                  })
  
         
                  academyInfo =     await academy.findOneAndUpdate({ _id: body.academyComment[i].academyId },
                  { $inc: { academyCommentCount: -1 } }, { new: true })
  
                  await userActivity.findOneAndUpdate({ userId: academyInfo.userId },
                      { $inc: { academyCommentCount: -1 } }, { new: true })
              return  academyInfo ;
          }
  
      } if (status == "readacademyComment") {
          userInfo = await userActivity.findOne({ userId: body.userId }).lean();
          userInfo = userInfo.academyComment;
  
  
          for (let i = 0; i < userInfo.length; i++) {
              let academyInfo: any = await academy.findOne({ _id: userInfo[i].academyId })
  
              let comment: any = userInfo[i].comment
              let DateTime: any = userInfo[i].dateTime
  
              data.push({ academyInfo, comment, DateTime })
          }
          return data;
      }
  }


public async filterAcademy(sports:any){

}
}