import sectionModel from "../models/section-model.js";
import userModel from "../models/user-model.js";
import updateUser from "../utils/addSectionToUser.js";
import checkSectionExists from "../utils/checkSectionExists.js";
import deleteSectionFromUser from "../utils/deleteSectionFromUser.js";


export const dashboard = async (req, res) => {
  const email = req.user;
};

export const addSection = async (req, res) => {
  if (req.body === undefined)
    return res
      .status(401)
      .json({ reply: "Body must'nt be Empty", success: false });
  const email = req.user;
  const { sectionName } = req.body;
  if (sectionName === undefined)
    return res
      .status(401)
      .json({ reply: "Fill all details to continue", success: false });
  try {
    const { _id } = await userModel.findOne({ email });
    const response = await checkSectionExists( sectionName, _id ) 
    if(response){
      return res.status(409).json({ reply : "Section with that name already exists", success : false })
    }
      try {
        const createdSection = await sectionModel.create({
          name: sectionName,
          createdBy: _id,
        });
        if (!createdSection) {
          return res.status(500).json({
            reply: "Server Error (Can't create section)",
            success: false,
          });
        } else {
          const updated = await updateUser(_id, createdSection._id);
          if (!updated)
            return res
              .status(500)
              .json({ reply: "User section not updated", success: false });
          return res
            .status(200)
            .json({ reply: "Section Created", success: true });
        }
      } catch (err) {
        res.status(500).json({
          reply: "Server Error (Can't create section)",
          success: false,
        });
      }
  } catch (err) {
    res
      .status(500)
      .json({ reply: "Server Error (Can't find user)", success: false });
  }
};

export const deleteSection = async (req,res) => {
  if (req.body === undefined)
    return res
      .status(401)
      .json({ reply: "Body must'nt be Empty", success: false });
  const email = req.user;
  const sectionId  = req.params.sectionid
      try{
        const deleted = await sectionModel.findOneAndDelete({ _id : sectionId })
        if(!deleted)
          return res.status(500).json({ reply : "Error deleting section", success : false })
        try{
          const response = await deleteSectionFromUser( email, sectionId )
          return res.status(200).json({ reply : "Succesfully deleted a section", success : true })
        }catch(err){
           res.status(500).json({ reply : "Internal server Error", success : false })
        }
        
          
      }catch(err){
          res.status(500).json({ reply : "Internal server Error", success : false })
      }
};

export const readSection = async (req,res)=>{
  const email = req.user
  try{
    const user = await userModel.findOne({ email }).populate("sections")
    const allSections = user.sections
    res.status(200).json({ reply : "Get sections successfull", success : true,  sections : allSections  })
  }catch(err){
    console.log(err)
    res.status(500).json({ reply : "Internal Server Error", success : false, err })
  }
}

export const updateSection = async (req,res) => {
   if (req.body === undefined)
    return res
      .status(401)
      .json({ reply: "Body must'nt be Empty", success: false });
  const email = req.user;
  const sectionId = req.params.sectionid
  const { newName } = req.body;
  if (newName === undefined)
    return res
      .status(401)
      .json({ reply: "Fill all details to continue", success: false });
      try{
        const { _id } = await userModel.findOne({ email });
        const response = await checkSectionExists(newName,_id)
        if(response)
          return res.status(409).json({ reply : "Section with that name already exists", success : false })
  try{
    const updated = await sectionModel.findOneAndUpdate( { _id : sectionId },
      { name : newName }
     )
     res.status(200).json({ reply : "Section renamed", success : true})
  }catch(err){
    res.status(500).json({ reply : "Internal Server Error", success : false, err })
  }
}catch(err){
  res.status(500).json({ reply : "Internal Server Error ", success : false })
}
}