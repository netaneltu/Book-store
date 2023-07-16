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

const CategoriesTable = ({CategoriesData}) => {
    console.log(CategoriesData);
    const [categories, setCategories] = useState([...CategoriesData]);
    console.log(...CategoriesData);
    console.log([...CategoriesData]);
    console.log(categories);
    

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
                      <Button>DELETE🗑</Button>
                    </Td>
                    <Td>
                      <Button>EDIT🖊</Button>
                    </Td>
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
