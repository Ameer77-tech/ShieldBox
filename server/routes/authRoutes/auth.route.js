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
  const totalItems = sections.reduce((acc, item) => acc + item.items.length, 0);
  const important = sections.reduce(
    (acc, section) => (section.pinned ? acc + 1 : acc),
    0
  );

  // Check if all sections have the `lastViewed` key
  const canSort = sections.every((section) => section.lastViewed);

  // Sort only if all sections have the `lastViewed` key
  const sortedSections = canSort
    ? sections.sort((a, b) => new Date(b.lastViewed) - new Date(a.lastViewed))
    : sections;

  let recentViewedSections = sortedSections.map((section) => {
    if (section.lastViewed) {
      return {
        id: section._id,
        name: section.name,
      };
    }
  });

  // Filter out undefined values
  recentViewedSections = recentViewedSections.filter(
    (section) => section !== undefined
  );


  res.status(200).json({
    reply: "Authorized",
    success: true,
    email,
    name,
    isKeySet,
    totalSections,
    totalItems,
    important,
    recentViewedSections,
  });
});
router.put("/setkey", authorizeToken, setKey);

export default router;
