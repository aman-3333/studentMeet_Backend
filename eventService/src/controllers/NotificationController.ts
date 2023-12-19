import Notification, { INotification } from "../models/notification.model";

export default class NotificationController {

    public async createNotification(body: any) {
        let notificationInfo: any;
            notificationInfo = await Notification.create(body);
        return notificationInfo;
    }   

    public async editNotification(body: any) {
        const {user_id,title,createdAt ,_id} =body;
        const notificationInfo : any =   await Notification.findOneAndUpdate({ _id: _id,   isDeleted : false, }, body, { new : true }).lean();
        return notificationInfo;
    }

    public async getNotificationList(userId:any,index:any) {
        const indexData = parseInt(index) -1;

        const notificationList : any = await Notification.aggregate([
            {
                $sort: {
                  createdAt: -1
                }
              },
            { $skip:  50 * indexData },
            { $limit: 50},
      
            {
            $match:{
                userId : userId,  isDeleted : false
            }
        },
     
      
          {
            $lookup: {
              localField: "activityUser",
              from: "userdetails",
              foreignField: "_id",
              as: "user",
            },
          },
          { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
    ])
        return notificationList;
    }

    public async getNotificationInfoById(notificationId: any) {
        const notificationInfo : any = await Notification.findOne({ _id: notificationId, isDeleted: false }).lean();
        return notificationInfo;
    }

    public async deleteNotification(notificationId: String) {
        const notificationInfo : any = await Notification.findOneAndUpdate({ _id: notificationId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return notificationInfo;
    }
}