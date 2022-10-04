import Subscription, { ISubscription } from "../models/Subscription";

import Coupon from "../models/Coupons"
import User, { IUser } from "../models/Users";

import { ObjectId } from "mongoose";

export default class SubscriptionController {

    public async createSubscription(body: ISubscription) {
        let SubscriptionInfo: ISubscription = await Subscription.create(body);
        return SubscriptionInfo;

    }

    public async editSubscription(body: ISubscription, SubscriptionId: string) {
        const SubscriptionInfo: ISubscription = await Subscription.findOneAndUpdate({ _id: SubscriptionId, isDeleted: false }, body, { new: true }).lean();
        return SubscriptionInfo;
    }



    public async buySubscription(coupon: any, subscriptionId: any) {
        console.log("id", typeof (coupon));
        let deductionAmount: any;
        let couponInfo: any;
        let subscriptionInfo: any;

        couponInfo = await Coupon.findOne({ code: { $in: coupon } }).lean()
        console.log("couponInfo", couponInfo);

        if (couponInfo) {
            subscriptionInfo = await Subscription.findOne({ _id: subscriptionId, isDeleted: false }).lean();
            console.log("subscriptionInfo", subscriptionInfo);
            if (couponInfo.discountPrice) {
                deductionAmount = subscriptionInfo.amount - couponInfo.discountPrice;
                console.log("deductionAmount", deductionAmount);

            }
            couponInfo = await Coupon.updateMany(
                {},
                {
                    $pull: { code: { $in: coupon } }
                }
            )
        } else {
            subscriptionInfo = await Subscription.findOne({ _id: subscriptionId, isDeleted: false }).lean();
        }
        //const SubscriptionInfo: ISubscription = await Subscription.findOneAndUpdate({ _id: SubscriptionId, isDeleted: false }, body, { new: true }).lean();

        return {
            subscriptionInfo, deductionAmount
        };
    }

    public async getSubscriptionList() {
        const SubscriptionList: ISubscription[] = await Subscription.find({ isDeleted: false });
        return SubscriptionList;
    }

    public async getSubscriptionInfoById(SubscriptionId: string) {
        const SubscriptionInfo: ISubscription = await Subscription.findOne({ _id: SubscriptionId, isDeleted: false }).lean();
        return SubscriptionInfo;
    }

    public async deleteSubscription(SubscriptionId: String) {
        const SubscriptionInfo: ISubscription = await Subscription.findOneAndUpdate({ _id: SubscriptionId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return SubscriptionInfo;
    }

}