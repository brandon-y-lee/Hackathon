import express from 'express';
import { getChainOfShipments } from "../controllers/client.js";

const router = express.Router();

router.get("/chainOfShipments", getChainOfShipments);

export default router;