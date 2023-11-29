import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import { ITournamentMatch } from "../models/tournamentMatch.model";
import TournamentMatchController from "../controllers/TournamentMatchController";


router.post("/create",  async (req, res) => {
    try {
const body = req.body;
        const controller = new TournamentMatchController();
        const response = await controller.createTournamentMatch(body);
        res.status(200).json(successResponse("create TournamentMatch", response, res.statusCode));
    } catch (error) {
   
        res.status(500).json(errorResponse("error in create TournamentMatch", res.statusCode));
    }
});

router.patch("/edit/:id",  async (req, res) => {
    try {
        const tournamentMatch = req.params.id;
        const body = req.body as ITournamentMatch;
        const controller = new TournamentMatchController();
        const response: ITournamentMatch = await controller.editTournamentMatch(body, tournamentMatch);
        res.status(200).json(successResponse("edit TournamentMatch", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in edit TournamentMatch", res.statusCode));
    }
});



router.get("/list",  async (req, res) => {
    try {
        const controller = new TournamentMatchController();
        const response: ITournamentMatch[] = await controller.getTournamentMatchList();
        res.status(200).json(successResponse("TournamentMatch list", response, res.statusCode));
    } catch (error) {
        res.status(500).json(errorResponse("error in TournamentMatch list", res.statusCode));
    }
});



router.get("/info/byid",  async (req, res) => {
    try {
        const tournamentMatch: any = req.query.tournamentMatch;
        const controller = new TournamentMatchController();
        const response: any = await controller.getTournamentMatchInfoById(tournamentMatch);
        res.status(200).json(successResponse("getTournamentMatch", response, res.statusCode));
    } catch (error) {
        res.status(500).json(errorResponse("error in getTournamentMatch", res.statusCode));
    }
});



router.post("/delete",  async (req, res) => {
    try {
        const tournamentMatch =req.body._id;;
        const controller = new TournamentMatchController();
        const response: ITournamentMatch = await controller.deleteTournamentMatch(tournamentMatch);
        res.status(200).json(successResponse("deleteTournamentMatch", response, res.statusCode));
    } catch (error) {
       
        res.status(500).json(errorResponse("error in deleteTournamentMatch", res.statusCode));
    }
})


export default router;