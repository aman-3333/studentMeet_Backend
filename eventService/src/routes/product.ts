import express from "express";
const router = express.Router();
import {successResponse, errorResponse} from "../services/apiResponse";
import { IProduct } from "../models/product";
import ProductController from "../controllers/ProductController";
router.post("/create", async (req, res) => {
    try {
        const body = req.body;
        const controller = new ProductController();
        const response = await controller.createProduct(body);
        res.status(200).json(successResponse("create Product", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in create Product", res.statusCode));
    }
});

router.patch("/edit/:id", async (req, res) => {
    try {
        const ProductId = req.params.id;
        const body = req.body as IProduct;
        const controller = new ProductController();
        const response: IProduct = await controller.editProduct(body, ProductId);
        res.status(200).json(successResponse("edit Product", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in edit Product", res.statusCode));
    }
});

router.get("/list", async (req, res) => {
    try {
        const controller = new ProductController();
        const stateId = req.query.stateId;
        const response: IProduct[] = await controller.getProductList(stateId);
        res.status(200).json(successResponse("Product list", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in Product list", res.statusCode));
    }
});


router.get("/filter", async (req, res) => {
    try {
        
        const query = req.query;
        const controller = new ProductController();
        const response: any = await controller.filterProduct(query);
        res.status(200).json(successResponse("Product list", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in Product list", res.statusCode));
    }
});


router.get("/infobyid", async (req, res) => {
    try {
        const ProductId: any = req.query.ProductId;
        const controller = new ProductController();
        const response: any = await controller.getProductInfoById(ProductId);
        res.status(200).json(successResponse("getProduct", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in getProduct", res.statusCode));
    }
});


router.get("/delete/:id", async (req, res) => {
    try {
        const ProductId = req.params.id;
        const controller = new ProductController();
        const response: IProduct = await controller.deleteProduct(ProductId);
        res.status(200).json(successResponse("deleteProduct", response, res.statusCode));

    } catch (error) {
       
        res.status(500).json(errorResponse("error in deleteProduct", res.statusCode));
    }
})

router.post("/addtocart", async (req, res) => {
    try {
        const body = req.body;
        const controller = new ProductController();
        const response = await controller.addtocart(body);
        res.status(200).json(successResponse("addtocart Product", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in addtocart Product", res.statusCode));
    }
});


router.get("/cartlist", async (req, res) => {
    try {
        const controller = new ProductController();
        const userId = req.query.userId;
        const response: IProduct[] = await controller.getcartlist(userId);
        res.status(200).json(successResponse("Product getcartList", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in Product getcartList", res.statusCode));
    }
});
export default router;