import userModel from "../models/user-model.js";

const deleteSectionFromUser = async (userEmail, sectionId)=>{
    try{
        const deleted = await userModel.findOneAndUpdate({ email : userEmail },
            { $pull : { sections : sectionId } },
            { new : true }
        )
        return true
    }catch(err){
        return false
    }
}
export default deleteSectionFromUser