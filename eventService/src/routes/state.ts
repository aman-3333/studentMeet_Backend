import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";

import { IState } from "../models/State";
import StateController from "../controllers/StateController";
import { ICity } from "../models/cityModel";
import { ICountry } from "../models/country";


router.post("/state/create", checkAuth, async (req, res) => {
    try {
        
req.body.user=res.locals.user
const body = req.body;
        const controller = new StateController();
        const response = await controller.createState(body);
        res.status(200).json(successResponse("create State", response, res.statusCode));
    } catch (error) {
     
        res.status(500).json(errorResponse("error in create State", res.statusCode));
    }
});
router.patch("/state/edit/:id", checkAuth, async (req, res) => {
    try {
        const StateId = req.params.id;
        req.body.user=res.locals.user
        const body = req.body as IState;
        const controller = new StateController();
        const response: IState = await controller.editState(body, StateId);
        res.status(200).json(successResponse("edit State", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in edit State", res.statusCode));
    }
});

router.get("/state/list",  async (req, res) => {
    try {
        const countryId=req.query.countryId;
        const controller = new StateController();
        const response: IState[] = await controller.getStateList(countryId);
        res.status(200).json(successResponse("State list", response, res.statusCode));
    } catch (error) {
        
        res.status(500).json(errorResponse("error in State list", res.statusCode));
    }
});


router.get("/state/infobyid", checkAuth, async (req, res) => {
    try {
        const StateId = req.query.id;
        const controller = new StateController();
        const response: IState = await controller.getStateInfoById(StateId);
        res.status(200).json(successResponse("get State", response, res.statusCode));
    } catch (error) {
    
        res.status(500).json(errorResponse("error in get State", res.statusCode));
    }
});


router.get("/state/delete", checkAuth, async (req, res) => {
    try {
        const StateId = req.body.stateId;
        const controller = new StateController();
        const response: IState = await controller.deleteState(StateId);
        res.status(200).json(successResponse("delete State", response, res.statusCode));

    } catch (error) {
  
        res.status(500).json(errorResponse("error in delete State", res.statusCode));
    }
})



router.post("/city/create", checkAuth, async (req, res) => {
    try {
        
req.body.user=res.locals.user
const body = req.body;
        const controller = new StateController();
        const response = await controller.createCity(body);
        res.status(200).json(successResponse("create City", response, res.statusCode));
    } catch (error) {
     
        res.status(500).json(errorResponse("error in create City", res.statusCode));
    }
});
router.patch("/city/edit/:id", checkAuth, async (req, res) => {
    try {
        const CityId = req.params.id;
        req.body.user=res.locals.user
        const body = req.body as ICity;
        const controller = new StateController();
        const response: ICity = await controller.editCity(body, CityId);
        res.status(200).json(successResponse("edit City", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in edit City", res.statusCode));
    }
});

router.get("/city/list", checkAuth, async (req, res) => {
    try {
        const stateId=req.query.stateId;
        const controller = new StateController();
        const response: ICity[] = await controller.getCityList(stateId);
        res.status(200).json(successResponse("City list", response, res.statusCode));
    } catch (error) {
        
        res.status(500).json(errorResponse("error in City list", res.statusCode));
    }
});


router.get("/city/infobyid", checkAuth, async (req, res) => {
    try {
        const CityId = req.query.id;
        const controller = new StateController();
        const response: ICity = await controller.getCityInfoById(CityId);
        res.status(200).json(successResponse("get City", response, res.statusCode));
    } catch (error) {
    
        res.status(500).json(errorResponse("error in get City", res.statusCode));
    }
});


router.get("/city/delete", checkAuth, async (req, res) => {
    try {
        const CityId = req.body.CityId;
        const controller = new StateController();
        const response: ICity = await controller.deleteCity(CityId);
        res.status(200).json(successResponse("delete City", response, res.statusCode));

    } catch (error) {
  
        res.status(500).json(errorResponse("error in delete City", res.statusCode));
    }
})





router.post("/country/create",  async (req, res) => {
    try {
        
req.body.user=res.locals.user
const body = req.body;
        const controller = new StateController();
        const response = await controller.createCountry(body);
        res.status(200).json(successResponse("create Country", response, res.statusCode));
    } catch (error) {
     
        res.status(500).json(errorResponse("error in create Country", res.statusCode));
    }
});
router.patch("/country/edit/:id", checkAuth, async (req, res) => {
    try {
        const CountryId = req.params.id;
        req.body.user=res.locals.user
        const body = req.body as ICountry;
        const controller = new StateController();
        const response: ICountry = await controller.editCountry(body, CountryId);
        res.status(200).json(successResponse("edit Country", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in edit Country", res.statusCode));
    }
});

router.get("/country/list",  async (req, res) => {
    try {
        const controller = new StateController();
        const response: ICountry[] = await controller.getCountryList();
        res.status(200).json(successResponse("Country list", response, res.statusCode));
    } catch (error) {
        
        res.status(500).json(errorResponse("error in Country list", res.statusCode));
    }
});


router.get("/country/infobyid", checkAuth, async (req, res) => {
    try {
        const CountryId = req.query.id;
        const controller = new StateController();
        const response: ICountry = await controller.getCountryInfoById(CountryId);
        res.status(200).json(successResponse("get Country", response, res.statusCode));
    } catch (error) {
    
        res.status(500).json(errorResponse("error in get Country", res.statusCode));
    }
});


router.get("/country/delete", checkAuth, async (req, res) => {
    try {
        const CountryId = req.body.CountryId;
        const controller = new StateController();
        const response: ICountry = await controller.deleteCountry(CountryId);
        res.status(200).json(successResponse("delete Country", response, res.statusCode));

    } catch (error) {
  
        res.status(500).json(errorResponse("error in delete Country", res.statusCode));
    }
})



export default router;