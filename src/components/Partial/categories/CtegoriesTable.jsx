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
  TableCaption,
  Heading,
  TableContainer,
  HStack,
  Wrap,
  Flex,
  Spacer,
  Box,
  Center,
  Button,
  Text
} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RiEditLine, RiDeleteBin6Line } from "react-icons/ri";
import allCategoris from "../../../hooks/allCategoris";

const CategoriesTable = () => {
  const allCategorisArray=allCategoris()
  const [categories, setCategories] = useState(allCategoris());

  const navigate = useNavigate();

  useEffect(() => {
    setCategories(allCategorisArray);
  }, []);

  const alertFunction = (id, name, type) => {
    if (confirm(`האם אתה בטוח שאתה רוצה למחוק את הקטגוריה ${name} לצמיתות?`)) {
      if (type == "Cat") {
        handleDeleteCategory(id);
      } else if (type == "subCat") {
        handleDeleteSubcategory(id);
      }
      location.reload()
    } else {
      console.log("canceled");
    }

  };

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
  const handleDeleteSubcategory = async (id) => {
    try {
      axios.delete(
        `${
          import.meta.env.VITE_SERVER_URL
        }/categories/managers/delete-subcategory/${id}`
      );
      
      setCategories(updatedCategories);
      
    } catch (error) {}
  };
  return (
    <>
      <TableContainer>
        <Table variant={"simple"} br={20}>
          <Thead>
            <Tr>
              <Th fontSize={20}>שם הקטגוריה</Th>
            </Tr>
          </Thead>
          <Tbody>
            {allCategorisArray.map((category) => {
              console.log(category);
              return (
                <>
                  <Tr  key={category._id}>
                    <Td fontSize={25}><Text as='u' >{category.category_name}</Text></Td>

                    <Flex w={100}>
                      <Td>
                        <Button
                          onClick={() => {
                            alertFunction(
                              category._id,
                              category.category_name,
                              "Cat"
                            );
                            <Alert variant="outlined" severity="error">
                              This is an error alert — check it out!
                            </Alert>;
                          }}
                          leftIcon={<RiDeleteBin6Line />}
                          colorScheme="red"
                          variant="solid"
                        >
                          DELETE
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          onClick={() => {
                            navigate("/categories/edit", {
                              state: category._id,
                            });
                          }}
                          leftIcon={<RiEditLine />}
                          colorScheme={"blue"}
                          variant="solid"
                        >
                          EDIT
                        </Button>
                      </Td>
                    </Flex>
                  </Tr>
                    <Flex  w={100}>
                  <Table mr="40px">
                      {category.subcategories.map((sub_c) => {
                        return (
                          <>
                            <Tr>
                              <Td mr="15px" fontSize={15}>
                                {sub_c.category_name}
                              </Td>
                              <Td>
                                <Button
                                  onClick={() => {
                                    alertFunction(
                                      sub_c._id,
                                      sub_c.category_name,
                                      "subCat"
                                    );
                                  }}
                                  leftIcon={<RiDeleteBin6Line />}
                                  colorScheme="red"
                                  variant="solid"
                                >
                                  DELETE
                                </Button>
                              </Td>
                            </Tr>
                          </>
                        );
                      })}
                  </Table>
                    </Flex>
                </>
              );
            })}
          </Tbody>
        </Table>
        {/* {warningAlert && (
          <Flex mt={5} justifyContent="center" w="100">
            <ThemeProvider Height="20px" width="30px" theme={theme}>
              <Alert
                action={
                  <>
                    <Button class="button" >
                      כן
                    </Button>
                    <Button class="button">
                      לא
                    </Button>
                  </>
                }
                variant="filled"
                severity="warning"
              >
                האם אתה בטוח שאתה רוצה למחוק את הקטגוריה לצמיתות?
              </Alert>
            </ThemeProvider>
          </Flex>
        )} */}
      </TableContainer>
    </>
  );
};

export default CategoriesTable;
