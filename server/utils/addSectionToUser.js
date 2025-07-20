import userModel from "../models/user-model.js";

const updateUser = async (userId, sectionId) => {
  try {
    const added = await userModel.findOneAndUpdate(
      { _id : userId },
      {
        $push: { sections: sectionId },
      },
      { new: true }
    );
    return true
  } catch (err) {
    return false
  }
  
};

export default updateUser