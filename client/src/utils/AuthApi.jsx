import React from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_BACKEND;

export const checkAuth = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/api/auth/checkauth`, {
      withCredentials: true,
    });
    const success = data.success
    const isKeySet = data.isKeySet
    return  { success, isKeySet }
  } catch (err) {
    console.log(err, "Cant check auth");
    return false;
  }
};

export const register = async (formData) => {
  try {
    const { data } = await axios.post(`${apiUrl}/api/auth/register`, formData, {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    if (err.response) {
      return err.response.data;
    } else if (err.request) {
      console.log("No response", err.request);
    } else {
      console.log("Error", err.message);
    }
  }
};

export const login = async (formData) => {
  try {
    const { data } = await axios.post(`${apiUrl}/api/auth/login`, formData, {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    if (err.response) {
      return err.response.data; // "Invalid email"
    } else if (err.request) {
      console.log("No response", err.request);
    } else {
      console.log("Error", err.message);
    }
  }
};

export const verifyCode = async (code, email) => {
  try {
    const { data } = await axios.post(
      `${apiUrl}/api/auth/verify`,
      { code, email },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    if (err.response) {
      return err.response.data;
    } else if (err.request) {
      console.log("No response", err.request);
    } else {
      console.log("Error", err.message);
    }
  }
};

export const isKeySet = async ()=>{
  try{
    const { data } = await axios.put(`${apiUrl}/api/auth/setkey`, {} ,{ withCredentials : true })
    return data.success
  }catch(err){
    console.log(err)
    return false
  }
}
