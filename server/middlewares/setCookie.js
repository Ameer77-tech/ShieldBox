import jwt from "jsonwebtoken";
const setCookie = (email)=>{
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d",
      });
     return token
}

export default setCookie