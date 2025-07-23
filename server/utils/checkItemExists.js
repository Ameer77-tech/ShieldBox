import sectionModel from "../models/section-model.js";
import userModel from "../models/user-model.js";

const checkItemExists = async (userId, sectionId, itemName) => {
  try {
    const exists = await sectionModel.findOne(
      { createdBy: userId, _id: sectionId, "items.itemName" : itemName  }
    );
    if(exists)
        return true;
    else
        return false
  } catch (err) {
    return false;
  }
};
export default checkItemExists;
