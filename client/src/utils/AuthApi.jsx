import React from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_BACKEND;

export const checkAuth = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/api/auth/checkauth`, {
      withCredentials: true,
    });
    const {
      success,
      isKeySet,
      name,
      email,
      totalSections,
      totalItems,
      important,
      recentViewedSections,
    } = data;
    return {
      success,
      isKeySet,
      name,
      email,
      totalItems,
      totalSections,
      important,
      recentViewedSections,
    };
  } catch (err) {
    console.log(err);
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

export const isKeySet = async () => {
  try {
    const { data } = await axios.put(
      `${apiUrl}/api/auth/setkey`,
      {},
      { withCredentials: true }
    );
    return data.success;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const logout = async () => {
  try {
    const { data } = await axios.delete(`${apiUrl}/api/auth/logout`, {
      withCredentials: true,
    });
    if (data.success) return true;
    else return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};
