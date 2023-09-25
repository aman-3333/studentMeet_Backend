import express from "express";
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
import {successResponse, errorResponse} from "../services/apiResponse";
import { ITournament } from "../models/tournament.model";
import TournamentController from "../controllers/tournamentController";


router.post("/create",  async (req, res) => {
    try {
const body = req.body;
        const controller = new TournamentController();
        const response = await controller.createTournament(body);
        res.status(200).json(successResponse("create Tournament", response, res.statusCode));
    } catch (error) {
        res.status(500).json(errorResponse("error in create Tournament", res.statusCode));
    }
});

router.patch("/edit/:id",  async (req, res) => {
    try {
        const tournamentId = req.params.id;
        const body = req.body as ITournament;
        const controller = new TournamentController();
        const response: ITournament = await controller.editTournament(body, tournamentId);
        res.status(200).json(successResponse("edit Tournament", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in edit Tournament", res.statusCode));
    }
});

router.get("/list",  async (req, res) => {
    try {
        const controller = new TournamentController();
   
        const response: ITournament[] = await controller.getTournamentList();
        res.status(200).json(successResponse("Tournament list", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in Tournament list", res.statusCode));
    }
});


router.get("/info/byid",  async (req, res) => {
    try {
        const tournamentId: any = req.query.tournamentId;
        const controller = new TournamentController();
        const response: any = await controller.getTournamentInfoById(tournamentId);
        res.status(200).json(successResponse("getTournament", response, res.statusCode));
    } catch (error) {
      
        res.status(500).json(errorResponse("error in getTournament", res.statusCode));
    }
});


router.get("/delete/:id",  async (req, res) => {
    try {
        const tournamentId = req.params.id;
        const controller = new TournamentController();
        const response: ITournament = await controller.deleteTournament(tournamentId);
        res.status(200).json(successResponse("deleteTournament", response, res.statusCode));

    } catch (error) {
       
        res.status(500).json(errorResponse("error in deleteTournament", res.statusCode));
    }
})


export default router;