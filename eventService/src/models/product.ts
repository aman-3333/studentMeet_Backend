import { Document, model, ObjectId, Schema } from "mongoose";

const schema = new Schema({
    productName: { type: String, required: true },
    productDiscription: { type: String, required: true },
    onSale:  { type: Boolean, default: false },
    shipping_cost: { type: Number, default: 0 },
    newArrival: { type: Boolean, default: false },
    bestSeller: { type: Boolean, default: false },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    subSubCategoryId: { type: Schema.Types.ObjectId, ref: 'subSubCategory' },
    subCategoryId: { type: Schema.Types.ObjectId, ref: 'Subcategory' },
    vendorId: { type: Schema.Types.ObjectId, required: true,ref: 'VendorShop' },
    gender: { type: String },
    deliveryFees: { type: Number, default: 0 },
    physicalProduct: { type: Boolean, default: true },
    trackQuantity: { type: Boolean },
    productBrandId: { type: Schema.Types.ObjectId, ref: 'brand' },
  
    productPicture: [{  type: Schema.Types.Mixed }],


    categoryName: { type: String },
    subCategoryName: { type: String },
    subSubCategoryName: { type: String },
    brandName: { type: String },
    sellerName: { type: String },
    productDescription: { type: String },
    // connectedImg: { type: Boolean },
    
    rating: [{
        userId: { type: Schema.Types.ObjectId, ref: 'user' },
        rating: { type: Number }
    }],
    comment: [{
        userId: { type: Schema.Types.ObjectId, ref: 'user' },
        comment: { type: String }
    }],
    likeProfile: [{
        userId: { type: Schema.Types.ObjectId, ref: 'user' },
        likeProfile: { type: Number }
    }],
    Review: [{
        userId: { type: Schema.Types.ObjectId, ref: 'user' },
        likeProfile: { type: Number },
        Review: { type: String },
        images: [{
            type: String
        }]
    }],
    tags: [{ type: String }],
    price: { type: Number },
    salePrice: { type: Number },
    costPrice: { type: Number },
    profit: { type: Number },
    discountAvailability: { type: Boolean, default: true },
    discount_by_percent: { type: Boolean, default: true },
    // discountFix: { type: Number, default: 0 },
    discountPercentage: { type: Number, default: 0 },
    stock: { type: Number },
    SKU: { type: String },
    barcode: { type: String },
    offers: { type: String },
    productActive: { type: String, enum: ["draft", "active"], default: "active" },
    isFavourite: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    cod: { type: Boolean, default: true },

    // NEW FIELDS
  
   

    // TAX RELATED FIELDS
    tax: {
        taxName: { type: String },
        taxCode: { type: String },
        taxPercentage: { type: Number, default: 0 },
    },

    // SEO FEILDS
  

    // Shipping fields
    shipment_length: { type: Number, default: 0 },
    shipment_width: { type: Number, default: 0 },
    shipment_height: { type: Number, default: 0 }, //in cm
    shipment_weight: { type: Number, default: 0 }, //in kg
}, {
    timestamps: true
});


export interface IProduct extends Document {
    productName: String,
    productDiscription: String,
    categoryName: String,
    subSubCategoryName: String,
    onSale: Boolean,
    shipping_cost: Number,
 
    newArrival: Boolean,
    bestSeller: Boolean,
    subCategoryName: String,
    brandName: String,
    sellerName: String,
    categoryId: ObjectId,
    subSubCategoryId: ObjectId,
    subCategoryId: ObjectId,
    vendorId: ObjectId,
   
    gender: String,

    deliveryFees: Number,
    physicalProduct: Boolean,
    trackQuantity: Boolean,
    productBrandId: ObjectId,
  
    productPicture: [String],


  
    productDescription: String,
    // connectedImg: { type: Boolean },
    
    rating: [{
        userId: ObjectId,
        rating: Number
    }],
    comment: [{
        userId: ObjectId,
        comment: String
    }],
    likeProfile: [{
        userId: ObjectId,
        likeProfile: Number
    }],
    Review: [{
        userId: ObjectId,
        likeProfile: Number,
        Review: String,
        images: [String]
    }],
    tags: [String],
    price: Number,
    salePrice: Number,
    costPrice: Number,
    profit: Number,
    discountAvailability: Boolean,
    discount_by_percent: Boolean,
    // discountFix: Number,
    discountPercentage: Number,
    stock: Number,
    SKU: String,
    barcode: String,
    offers: String,
    productActive: String,
    isFavourite: Boolean,
    isDeleted: Boolean,
    cod: Boolean,

    // NEW FIELDS
  
   

    // TAX RELATED FIELDS
    tax: {
        taxName: String,
        taxCode: String,
        taxPercentage: Number,
    },

    // SEO FEILDS
  

    // Shipping fields
    shipment_length: Number,
    shipment_width: Number,
    shipment_height: Number, //in cm
    shipment_weight: Number, //in kg
}

// user

export default model<IProduct>("Product", schema);