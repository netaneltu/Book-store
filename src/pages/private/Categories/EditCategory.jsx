import React from "react";
import { useLocation } from "react-router-dom";

const EditCategory = () => {
  const { state } = useLocation();
  return console.log(state);
};

export default EditCategory;
