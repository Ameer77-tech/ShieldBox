import sectionModel from "../models/section-model.js";
import userModel from "../models/user-model.js";
import checkItemExists from "../utils/checkItemExists.js";
import activityModel from "../models/activity-model.js";
import { v4 as uuidv4 } from "uuid";


export const addItem = async (req, res) => {
  if (!req.body)
    return res
      .status(401)
      .json({ reply: "Body must'nt be Empty", success: false });

  const email = req.user;
  const sectionId = req.params.sectionid;
  const { newItemName, newItemValue } = req.body;

  try {
    const { _id } = await userModel.findOne({ email });
    const exists = await checkItemExists(_id, sectionId, newItemName);
    if (exists) {
      return res
        .status(409)
        .json({ reply: "Item already exists", success: false });
    }

    try {
      const newItem = {
        itemId: uuidv4(), // 👈 special unique id
        itemName: newItemName,
        itemValue: newItemValue,
      };

      await sectionModel.findOneAndUpdate(
        { _id: sectionId },
        { $push: { items: newItem } }
      );

      try {
        await activityModel.create({
          userId: _id,
          action: "Added an item",
        });
      } catch (err) {
        return res.status(500).json({
          reply: "Internal Server Error (Cant log action)",
          success: false,
        });
      }

      res.status(200).json({
        reply: "Item Added Successfully",
        success: true,
        item: newItem, // 👈 return item with itemId so frontend gets it
      });
    } catch (err) {
      res.status(500).json({ reply: "Internal Server Error", success: false });
    }
  } catch (err) {
    res.status(500).json({ reply: "Internal Server Error", success: false });
  }
};

export const getItems = async (req, res) => {
  const email = req.user;
  const sectionId = req.params.sectionid;
  try {
    const user = await userModel.findOne({ email });
    const _id = user._id;
    try {
      const response = await sectionModel.findOne({
        createdBy: _id,
        _id: sectionId,
      });
      const { items } = response;
      res
        .status(200)
        .json({ reply: "Data fetch Successfull", success: true, items });
    } catch (err) {
      res.status(500).json({ reply: "Internal Server Error", success: false });
    }
  } catch (err) {
    res.status(500).json({ reply: "Internal Server Error", success: false });
  }
};

export const deleteItem = async (req, res) => {
  if (!req.body) {
    return res
      .status(401)
      .json({ reply: "Body must not be empty", success: false });
  }

  const email = req.user;
  const sectionId = req.params.sectionid;
  const { itemId } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        reply: "User not found",
        success: false,
      });
    }

    const _id = user._id;

    try {
      await sectionModel.findOneAndUpdate(
        { createdBy: _id, _id: sectionId },
        {
          $pull: {
            items: { itemId: itemId },
          },
        }
      );

      try {
        await activityModel.create({
          userId: _id,
          action: "Deleted an item",
        });
      } catch (err) {
        return res.status(500).json({
          reply: "Internal Server Error (Can't log action)",
          success: false,
        });
      }

      return res.status(200).json({
        reply: "Item successfully deleted",
        success: true,
      });
    } catch (err) {
      return res.status(500).json({
        reply: "Internal Server Error (Can't delete)",
        success: false,
      });
    }
  } catch (err) {
    return res.status(500).json({
      reply: "Internal Server Error (Can't find user)",
      success: false,
    });
  }
};

export const updateItem = async (req, res) => {
  if (!req.body)
    return res
      .status(401)
      .json({ reply: "Body must'nt be Empty", success: false });

  const email = req.user;
  const sectionId = req.params.sectionid;
  const { itemId, updateName, updateValue } = req.body;

  try {
    const { _id } = await userModel.findOne({ email });

    // ✅ Check if another item already has this name (collision check)
    const section = await sectionModel.findOne({ _id: sectionId });

    if (!section) {
      return res
        .status(404)
        .json({ reply: "Section not found", success: false });
    }

    const duplicate = section.items.find(
      (item) => item.itemName === updateName && item.itemId !== itemId
    );

    if (duplicate) {
      return res
        .status(409)
        .json({ reply: "Item with same name already exists", success: false });
    }

    // ✅ Update item by itemId
    const response = await sectionModel.findOneAndUpdate(
      { _id: sectionId, "items.itemId": itemId },
      {
        $set: {
          "items.$.itemName": updateName,
          "items.$.itemValue": updateValue,
        },
      },
      { new: true }
    );
    try {
      await activityModel.create({
        userId: _id,
        action: "Updated an item",
      });
    } catch (err) {
      return res.status(500).json({
        reply: "Internal Server Error (Cant log action)",
        success: false,
      });
    }

    return res.status(200).json({
      reply: "Update Successful",
      success: true,
      response,
    });
  } catch (err) {
    console.error("UpdateItem error:", err);
    return res
      .status(500)
      .json({ reply: "Internal Server Error", success: false });
  }
};
