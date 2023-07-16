import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FormLabel,
  VStack,
  Container,
  Text,
  SimpleGrid,
  GridItem,
  FormControl,
  Input,
  Button,
  Spinner,
  Heading,
 
  
} from "@chakra-ui/react";



const AddProductForm = ({ categories }) => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    product_name: "",
    product_description: "",
    product_price:"",
    product_image: "",
    categories: [],
  });

  const submithandler=()=>{

  }
  return (
    <>
      <Container borderRadius={20} mt={20} p={15}>
        <VStack
          rowGap={5}
          borderRadius={20}
          w="90%"
          h="90%"
          bg="gray.100"
          alignItems="self-center"
          p={10}
        >
          <VStack>
            <Heading>Add Product</Heading>
          </VStack>
          <FormControl>
            <form onSubmit={submithandler}>
              <SimpleGrid rowGap={6} w="full">
                <GridItem colSpan={2}>
                  <FormLabel>שם המוצר</FormLabel>
                  <Input
                    type="email"
                    id="email"
                    variant="filled"
                    placeholder="israel"
                    isInvalid={emailIsError}
                  />
                </GridItem>
                <GridItem colSpan={2}>
                  <FormLabel>תיאור המוצר</FormLabel>
                  <Input
                    type="email"
                    id="email"
                    variant="filled"
                    placeholder="israel"
                    isInvalid={emailIsError}
                  />
                </GridItem>
                <GridItem colSpan={2}>
                  <FormLabel>מחיר המוצר</FormLabel>
                  <Input
                    type="email"
                    id="email"
                    variant="filled"
                    placeholder="israel"
                    isInvalid={emailIsError}
                  />
                </GridItem>
                <GridItem colSpan={2}>
                    {values.product_image&&(
                        <Image boxSize="80px" src={values.product_image}/>
                          )}
                  <FormLabel> תמונה של המוצר</FormLabel>
                  <Input
                 id="product_image"
                  my="20px"
                type="file"
                 aria-label="input for product image"
                 onChange={handleFileChange}
                />
                  
                </GridItem>
                
                <GridItem colSpan={2}>
                <FormLabel>  בחר קטגוריות של המוצר </FormLabel>
                {}

                    </GridItem>
                  <Button bg="lightblue" type="submit">
                    הוסף מוצר
                  </Button>
                
                {(emailIsError || passwordIsError || Error) && (
                  <Text fontSize="md" color="red">
                    {message}
                  </Text>
                )}
                {loading && (
                  <Spinner
                    alignSelf="center"
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="md"
                  />
                )}
                <LoginButton>log in</LoginButton>
              </SimpleGrid>
            </form>
          </FormControl>
        </VStack>
      </Container>
    </>
  );
};

export default AddProductForm;
