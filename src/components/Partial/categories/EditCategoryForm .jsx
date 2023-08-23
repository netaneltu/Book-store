import React from "react";
import {useEffect, useState } from "react";
import {
  FormLabel,
  Input,
  Button,
  Spinner,
  Heading,
  Box,
  Alert,
  AlertIcon,
  Spacer
} from "@chakra-ui/react";
import axios from "axios";

const EditCategoryForm = (categoryData) => {
  console.log(categoryData.categoryId);
  const [values, setValues] = useState({
    category_name: "",
    category_Id: "",
    subcategories: [],
  });

  const [message, setMessage] = useState("");
  const [messageStatus, setMessageStatus] = useState();

  useEffect(() => {
    const getCategoryById = async () => {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_SERVER_URL
          }/categories/managers/get-by-id/${categoryData.categoryId}`
        );
        console.log(data);
        setValues(data.category);
      
      } catch (e) {
        console.log("error");
        
      }
    };
    getCategoryById();
  }, []);

  const updateSubCategory= async(e)=>{
    e.preventDefault();
     console.log(e.target.id);
    try {
      const subCat = await axios.put(
        `${
          import.meta.env.VITE_SERVER_URL
        }/categories/managers/update-subcategory/${e.target.id}`,
        { category_name: e.target.value }
      );
      setMessage("קטגוריה עודכנה בהצלחה");
      setMessageStatus("success");
    } catch (error) {
      setMessageStatus("error");
      setMessage("אנא מלא שם לקטגוריה");
    }


  }
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const cat = await axios.put(
        `${
          import.meta.env.VITE_SERVER_URL
        }/categories/managers/update-category/${categoryData.categoryId}`,
        { category_name: values.category_name }
      );
      setMessage("קטגוריה עודכנה בהצלחה");
      setMessageStatus("success");
      console.log(values);
    } catch (error) {
      console.log(error.response);
      setMessageStatus("error");
      setMessage("אנא מלא שם לקטגוריה");
    }
  };

  
  return (
    <>
      <Heading mb={"20px"}> ערוך קטגוריה</Heading>

      <Box onSubmit={handleSubmit} as="form">
        <FormLabel> {`שם הקטגוריה: ${values.category_name}`} </FormLabel>

        <Input
          onChange={(e) => {
            setValues({...values,category_name: e.target.value});
          }}
          id="category_name"
          my="20px"
          placeholder={values.category_name}
          aria-label="input for category name"
        /><FormLabel> תתי קטגוריה </FormLabel>
        {values.subcategories.map((c)=>{
          
          return(<>
          
            <Input
            onBlur={updateSubCategory} 
          // onChange={(e) => {
          //   let Index= index
          //   setValues({...values,[subcategories[Index].category_name]:e.target.value})
            
          // }}
          id={c._id}
          
          my="20px"
          placeholder={ c.category_name}
          aria-label="input for subCategory name"
          mr="20px"
                  />
           </>
          )
        })}

        <Button mb={5} type="submit" colorScheme="teal">
          ערוך קטגוריה
        </Button>
        {message && (
                  <Alert borderRadius={5} status={messageStatus}>
                    <AlertIcon />
                    {message}
                  </Alert>
                )}
      </Box>
    </>
  );
};

export default EditCategoryForm;
