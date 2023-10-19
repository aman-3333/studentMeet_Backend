import Notification, { INotification } from "../models/notification.model";

export default class NotificationController {

    public async createNotification(body: any) {
        let notificationInfo: any;
            notificationInfo = await Notification.create(body);
        return notificationInfo;
    }   

    public async editNotification(body: any) {
        const notificationInfo : any = await Notification.findOneAndUpdate({ _id: body.notificationId, isDeleted: false }, body, { new: true }).lean();
        return notificationInfo;
    }

    public async getNotificationList() {
        const notificationList : any = await Notification.find({  isDeleted: false });
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