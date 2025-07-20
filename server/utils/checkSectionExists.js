import sectionModel from "../models/section-model.js";

const checkSectionExists = async (sectionName, _id)=>{
    try{
       const exists = await sectionModel.findOne({
        name: sectionName,
        createdBy: _id,
      });
      if(!exists)
        return false
      else
        return true
    }catch(err){
        return false
    }
    
}
export default checkSectionExists