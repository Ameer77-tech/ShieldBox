import {
  register,
  login,
  logout,
  verify,
  setKey,
  deleteAccount,
} from "../../controllers/auth.controller.js";
import express from "express";
import authorizeToken from "../../middlewares/authorizeToken.js";
import userModel from "../../models/user-model.js";
import activityModel from "../../models/activity-model.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);
router.post("/verify", verify);
router.get("/checkauth", authorizeToken, async (req, res) => {
  const email = req.user;
  let id;

  try {
    const user = await userModel.findOne({ email }).populate("sections");

    if (!user) {
      return res.status(404).json({
        reply: "User not found",
        success: false,
      });
    }

    const { isKeySet, name, sections } = user;
    id = user._id;

    const totalSections = sections.length;
    const totalItems = sections.reduce(
      (acc, item) => acc + item.items.length,
      0
    );
    const important = sections.reduce(
      (acc, section) => (section.pinned ? acc + 1 : acc),
      0
    );
    const canSort = sections.every((section) => section.lastViewed);
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
    recentViewedSections = recentViewedSections.filter(
      (section) => section !== undefined
    );
    let activity;
    try {
      const logs = await activityModel.find({ userId: id });
      activity = logs.map((activity) => {
        return { action: activity.action, time: activity.createdAt };
      });
    } catch (err) {
      res.status(500).json({
        reply: "Internal Server Error",
        success: false,
      });
    }

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
      activity,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      reply: "Internal Server Error",
      success: false,
    });
  }
});
router.put("/setkey", authorizeToken, setKey);
router.post("/deleteaccount", authorizeToken, deleteAccount);

export default router;
