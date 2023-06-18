import express from "express";
const router = express.Router();
import {successResponse, errorResponse} from "../services/apiResponse";

import { ISubCategory } from "../models/subcategory";
import { ISubSubCategory } from "../models/subSubCategory";

import Category, { ICategory } from "../models/category";
import CategoryController from "../controllers/CategoryController";



router.post("/createCategory", async (req, res) => {
    try {
        const body = req.body as ICategory;
     
        const controller = new CategoryController();
        const response:ICategory = await controller.createCategory(body);
        res.status(200).json(successResponse("create category", response, res.statusCode));
    } catch(error) {
     
        res.status(500).json(errorResponse("error in create category", res.statusCode));
    }
});

router.patch("/Category/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        
        const body = req.body as ICategory;
        const controller = new CategoryController();
        const response: ICategory = await controller.editCategory(body, categoryId);
        res.status(200).json(successResponse("category update", response, res.statusCode));
    } catch(error) {
       
        res.status(500).json(errorResponse("error in category update", res.statusCode));
    }
});

router.get("/categoryList", async (req, res) => {
    try {
        const controller = new CategoryController();
        const type = req.query.type;
        const response = await controller.getCategory(type);
        res.status(200).json(successResponse("get category", response, res.statusCode));
    } catch(error) {
     
        res.status(500).json(errorResponse("error in get category", res.statusCode));
    }
});
router.get("/getCategoryCustomer", async (req, res) => {
    try {
        const controller = new CategoryController();

        const response: ICategory[] = await controller.getCategoryCustomer();
        res.status(200).json(successResponse("get category", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in get category", res.statusCode));
    }
});

router.get("/categoryInfoById", async (req, res) => {
    try {
        const categoryId= req.query.categoryId;
        const userId=req.body.userId;
        const controller = new CategoryController();
        const response: any = await controller.getCategoryInfoById(categoryId);
        res.status(200).json(successResponse("get category by Id ", response, res.statusCode));
    } catch(error) {
     
        res.status(500).json(errorResponse("error in get category by Id", res.statusCode));
    }
});
router.patch("/deleteCategory/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;
        const controller = new CategoryController();
        const response: ICategory = await controller.deleteCategory(categoryId);
        res.status(200).json(successResponse("category update", response, res.statusCode));
    } catch(error) {
  
        res.status(500).json(errorResponse("error in category update", res.statusCode));
    }
});

router.post("/subCategory", async (req, res) => {
    try {
        const body = req.body as ISubCategory;

        const controller = new CategoryController();
        const response: ISubCategory = await controller.createSubCategory(body);
        res.status(200).json(successResponse("create subcategory", response, res.statusCode));
    } catch (error) {
    
        res.status(500).json(errorResponse("error in create subcategory", res.statusCode));
    }
});

router.patch("/subCategory/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;

        const body = req.body as ISubCategory;
        const controller = new CategoryController();
        const response: ISubCategory = await controller.editSubCategory(body, categoryId);
        res.status(200).json(successResponse("subCategory update", response, res.statusCode));
    } catch (error) {
    
        res.status(500).json(errorResponse("error in subCategory update", res.statusCode));
    }
});

router.get("/subCategoryList", async (req, res) => {
    try {
        const controller = new CategoryController();
        const categoryId = req.query.categoryId
        const userId = req.body.userId;
        const response: ISubCategory[] = await controller.getSubCategory(categoryId);
        res.status(200).json(successResponse("get subCategory", response, res.statusCode));
    } catch (error) {
     
        res.status(500).json(errorResponse("error in get subCategory", res.statusCode));
    }
});

router.get("/getAllSubCategory", async (req, res) => {
    try {
        const controller = new CategoryController();
        const userId = req.body.userId;
        const response: ISubCategory[] = await controller.getAllSubCategory();
        res.status(200).json(successResponse("get subCategory", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in get subCategory", res.statusCode));
    }
});

router.get("/subCategoryinfobyid", async (req, res) => {
    try {
        const subCategoryId: any = req.query.subCategoryId;
        const userId = req.body.userId;
        const controller = new CategoryController();
        const response: any = await controller.getSubCategoryInfoById(subCategoryId);
        res.status(200).json(successResponse("get subCategory by Id ", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in get subCategory by Id", res.statusCode));
    }
});


router.patch("/subCategory/delete/:id", async (req, res) => {
    try {
        const subCategoryId = req.body.subCategoryId;
        const userId = req.body.userId;
        const controller = new CategoryController();
        const response: ISubCategory = await controller.deleteSubCategory(subCategoryId, userId);
        res.status(200).json(successResponse("delete subCategory", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in delete subCategory", res.statusCode));
    }
})
router.post("/subSubCategory", async (req, res) => {
    try {
        const body = req.body as ISubSubCategory;

        const controller = new CategoryController();
        const response: ISubSubCategory = await controller.createsubSubCategory(body);
        res.status(200).json(successResponse("create subSubCategory", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in create subSubCategory", res.statusCode));
    }
});

router.patch("/subSubCategory/:id", async (req, res) => {
    try {
        const subSubCategoryId = req.params.id;

        const body = req.body as ISubSubCategory;
        const controller = new CategoryController();
        const response: ISubSubCategory = await controller.editsubSubCategory(body, subSubCategoryId);
        res.status(200).json(successResponse("subSubCategory update", response, res.statusCode));
    } catch (error) {
     
        res.status(500).json(errorResponse("error in subSubCategory update", res.statusCode));
    }
});

router.get("/subSubCategoryList", async (req, res) => {
    try {
        const subCategoryId = req.query.subCategoryId;
        const controller = new CategoryController();

        const response: ISubSubCategory[] = await controller.getSubSubCategory(subCategoryId);
        res.status(200).json(successResponse("get subSubCategory", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in get subSubCategory", res.statusCode));
    }
});


router.get("/subSubCategoryinfobyid", async (req, res) => {
    try {
        const subSubCategoryId: any = req.query.subSubCategoryId;
        const userId = req.body.userId;
        const controller = new CategoryController();
        const response: any = await controller.getCategorySubSubInfoById(subSubCategoryId);
        res.status(200).json(successResponse("get subSubCategory by Id ", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in get subSubCategory by Id", res.statusCode));
    }
});


router.patch("/subSubCategory/:id", async (req, res) => {
    try {
        const subSubCategoryId = req.body.subSubCategoryId;
        const userId = req.body.userId;
        const controller = new CategoryController();
        const response: ISubSubCategory = await controller.deleteSubSubCategory(subSubCategoryId, userId);
        res.status(200).json(successResponse("delete subSubCategory", response, res.statusCode));
    } catch (error) {
        
        res.status(500).json(errorResponse("error in delete subSubCategory", res.statusCode));
    }
})


export default router;