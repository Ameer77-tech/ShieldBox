import mongoose from 'mongoose'


const connectdb = ()=>{
try{
    mongoose.connect(process.env.MONGO_URI)
    console.log("Database Connected")
}catch(err){
    console.log("Error Connecting to Database", err)
    process.exit(1)
}
}


export default connectdb