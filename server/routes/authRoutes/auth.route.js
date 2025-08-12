import {
  register,
  login,
  logout,
  verify,
  setKey,
} from "../../controllers/auth.controller.js";
import express from "express";
import authorizeToken from "../../middlewares/authorizeToken.js";
import userModel from "../../models/user-model.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);
router.post("/verify", verify);
router.get("/checkauth", authorizeToken, async (req, res) => {
  const email = req.user;
  const { isKeySet, name, sections } = await userModel
    .findOne({ email })
    .populate("sections");
  const totalSections = sections.length;
  const totalItems = sections.reduce((acc, item) => {
    return (acc = acc + item.items.length);
  }, 0);
  const important = sections.reduce((acc, section) => {
    if (section.pinned) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
  res.status(200).json({
    reply: "Authorized",
    success: true,
    email,
    name,
    isKeySet,
    totalSections,
    totalItems,
    important,
  });
});
router.put("/setkey", authorizeToken, setKey);

export default router;
