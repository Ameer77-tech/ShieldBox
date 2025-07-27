import sectionModel from "../models/section-model.js";
import userModel from "../models/user-model.js";
import checkItemExists from "../utils/checkItemExists.js";

export const addItem = async (req, res) => {
  if (req.body === undefined)
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
      const response = await sectionModel.findOneAndUpdate(
        { _id: sectionId },
        {
          $push: {
            items: {
              itemName: newItemName,
              itemValue: newItemValue,
            },
          },
        }
      );
      res.status(200).json({ reply: "Item Added Successfully", success: true });
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
  if (req.body === undefined)
    return res
      .status(401)
      .json({ reply: "Body must'nt be Empty", success: false });
  const email = req.user;
  const sectionId = req.params.sectionid;
  const { itemName } = req.body;
  

  try {
    const user = await userModel.findOne({ email });
    const _id = user._id;
    try {
      const response = await sectionModel.findOneAndUpdate(
        { createdBy: _id, _id: sectionId },
        {
          $pull: {
            items: { itemName: itemName },
          },
        }
      );
      res
        .status(200)
        .json({ reply: "Item Successfully deleted", success: true });
    } catch (err) {
      res
        .status(500)
        .json({ reply: "Internal Server Error (camt delete)", success: false });
    }
  } catch (err) {
    res.status(500).json({ reply: "Cant find user", success: false });
  }
};

export const updateItem = async (req,res) => {
  if (req.body === undefined)
    return res
      .status(401)
      .json({ reply: "Body must'nt be Empty", success: false });
      const email = req.user
      const sectionId = req.params.sectionid
      const { oldName ,updateName, updateValue } = req.body
      try{
        const { _id } = await userModel.findOne({ email })
      
      try{
        const exists = await checkItemExists(_id, sectionId, updateName)
        if(exists)
          return res.status(409).json({ reply : "Item already Exists", success : false })
      try{
          const response = await sectionModel.findOneAndUpdate( { _id : sectionId, "items.itemName" : oldName },{
            $set:{
              "items.$.itemName" : updateName,
              "items.$.itemValue": updateValue
            }
          }, { new : true } )
          res.status(200).json({ reply : "Update Successfull", success : true, response })
      }catch(err){
        res.status(500).json({ reply: "Internal Server Error", success: false });
      }
    }
    catch(err){
      res.status(500).json({ reply: "Internal Server Error", success: false });
    }
  }catch(err){
    res.status(500).json({ reply: "Internal Server Error", success: false });
  }
}