import express from "express";
import {
  addSection,
  deleteSection,
  readSection,
  updateSection,
} from "../../controllers/section.controller.js";
import authorizeToken from "../../middlewares/authorizeToken.js";
const router = express.Router();

router.post("/addsection", authorizeToken, addSection);
router.delete("/deletesection/:sectionid", authorizeToken, deleteSection);
router.get("/getsections", authorizeToken, readSection);
router.put("/updatesection/:sectionid", authorizeToken, updateSection);

export default router;
