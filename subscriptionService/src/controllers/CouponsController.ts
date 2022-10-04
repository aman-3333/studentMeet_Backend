import Coupon, { ICoupon } from "../models/Coupons";
import Plan from "../models/Plan";
import Vendor from "../models/VendorShop";
import { ICategory } from "../models/Category";
import User, { IUser } from "../models/User";
import { Item } from "../models/Item";
import { IProduct } from "../models/Product";
import { ObjectId } from "mongoose";
import FuzzySearch from "fuzzy-search"
export default class CouponController {


    public async CreateCoupon(body: any,) {
        let count: any;
        let couponArray: any = [];

        let planId: any = await Plan.findOne({ _id: body.planId, isDeleted: false }).lean();

        planId = planId.voucher;
        count = planId.map((item: any) => item.Count)

        let categoryInfo: any = await Vendor.findOne({
            _id: body.vendorId, isDeleted: false
        }).lean()

        for (let i = 0; i < count; i++) {
            couponArray.push(couponGenerator())
        }
        function couponGenerator() {
            let text = "";
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (let i = 0; i < 8; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        let myDiscountCode: any = couponGenerator()
        let newDiscountCode = new Coupon({
            code: couponArray,
            isPercent: true,
            ownerId: body.ownerId,
            amount: body.amount,
            expireDate: body.expireDate,
            isActive: true,
            validityStart: body.validityStart,
            couponType: body.couponType,
            discountPercent: body.discountPercent,
            discountPrice: body.discountPrice,
            vendorId: body.vendorId,
            categoryId: categoryInfo.category,
            codeCopy: couponArray,
            planId: body.planId
        })

        let couponInfo: any = await newDiscountCode.save();
        await Vendor.updateMany({ _id: body.vendorId, isDeleted: false }, {
            $push: {
                couponId
                    : couponInfo._id
            }
        }).lean()
        return couponInfo;
    }

    public async createCustomCoupon(body: any,) {

        let couponArray: any = [];
        for (let i = 0; i < body.count; i++) {
            couponArray.push(couponGenerator())
        }
        function couponGenerator() {
            let text = "";
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (let i = 0; i < 8; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        let myDiscountCode: any = couponGenerator()
        let newDiscountCode = new Coupon({
            code: couponArray,
            isPercent: true,
            ownerId: body.ownerId,
            amount: body.amount,
            expireDate: body.expireDate,
            isActive: true,
            couponType: body.couponType,
            discountPercent: body.discountPercent,
            discountPrice: body.discountPrice,
            codeCopy: couponArray

        })

        let couponInfo: any = await newDiscountCode.save();
        await Vendor.updateMany({ _id: body.vendorId, isDeleted: false }, {
            $push: {
                couponId
                    : couponInfo._id
            }
        }).lean()
        return couponInfo;
    }

    public async couponGift(assignById: any, assignToId: any, coupon: any) {
        let assignBy: any;
        let assignto: any
        assignBy = await User.updateMany(
            { _id: assignById },
            {
                $pull: { "couponCollection.code": coupon }
            })
        console.log("assignBy", assignBy);

        // let checkInfo: any = await User.findOne({ _id: assignToId, isDeleted: false, "couponCollection.code": coupon }).lean()
        // console.log("checkInfo", checkInfo);


        assignto = await User.updateMany({ _id: assignToId }, {
            $push: {
                "couponCollection.code": coupon

            }
        }, { new: true }).lean()
        console.log("assignto", assignto);

        return {
            assignBy, assignto
        }
    }

    public async findCoupon(categoryId: any, search: any) {
        let CouponInfo: any;
        let vendorInfo: any;
        let userInfo: any;
        let data: any = []
        CouponInfo = await Coupon.find({ categoryId: categoryId, isDeleted: false }, {
            codeCopy
                : 0
        }).lean()
        console.log("CouponInfo", CouponInfo);

        for (let i = 0; i < CouponInfo.length; i++) {
            vendorInfo = await Vendor.find({
                couponId
                    : { $in: CouponInfo[i]._id }
            })
            CouponInfo[i].vendorInfo = vendorInfo
            userInfo = await User.find({ "couponCollection.couponId": CouponInfo[i]._id, isDeleted: false }, {
                couponCollection
                    : 0
            }
            ).lean()
            CouponInfo[i].userInfo;
            data = data.concat(userInfo)
            userInfo = data
            console.log("i", i);

        }
        if (search) {
            const searcher = new FuzzySearch(vendorInfo, ["shopName"], {
                caseSensitive: false,
            });
            vendorInfo = searcher.search(search);
        }


        return {
            userInfo, CouponInfo
        }
    }

    public async pullCoupon(coupon: any, userId: any) {
        let couponInfo: any;
        let addcoupon: any;
        couponInfo = await Coupon.findOne({
            code:
                { $in: coupon }

        })


            addcoupon = await User.updateMany({ _id: userId }, {
                $push: {
                    "couponCollection.couponId": couponInfo._id, "couponCollection.code": coupon

                }
            }, { new: true }).lean()
        // 
        console.log("addcoupon", addcoupon);

        let couponpull: any = await Coupon.updateMany(
            {},
            {
                $pull: { code: { $in: coupon } }
            })


        return {
            couponInfo, couponpull, addcoupon
        }
    }

    public async exchangeCoupon(coupon: any) {




    }

    public async purchaseCoupon() {

    }



    public async editCoupon(body: ICoupon, CouponId: string) {
        const CouponInfo: ICoupon = await Coupon.findOneAndUpdate({ _id: CouponId, isDeleted: false }, body, { new: true }).lean();
        return CouponInfo;
    }

    public async getCouponList() {
        const CouponList: ICoupon[] = await Coupon.find({ isDeleted: false });
        return CouponList;
    }

    public async getCouponInfoById(CouponId: string) {
        const CouponInfo: ICoupon = await Coupon.findOne({ _id: CouponId, isDeleted: false }).lean();
        return CouponInfo;
    }

    public async deleteCoupon(CouponId: String) {
        const CouponInfo: ICoupon = await Coupon.findOneAndUpdate({ _id: CouponId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
        return CouponInfo;
    }

}
