import React from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_BACKEND;

export const getAllSections = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/api/getsections`, {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    console.log(err, "Cant get Sections");
    return false;
  }
};

export const getItems = async (sectionId) => {
  try {
    const { data } = await axios.get(`${apiUrl}/api/${sectionId}/getitems`, {
      withCredentials: true,
    });
    return data;
  } catch (err) {
    console.log(err, "Cant get Items (error)");
    return false;
  }
};
