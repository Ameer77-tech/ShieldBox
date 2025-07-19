import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/user-model.js";
import pendingUserModel from "../models/pending-user-model.js";
import dotenv from "dotenv";
dotenv.config();
import setCookie from "../middlewares/setCookie.js";
import { sendCode } from "../utils/mailer.js";

export const register = async (req, res) => {
  if (req.body === undefined)
    return res
      .status(401)
      .json({ reply: "Body must'nt be Empty", success: false });
  const { name, email, password } = req.body;

  if (name === undefined || email === undefined || password === undefined)
    return res
      .status(401)
      .json({ reply: "Fill all details to continue", success: false });
  try {
    const user = await userModel.findOne({ email });
    if (user)
      return res
        .status(409)
        .json({ reply: "User already exists", success: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
       const result = Math.floor(100000 + Math.random() * 900000);
       await sendCode(email,result)
       const code = result.toString()
      try {
        const pendingUser = await pendingUserModel.findOneAndUpdate(
          { email },
          {
            $setOnInsert: {
              name,
              password : hashedPassword,
            },
            $set: { code,
              expiresAt: new Date(Date.now() + 10 * 60 * 1000),
             }, 
          },
          {
            upsert: true,
            new: true,
            runValidators: true,
          }
        );
        res.status(200).json({ reply: "Pending user added", success: true });
      } catch (err) {
        res
          .status(500)
          .json({ reply: "pending user not created", success: false });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ reply: "Error Sending Email", success: false });
    }
  } catch (err) {
    console.log("Error finding user", err);
    res
      .status(500)
      .json({ replay: "Server Error (can't find user)", success: false });
  }
};

export const login = async (req, res) => {
  if (req.body === undefined)
    return res
      .status(401)
      .json({ reply: "Body must'nt be Empty", success: false });
  const { email, password } = req.body;
  if (email === undefined || password === undefined)
    return res
      .status(401)
      .json({ reply: "Fill all details to continue", success: false });
  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(401).json({
        reply: "No user is registered with that email",
        success: false,
      });
    try {
      const hashedPassword = user.password;
      const isMatched = await bcrypt.compare(password, hashedPassword);

      if (!isMatched)
        return res
          .status(401)
          .json({ reply: "Invalid Password", success: false });
      //setcookie
      const token = setCookie(email);
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
      });
      //setcookie
      res.status(200).json({ reply: "User is authorized", success: true });
    } catch (err) {
      res.status(500).json({reply : "Error", success : false})
    }
  } catch (err) {
    res.status(500).json({ reply: "Error finding user", success: false });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ reply: "Logged Out Succesfully", success: true });
};

export const verify = async (req, res) => {
    if(req.body === undefined)
      return res.status(401).json({reply:"Body must'nt be empty", success : false})
    const { code , email } = req.body
    if(code === undefined || email === undefined)
      return res.status(401).json({reply:"fill the input", success : false})
    
    try{
      const userData = await pendingUserModel.findOne({email})
      if(!userData)
        return res.status(401).json({reply:"No users found or Code expired", success : false})
      const originalCode = userData.code
      
      const { name, password } = userData
      const pendingEmail = userData.email
      
      if(code !== originalCode)
        return res.status(401).json({ reply : "Invalid Code", success : false })
      try{
        const response = await pendingUserModel.findOneAndDelete({ email })
        
        try{
          const user = await userModel.create({
            name,
            email,
            password,
            isVerified : true,
          })
          const token = setCookie(email)
          res.cookie("token",token,{
            httpOnly : true,
            secure : true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          })
          res.status(200).json({ reply : "User successfully registered", success : true })
        }catch(err){
           res.status(500).json({ reply : "Server Error (can't create user)", success : false })
        }
      }catch(err){
         res.status(500).json({ reply : "Server Error (can't delete user)", success : false })
      }
    }
    catch(err){
        res.status(500).json({ reply : "Server Error (can't find user)", success : false })
    }
    
    
};
