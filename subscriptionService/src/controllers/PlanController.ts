import Plan, { IPlan } from "../models/Plan";
import { ICategory } from "../models/Category";
import User, { IUser } from "../models/User";
import { Item } from "../models/Item";
import { IProduct } from "../models/Product";
import { ObjectId } from "mongoose";
import Coupon from "../models/Coupons"
import VendorShop from "../models/VendorShop";
import moment, { now } from "moment";
const schedule = require('node-schedule');
export default class SubscriptionController {

    public async createPlan(body: any) {
        let data: any = [];
        let PlanInfo: any


        let arr: any = [];

        let count: any;


        PlanInfo = await Plan.create(body);



        let service: any = PlanInfo.services;
        let products: any = PlanInfo.products;
        let voucher: any = PlanInfo.voucher;
        let consultancy: any = PlanInfo.consultancy;
        let blog: any = PlanInfo.blog;
        let digitalMarketing: any = PlanInfo.digitalMarketing;
        let promotion: any = PlanInfo.promotion
        let advertisementFormat: any = PlanInfo.advertisementFormat
        let Recomendition: any = PlanInfo.Recomendition
        let payAttention: any = PlanInfo.payAttention

        blog = blog.map((item: any) => item.Price)
        digitalMarketing = digitalMarketing.map((item: any) => item.Price)
        advertisementFormat = advertisementFormat.map((item: any) => item.Price)
        payAttention = payAttention.map((item: any) => item.Price)
        Recomendition = Recomendition.map((item: any) => item.Price)
        promotion = promotion.map((item: any) => item.Price)
        consultancy = consultancy.map((item: any) => item.Price)
        voucher = voucher.map((item: any) => item.Price)
        products = products.map((item: any) => item.Price)
        service = service.map((item: any) => item.Price)



        products = products.concat(service).concat(blog).concat(digitalMarketing).concat(advertisementFormat)
            .concat(payAttention).concat(Recomendition).concat(promotion).concat(consultancy).concat(voucher)
        console.log("products", products);
        let planGrandTotal: any = products.reduce((partialSum: any, a: any) => partialSum + a, 0);
        PlanInfo = await Plan.findOneAndUpdate({ _id: PlanInfo._id, isDeleted: false }, {
            $set: {
                planGrandTotal: planGrandTotal
            }
        })
        return PlanInfo;
    }

    public async editPlan(id: any, body: any) {
        let PlanInfo: any = await Plan.findOneAndUpdate({ _id: id, isDeleted: false }, body, { new: true }).lean();



        let service: any = PlanInfo.services;
        let products: any = PlanInfo.products;
        let voucher: any = PlanInfo.voucher;
        let consultancy: any = PlanInfo.consultancy;
        let blog: any = PlanInfo.blog;
        let digitalMarketing: any = PlanInfo.digitalMarketing;
        let promotion: any = PlanInfo.promotion
        let advertisementFormat: any = PlanInfo.advertisementFormat
        let Recomendition: any = PlanInfo.Recomendition
        let payAttention: any = PlanInfo.payAttention

        blog = blog.map((item: any) => item.Price)
        digitalMarketing = digitalMarketing.map((item: any) => item.Price)
        advertisementFormat = advertisementFormat.map((item: any) => item.Price)
        payAttention = payAttention.map((item: any) => item.Price)
        Recomendition = Recomendition.map((item: any) => item.Price)
        promotion = promotion.map((item: any) => item.Price)
        consultancy = consultancy.map((item: any) => item.Price)
        voucher = voucher.map((item: any) => item.Price)
        products = products.map((item: any) => item.Price)
        service = service.map((item: any) => item.Price)



        products = products.concat(service).concat(blog).concat(digitalMarketing).concat(advertisementFormat)
            .concat(payAttention).concat(Recomendition).concat(promotion).concat(consultancy).concat(voucher)

        let planGrandTotal: any = products.reduce((partialSum: any, a: any) => partialSum + a, 0);
        console.log("planGrandTotal", planGrandTotal);
        PlanInfo = await Plan.findOneAndUpdate({ _id: PlanInfo._id, isDeleted: false }, {
            $set: {
                planGrandTotal: planGrandTotal
            }
        })
        return PlanInfo;
    }



    public async buyPlan(coupon: any, planId: any, vendorId: any, planActivate: any) {

        let deductionAmount: any;
        let couponInfo: any;
        let PlanInfo: any;
        let VendorInfo: any;



        if (coupon) {
            couponInfo = await Coupon.findOne({ code: { $in: coupon } }).lean()
            PlanInfo = await Plan.findOne({ _id: planId, isDeleted: false }).lean();
            console.log("PlanInfo", PlanInfo);
            if (couponInfo.discountPrice) {
                deductionAmount = PlanInfo.planGrandTotal - couponInfo.discountPrice;
                console.log("deductionAmount", deductionAmount);

            }
            couponInfo = await Coupon.updateMany(
                {},
                {
                    $pull: { code: { $in: coupon } }
                }
            )

            let vaildityUpTo: any = moment(planActivate).add(PlanInfo.planValidity, 'd').toDate();
            console.log("vaildityUpTo", vaildityUpTo);
            VendorInfo = await VendorShop.updateMany({
                _id: vendorId
            }, {
                $push: {
                    "planActive": {
                        planId: planId,
                        vendorPlanTotal: PlanInfo.deductionAmount,
                        planActiveDate: planActivate,
                        planDisactiveDate: vaildityUpTo
                    }
                }
            })





        } else {
            PlanInfo = await Plan.findOne({ _id: planId, isDeleted: false }).lean();

            let vaildityUpTo: any = moment(planActivate).add(PlanInfo.planValidity, 'd').toDate();
            console.log("vaildityUpTo", vaildityUpTo);
            VendorInfo = await VendorShop.updateMany({
                _id: vendorId
            }, {
                $push: {
                    "planActive": {
                        planId: planId,
                        vendorPlanTotal: PlanInfo.deductionAmount,
                        planActiveDate: planActivate,
                        planDisactiveDate: vaildityUpTo
                    }
                }
            })

            // VendorInfo = await VendorShop.updateMany({
            //     _id: vendorId
            // }, {
            //     $push: {
            //         "planActive": {
            //             planId: planId,
            //             vendorPlanTotal: PlanInfo.deductionAmount

            //         }
            //     }
            // })
            // console.log("VendorInfo", VendorInfo.updatedAt);
            // let vaildityUpTo: any = moment(VendorInfo.updatedAt).add(PlanInfo.planValidity, 'm');
            // console.log("vaildityUpTo", vaildityUpTo);

            // PlanInfo = await VendorShop.updateMany({
            //     _id: vendorId
            // }, {
            //     $push: {
            //         "planActive": {
            //             planActiveDate: VendorInfo.updatedAt,
            //             planDisactiveDate: vaildityUpTo

            //         }
            //     }
            // })



            // schedule.scheduleJob(vaildityUpTo, async function () {
            //     PlanInfo = await VendorShop.updateMany({
            //         _id: vendorId
            //     }, {
            //         $pull: {
            //             "planActive": {
            //                 _id: PlanInfo._id,


            //             }
            //         }
            //     })


            // })


        }


        return {
            PlanInfo, deductionAmount
        };
    }




    public async buyCustomPlan(body: any) {

    }

    public async getPlanList() {
        const PlanList: IPlan[] = await Plan.find({ isDeleted: false });
        return PlanList;
    }


    public async getPlanInfoById(PlanId: string) {
        const PlanInfo: IPlan = await Plan.findOne({ _id: PlanId, isDeleted: false }).lean();
        return PlanInfo;
        
    }


    public async deletePlan(PlanId: String) {
        const PlanInfo: IPlan = await Plan.findOneAndUpdate({ _id: PlanId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return PlanInfo;
    }

}