import React from "react";
import {
  Container,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  TableCaption,
  Heading,
  TableContainer,
  HStack,
  Wrap,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const CategoriesTable = ({ categoriesData }) => {
  const [categories, setCategories] = useState([...categoriesData]);

  useEffect(() => {
    setCategories([...categoriesData]);
  }, [categoriesData]);

  const handleDeleteCategory = async (id) => {
    try {
      axios.delete(
        `${
          import.meta.env.VITE_SERVER_URL
        }/categories/managers/delete-category/${id}`
      );
      const updatedCategories = categories.filter((c) => {
        if (c._id !== id) {
          return c;
        }
      });
      setCategories(updatedCategories);
    } catch (error) {}
  };

  const HandelEditCategory=()=>{
    console.log("edit category")
    
  }

  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th fontSize={20}>שם הקטגוריה</Th> 
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((category) => {
              return (
                <Tr key={category._id}>
                  <Td>{category.category_name}</Td>
                  <Flex w={100}>
                  <Td>
                    <Button
                      onClick={() => {
                        handleDeleteCategory(category._id);
                      }}
                    bg={"red.300"}>
                      DELETE🗑
                    </Button>
                  </Td>
                  <Td>
                    <Button  onClick={() => {
                        HandelEditCategory(category._id);
                      }} bg={"blue.300"}>EDIT🖊</Button>
                  </Td>
                  </Flex>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CategoriesTable;
