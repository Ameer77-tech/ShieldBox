import express from "express";
import authorizeToken from "../../middlewares/authorizeToken.js";
const router = express.Router();

import {
  addItem,
  getItems,
  deleteItem,
  updateItem,
} from "../../controllers/item.controller.js";

router.post("/:sectionid/additem", authorizeToken, addItem);
router.get("/:sectionid/getitems", authorizeToken, getItems);
router.put("/:sectionid/item/update", authorizeToken, updateItem);
router.delete("/:sectionid/deleteitem", authorizeToken, deleteItem);

export default router;
