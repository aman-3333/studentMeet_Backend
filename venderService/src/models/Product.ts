import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    productName: { type: String },
    categoryId: { type: Schema.Types.ObjectId },
    subSubCategoryId: { type: Schema.Types.ObjectId },
    subCategoryId: { type: Schema.Types.ObjectId },
    vendorShopId: { type: Schema.Types.ObjectId, required: true },
    productBrand: { type: String },
    productDescription: { type: String },

    variations: [
        {
            color: { type: String },
            size: { type: String },
            material: { type: String },
            SKU: { type: String },
            price: { type: Number },
            stock: { type: Number },
            productPicture: [{ type: String }],
            weight: { type: Number },
        }

    ],

    productCategory: { type: Schema.Types.ObjectId },


    productAvailability: { type: Boolean, default: true },
    discountAvailability: { type: Boolean, default: true },
    discount: { type: Number },
    discountPercentage: { type: Number },
    rating: { type: Number },
    offers: { type: String },
    isFavourite: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

export interface IProduct extends Document {
    productName: String,
    vendorShopId: ObjectId,
    categoryId: ObjectId,
    subSubCategoryId: ObjectId,
    subCategoryId: ObjectId,
    productBrand: String,

    variations: [
        {
            color: String,
            size: String,
            material: String,
            SKU: String,
            price: Number
            stock: Number
            productPicture: [String],
            weight: Number
        }

    ],
    productDescription: String,
    productCategory: ObjectId,


    productAvailability: Boolean,
    discountAvailability: Boolean,
    discount: Number,
    discountPercentage: Number,
    rating: Number,
    offers: String,
    isFavourite: Boolean,
    isDeleted: Boolean
}
// user

export default model<IProduct>("Product", schema);    //     {
    //         _id: "12345",
    //         name: "My Product",
    //         ...
    //         colors: [
    //             {
    //                 _id: "Color_1",
    //                 images: [
    //                     "http://myserver.com/images/product_12345_1",
    //                     "http://myserver.com/images/product_12345_2",
    //                 ]
    //             },
    //             {
    //                 _id: "Color_3",
    //                 images: [
    //                     "http://myserver.com/images/product_12345_3",
    //                     "http://myserver.com/images/product_12345_4",
    //                 ]
    //             }
    //         ],
    //         sizes: [
    //             {
    //                 _id: "Size_5"
    //             },
    //             {
    //                 _id: "Size_9"
    //             }
    //         ],
    //         materials: [
    //             {
    //                 _id: "Material_2"
    //             }
    //         ],
    //         variations: [
    //             {
    //                 color: "Color_1",
    //                 size: "Size_5",
    //                 material: "Material_2",
    //                 SKU: "98765"
    //       price: 10,
    //                 stock: 2
    //             },
    //             {
    //                 color: "Color_1",
    //                 size: "Size_9",
    //                 material: "Material_2",
    //                 SKU: "87654"
    //       price: 11,
    //                 stock: 5
    //             },
    //             ...
    //   ],
    //     }