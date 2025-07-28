import React from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_BACKEND;

export const addSection = async (formData)=>{
  try{
    const { data } = await axios.post(`${apiUrl}/api/addsection`, formData, { withCredentials : true })
    return data
  }catch(err){
    return { error : err.response.data.reply, success : false }
  }
  
  
}

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

export const deleteSection = async (sectionId) => {
  try {
    const { data } = await axios.delete(
      `${apiUrl}/api/deletesection/${sectionId}`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err) {
    console.log(err, "Cant delete Section");
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

export const deleteItem = async (name, id) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/api/${id}/deleteitem`, {
      data: { itemName: name },
      withCredentials: true,
    });
    return data;
  } catch (err) {
    console.log(err, "Cant delete Section");
    return false;
  }
};
