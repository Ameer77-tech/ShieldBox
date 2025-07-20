import express from "express";
import { dashboard } from "../../controllers/section.controller.js";
import authorizeToken from "../../middlewares/authorizeToken.js";
const router = express.Router();

router.get("/dashboard", authorizeToken, dashboard);

export default router;
