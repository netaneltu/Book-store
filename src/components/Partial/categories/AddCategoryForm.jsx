import React from "react";
import { useState,useEffect } from "react";
import {
  FormLabel,
  Input,
  Button,
  Spinner,
  Heading,
  Box,
  AlertIcon,
  Spacer,
  Select,
  Alert
} from "@chakra-ui/react";
import axios from "axios";
import allSubCategoris from "../../../hooks/allSubCategoris";

const AddCategoryForm = () => {
  const allSubCategorisArray=allSubCategoris()
  console.log(allSubCategorisArray);
  const [categoryName, setCategoryName] = useState("");
  const [message, setMessage] = useState();
  const [categories, setCategories] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState([]);
  const [messageStatus, setMessageStatus] = useState();



  const handleChangeCategory = (e) => {
    setCategoryName(e.target.value);
    
  };

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/categories/managers/all`
        );
        
        setCategories(data.categories);
        
      } catch (error) {
        console.log(error);
      }
    };
    getAllCategories();
  }, []);
console.log(categories);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const check= categories.some((c)=>
        c.category_name==categoryName
      )

     

      if(!check){
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/categories/managers/add-category`,
          {
            category_name: categoryName }
        );
        setMessage("קטגוריה נוספה בהצלחה");
        setMessageStatus("success");
      }
      else{setMessage("קטגוריה כבר קיימת");
      setMessageStatus("error");}
      
    } catch (error) {
      console.log(error.response);
      setMessageStatus("error");
      
    }
    
  };
  const handleSubmitSubCat = async (e) => {
    e.preventDefault();
    try {
      const subCheck=allSubCategorisArray.some((c)=>
        c.category_name==subCategoryName
      )
      console.log(subCategoryName);
//if(!subCheck && !check){
      if(!subCheck){
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/categories/managers/add-subcategory`,
          {  parent_category:categoryName,
            category_name: subCategoryName }
        );
        setMessage("קטגוריה נוספה בהצלחה");
        setMessageStatus("success");
      }
      else{setMessage("קטגוריה כבר קיימת");
      setMessageStatus("error");}
      
    } catch (error) {
      console.log(error.response);
      setMessageStatus("error");
      
    }
    
  };
  return (
    <>
      <Heading mb={"20px"}> הוסף קטגוריה</Heading>

      <Box mb={"10px"} onSubmit={handleSubmit} as="form">
        <FormLabel> שם הקטגוריה</FormLabel>
        <Input
          onChange={(e) => {
            setCategoryName(e.target.value);
          }}
          id="category_name"
          my="20px"
          placeholder="הכנס את שם הקטגוריה "
          aria-label="input for category name"
        />

        <Button type="submit" colorScheme="teal">
          הוסף קטגוריה
        </Button>

        </Box>
        <Box mb={"10px"} onSubmit={handleSubmitSubCat} as="form">
        <FormLabel> שם התת קטגוריה</FormLabel>
        <Select
                  onChange={handleChangeCategory}
                  mb="15px"
                  id="select_category"
                  placeholder="בחר קטגוריה"
                >
                  {categories.map((category) => {
                    return (
                      <option
                        key={category._id}
                        value={JSON.stringify({
                          id: category._id,
                          name: category.category_name,
                        })}
                      >
                        {category.category_name}
                      </option>
                    );
                  })}
                </Select>
        <Input
          onChange={(e) => {
            setSubCategoryName(e.target.value);
          }}
          id="category_name"
          my="20px"
          placeholder="הכנס את שם הקטגוריה "
          aria-label="input for category name"
        />

        <Button type="submit" colorScheme="teal">
          הוסף קטגוריה
        </Button>
        </Box>
        
        {message && (
                  <Alert status={messageStatus}>
                    <AlertIcon />
                    {message}
                  </Alert>
                )}
    </>
  );
};

export default AddCategoryForm;
