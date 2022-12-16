
import Category, { ICategory } from "../models/Category";
import SubCategory, { ISubCategory } from "../models/Subcategory";
import SubSubCategory, { ISubSubCategory } from "../models/subSubCategory";


import { ObjectId } from "mongoose";




export default class CategoryController {

  

//////////////////////////////Category///////////////////////////////////////////////////////////


    public async createCategory(body: ICategory) {
        let categoryInfo: ICategory;
        categoryInfo = await Category.create(body);

        return categoryInfo;
    }


    public async editCategory(body: ICategory, categoryId: string) {

        const categoryInfo: ICategory = await Category.findOneAndUpdate({ _id: categoryId, isDeleted: false }, body, { new: true }).lean();
        return categoryInfo;

    }


    public async getCategory(type: any) {
        const categoryList: any = await Category.find({ isDeleted: false,type:type});
        return categoryList;
    }
    public async getCategoryCustomer() {
        const categoryList: ICategory[] = await Category.find({ isDeleted: false });
        return categoryList;
    }


    public async getCategoryInfoById(categoryId: any) {
        const categoryInfo: any = await Category.findOne({ _id: categoryId, isDeleted: false }).lean();
        return categoryInfo;
    }

    public async deleteCategory(categoryId: string) {
       
        const categoryInfo: ICategory = await Category.findOneAndUpdate({ _id: categoryId, isDeleted: false }, { $set: { isDeleted: true } }).lean()
        return categoryInfo;
    }
    //////////////////////SubCategory////////////////////////////////////////////////////////////
    public async createSubCategory(body: ISubCategory) {
     

        let subCategoryInfo: ISubCategory;
        subCategoryInfo = await SubCategory.create(body);
       
        return subCategoryInfo;
    }


    public async editSubCategory(body: ISubCategory, subCategoryId: string) {
        
        const subCategoryInfo: ISubCategory = await SubCategory.findOneAndUpdate({ _id: subCategoryId, isDeleted: false }, body, { new: true }).lean();
        return subCategoryInfo;

    }


    public async getAllSubCategory() {
        const subCategoryList: ISubCategory[] = await SubCategory.find({ isDeleted: false });
        return subCategoryList;
    }

    public async getSubCategory(categoryId: any) {
        const subCategoryList: ISubCategory[] = await SubCategory.find({ categoryId: categoryId, isDeleted: false }).lean();
        return subCategoryList;
    }

    public async getSubCategoryInfoById(subCategoryId: string) {
        const subCategoryInfo: any = await SubCategory.findOne({ _id: subCategoryId, isDeleted: false }).lean();
        return subCategoryInfo;
    }

    public async deleteSubCategory(subCategoryId: string, userId: String) {
      

        const subCategoryInfo: ISubCategory = await Category.findOneAndUpdate({ _id: subCategoryId, isDeleted: false }, { $set: { isDeleted: true } }).lean()
        return subCategoryInfo;


    }



    //////////////////////////////////////SubSubCategory////////////////////////////////////////
    public async createsubSubCategory(body: ISubSubCategory) {
        let subSubCategoryInfo: ISubSubCategory;
        subSubCategoryInfo = await SubSubCategory.create(body);

        return subSubCategoryInfo;
    }


    public async editsubSubCategory(body: ISubSubCategory, subSubCategoryId: string) {
        
        const subSubCategoryInfo: ISubSubCategory = await SubSubCategory.findOneAndUpdate({ _id: subSubCategoryId, isDeleted: false }, body, { new: true }).lean();
        return subSubCategoryInfo;

    }


    public async getSubSubCategory(subCategoryId: any) {
        const subSubCategoryList: ISubSubCategory[] = await SubSubCategory.find({ subCategoryId: subCategoryId, isDeleted: false });
        return subSubCategoryList;
    }

    public async getCategorySubSubInfoById(subSubCategoryId: any) {
        const subSubCategoryInfo: any = await SubSubCategory.findOne({ _id: subSubCategoryId, isDeleted: false }).lean();
        return subSubCategoryInfo;
    }

    public async deleteSubSubCategory(subSubCategoryId: string, userId: String) {
       

        const subSubCategoryInfo: ISubSubCategory = await Category.findOneAndUpdate({ _id: subSubCategoryId, isDeleted: false }, { $set: { isDeleted: true } }).lean()
        return subSubCategoryInfo;


    }
}