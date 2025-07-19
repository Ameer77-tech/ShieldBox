import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/user-model.js";
import dotenv from "dotenv";
dotenv.config();
import setCookie from "../middlewares/setCookie.js";


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
      const created = await userModel.create({
        name,
        email,
        password: hashedPassword,
      });
      if (created) {
        const token = setCookie(email)
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
        });
        res
          .status(200)
          .json({ reply: "User Created Succesfully", success: true });
      }
      res.status(500).json({ reply: "User not Created", success: false });
    } catch (err) {
      console.log("Error creating user");
      res.status(500).json({ reply: "Error creating user", success: false });
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
       const token = setCookie(email)
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
        });    
        //setcookie
      res.status(200).json({ reply: "User is authorized", success: true });
    } catch (err) {}
  } catch (err) {
    res.status(500).json({ reply: "Error finding user", success: false });
  }
};

export const logout = (req,res)=>{
    res.clearCookie("token")
    res.status(200).json({reply:"Logged Out Succesfully", success : true})
}