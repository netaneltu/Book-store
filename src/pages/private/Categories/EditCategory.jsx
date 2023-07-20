import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Container } from "@chakra-ui/react";
import EditCategoryForm from "../../../components/Partial/categories/EditCategoryForm ";

const EditCategory = () => {
  const { state } = useLocation();

  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    const getCategoryById = async () => {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_SERVER_URL
          }/categories/managers/get-by-id/${state}`
        );
          console.log(data);
        setCategoryData(data.category);
      
      } catch (e) {
        console.log("error");
      }
    };
    getCategoryById();
  }, []);
  
  return (
    <>
      <Container
        maxW={["98%", "87%", "80%", "70%", "45%"]}
        mt={["10vh", "10vh", "3vh"]}
        minH="70vh"
      >
        

        <EditCategoryForm categoryData={categoryData} />
      </Container>
    </>
  );
};

export default EditCategory;
