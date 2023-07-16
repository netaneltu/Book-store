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

  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>שם הקטגוריה</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((category) => {
              return (
                <Tr key={category._id}>
                  <Td>{category.category_name}</Td>
                  <Td>
                    <Button
                      onClick={() => {
                        handleDeleteCategory(category._id);
                      }}
                    >
                      DELETE🗑
                    </Button>
                  </Td>
                  <Td>
                    <Button>EDIT🖊</Button>
                  </Td>
                  <Td></Td>
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
