import bcrypt from "bcrypt";
import userModel from "../models/user-model.js";
import sectionModel from "../models/section-model.js";
import pendingUserModel from "../models/pending-user-model.js";
import activityModel from "../models/activity-model.js";
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
      sendCode(email, result);
      console.log("Email sent");
      const code = result.toString();
      try {
        const pendingUser = await pendingUserModel.findOneAndUpdate(
          { email },
          {
            $setOnInsert: {
              name,
              password: hashedPassword,
            },
            $set: { code },
          },
          {
            upsert: true,
            new: true,
            runValidators: true,
          }
        );
        console.log("Pending added");
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
      .json({ reply: "Server Error (can't find user)", success: false });
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
        secure: true, // only true in prod
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      //setcookie
      res.status(200).json({ reply: "User is authorized", success: true });
    } catch (err) {
      res.status(500).json({ reply: "Error", success: false });
    }
  } catch (err) {
    res.status(500).json({ reply: "Error finding user", success: false });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });
  res.status(200).json({ reply: "Logged Out Succesfully", success: true });
};

export const verify = async (req, res) => {
  if (req.body === undefined)
    return res
      .status(401)
      .json({ reply: "Body must'nt be empty", success: false });
  const { code, email } = req.body;
  if (code === undefined || email === undefined)
    return res.status(401).json({ reply: "fill the input", success: false });
  try {
    const userData = await pendingUserModel.findOne({ email });
    console.log(userData);

    if (userData == null)
      return res
        .status(401)
        .json({ reply: "No users found or Code expired", success: false });
    const originalCode = userData.code;
    const { name, password } = userData;
    const pendingEmail = userData.email;
    if (code !== originalCode)
      return res.status(401).json({ reply: "Invalid Code", success: false });
    try {
      const response = await pendingUserModel.findOneAndDelete({ email });
      try {
        const user = await userModel.create({
          name,
          email,
          password,
          isVerified: true,
        });
        const token = setCookie(email);
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res
          .status(200)
          .json({ reply: "User successfully registered", success: true });
      } catch (err) {
        res
          .status(500)
          .json({ reply: "Server Error (can't create user)", success: false });
      }
    } catch (err) {
      res
        .status(500)
        .json({ reply: "Server Error (can't delete user)", success: false });
    }
  } catch (err) {
    res
      .status(500)
      .json({ reply: "Server Error (can't find user)", success: false });
  }
};

export const setKey = async (req, res) => {
  const email = req.user;
  console.log(email);
  try {
    await userModel.findOneAndUpdate(
      { email },
      {
        isKeySet: true,
      }
    );
    res.status(200).json({ reply: "Key is Set", success: true });
  } catch (err) {
    res.status(500).json({ reply: "Server Error", success: false });
  }
};
export const deleteAccount = async (req, res) => {
  const email = req.user;
  const { password } = req.body || null;
  if (password === null) {
    return res
      .status(401)
      .json({ reply: "PASSWORD IS REQUIRED", success: false });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ reply: "No User Registered With That Email", success: false });
    } else {
      const id = user._id;
      const hashedPassword = user.password;
      const matched = await bcrypt.compare(password, hashedPassword);
      if (!matched) {
        return res
          .status(401)
          .json({ reply: "Invalid Password", success: false });
      } else {
        try {
          await userModel.findOneAndDelete({ email });
          try {
            await sectionModel.deleteMany({ createdBy: id });
            await activityModel.deleteMany({ userId: id });
          } catch (err) {
            res
              .status(500)
              .json({ reply: "Internal Server Error", success: false });
          }
          res.clearCookie("token");
          return res
            .status(200)
            .json({ reply: "Account Successfully Deleted", success: true });
        } catch (err) {
          res
            .status(500)
            .json({ reply: "Internal Server Error", success: false });
        }
      }
    }
  } catch (err) {
    res.status(500).json({ reply: "Internal Server Error", success: false });
  }
};

export const changeUserName = async (req, res) => {
  if (req.body === undefined)
    return res
      .status(401)
      .json({ reply: "Body must'nt be Empty", success: false });
  const { updatedName } = req.body;
  const email = req.user;

  try {
    await userModel.findOneAndUpdate(
      { email },
      {
        $set: {
          name: updatedName,
        },
      },
      { new: true }
    );

    res.status(200).json({ reply: "USERNAME UPDATED", success: true });
  } catch (err) {
    res.status(500).json({ reply: "Internal Server Error", success: false });
  }
};

export const changePassword = async (req, res) => {
  if (req.body === undefined)
    return res
      .status(401)
      .json({ reply: "Body must'nt be Empty", success: false });

  const { current, newPassword } = req.body;
  const email = req.user;

  try {
    const { password } = await userModel.findOne({ email });
    const isMatch = await bcrypt.compare(current, password);
    if (!isMatch) {
      return res
        .status(500)
        .json({ reply: "Incorrect Current Password", success: false });
    } else {
      const hashed = await bcrypt.hash(newPassword, 10);
      try {
        await userModel.findOneAndUpdate(
          { email },
          {
            $set: {
              password: hashed,
            },
          }
        );
        res.status(200).json({ reply: "PASSWORD UPDATED", success: true });
      } catch (err) {
        res
          .status(500)
          .json({ reply: "Internal Server Error", success: false });
      }
    }
  } catch (err) {
    res.status(500).json({ reply: "Internal Server Error", success: false });
  }
};

export const setTestData = async (req, res) => {
  const email = req.user;
  const { encryptedString } = req.body;
  try {
    await userModel.findOneAndUpdate(
      { email },
      {
        $set: {
          testString: encryptedString,
        },
      }
    );
    res.status(200).json({ reply: "Data Set", success: true });
  } catch (err) {
    res.status(500).json({ reply: "Internal Server Error", success: false });
  }
};

export const getTestData = async (req, res) => {
  const email = req.user;
  try {
    const { testString } = await userModel.findOne({ email });
    res
      .status(200)
      .json({ reply: "Data Set", success: true, encryptedString: testString });
  } catch (err) {
    res.status(500).json({ reply: "Internal Server Error", success: false });
  }
};
export const resetAccount = async (req, res) => {
  const email = req.user;
  try {
    const { _id } = await userModel.findOne({ email });
    await userModel.updateOne(
      { email },
      {
        $set: {
          sections: [],
        },
      }
    );
    await sectionModel.deleteMany({ createdBy: _id });
    await activityModel.deleteMany({
      userId: _id,
    });
    res.status(200).json({ reply: "Data reset Success", success: true });
  } catch (err) {
    res.status(500).json({ reply: "Internal Server Error", success: false });
  }
};
