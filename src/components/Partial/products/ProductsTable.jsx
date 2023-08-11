import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  TableContainer,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RiEditLine,RiDeleteBin6Line } from "react-icons/ri";

const ProductsTable = ({ productsData }) => {
  console.log(productsData);
  const [products, setProducts] = useState([...productsData]);
  const navigate = useNavigate();

  useEffect(() => {
    setProducts([...productsData]);
  }, [productsData]);

  const handleDeleteProduct = async (id) => {
    try {
       axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/products/managers/delete/${id}`
      );
      const updatedProducts = products.filter((c) => {
        if (c._id !== id) {
          return c;
        }
      });
      setProducts(updatedProducts);
    } catch (error) {}
  };

  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th fontSize={20}>שם המוצר</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product) => {
              return (
                <Tr key={product._id}>
                  <Td>{product.product_name}</Td>
                  <Flex w={100}>
                    <Td>
                      <Button
                        onClick={() => {
                          handleDeleteProduct(product._id);
                        }}
                        leftIcon={<RiDeleteBin6Line />} colorScheme='red' variant='solid'
                      >
                        DELETE
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        onClick={() => {
                          navigate("/products/edit", {
                            state: product._id,
                          });
                        }}
                        leftIcon={<RiEditLine />} colorScheme={'blue'} variant='solid'
                      >
                        EDIT
                      </Button>
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

export default ProductsTable;
