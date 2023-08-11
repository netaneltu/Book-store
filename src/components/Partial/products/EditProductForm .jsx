import React from "react";
import { useState } from "react";
import {
  VStack,
  Container,
  Text,
  SimpleGrid,
  GridItem,
  FormControl,
  Spinner,
  Image,
  Select,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  AlertIcon,
  Alert,
  FormLabel,
  Input,
  Button,
  Heading,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";

const EditProductForm = (productId) => {
  console.log(productId.productData);
  
  
  
  const [values, setValues] = useState({
    product_name: "",
    product_description: "",
    product_price: "",
    product_image: [],
    categories: [],
  });
  const [message, setMessage] = useState();
  const [messageStatus, setMessageStatus] = useState();
  const [categories, setCategories] = useState([]);
  
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
  
  useEffect(() => {
    const getProductById = async () => {
      try {
        const { data } = await axios.get(
          `${
            import.meta.env.VITE_SERVER_URL
          }/products/managers/by_id/${productId.productData}`
        );
        console.log(data);
        setValues(data.product);
        
      } catch (error) {
        console.log(error);
      }
    };
    getProductById();
  }, []);

  console.log(values);
  const handleChangeCategory = (e) => {
    const obj = JSON.parse(e.target.value);
    const check = values.categories.some((c) => c.id == obj.id);

    if (!check) {
      setValues({
        ...values,
        categories: [...values.categories, { id: obj.id, name: obj.name }],
      });
    }
  };

  const handleChangeInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleFileChange = (event) => {
    const files = event.target.files;
    console.log(files);
    let file;
    let base64String = [];
    for (let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      file = files[i];
      console.log(file);
      reader.onloadend = (file) => {
        base64String[i] = reader.result;
        console.log(base64String);
        setValues({ ...values, product_image: base64String });
      };
      reader.readAsDataURL(file);
    }
  };
  console.log(values.product_image);
  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/products/managers/update/${productId.productData}`,
        {
          product_name: values.product_name,
          product_description: values.product_description,
          product_price: values.product_price,
          product_image: values.product_image,
          categories: JSON.stringify(values.categories),
        }
      );

      setMessage("פרטי המוצר עודכנו בהצלחה");
      setMessageStatus("success");
    } catch (error) {
      console.log(error.response);
      setMessageStatus("error");
      setMessage("אנא מלא את כל הפרטים של המוצר");
    }
  };

  console.log(values.categories);

  
  return (

    <>
     
      <>
        <Container borderRadius={20} mt={20} p={15}>
          <VStack
            rowGap={5}
            borderRadius={20}
            // w="90%"
            h="90%"
            bg="gray.200"
            alignItems="self-center"
            p={10}
          >
            <VStack>
              <Heading>ערוך מוצר</Heading>
            </VStack>
            <FormControl>
              <form id="myForm">
                <SimpleGrid rowGap={6}>
                  <GridItem colSpan={1}>
                    <FormLabel>שם המוצר</FormLabel>
                    <Input
                      onChange={handleChangeInput}
                      type="text"
                      id="product_name"
                      name="product_name"
                      variant="filled"
                      value={values.product_name}
                      // isInvalid={emailIsError}
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormLabel>תיאור המוצר</FormLabel>
                    <Input
                      onChange={handleChangeInput}
                      type="text"
                      id="product_description"
                      name="product_description"
                      variant="filled"
                      value={values.product_description}
                      // isInvalid={emailIsError}
                    />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormLabel>מחיר המוצר</FormLabel>
                    <Input
                      onChange={handleChangeInput}
                      type="number"
                      id="product_price"
                      name="product_price"
                      variant="filled"
                      value={values.product_price}
                    />
                  </GridItem>
                  <FormLabel> תמונות של המוצר</FormLabel>
                  <HStack>
                    {values.product_image.map((image) => {
                      return (
                        <GridItem colSpan={1}>
                          <Image boxSize="90px" src={image} />
                        </GridItem>
                      );
                    })}
                  </HStack>
                  {/* <GridItem colSpan={1}>
                  {values.product_image && (
                    <Image boxSize="80px" src={values.product_image[0]} />
                  )}
                  </GridItem> */}
                  <Input
                    id="product_image"
                    my="20px"
                    type="file"
                    variant="filled"
                    multiple
                    aria-label="input for product image"
                    onChange={handleFileChange}
                  />
                  {/* </GridItem> */}

                  {values.categories.length ? (
                    <>
                      <Heading fontSize="lg">קטגוריות שנבחרו: </Heading>

                      <HStack spacing={2}>
                        {values.categories.map((c) => {
                          return (
                            <Tag
                              size={"md"}
                              key={c.id}
                              borderRadius="full"
                              variant="solid"
                              colorScheme="blackAlpha"
                            >
                              <TagLabel>{c.name}</TagLabel>
                              <TagCloseButton
                                onClick={() => {
                                  const updatedSelectedCategories =
                                    values.categories.filter((category) => {
                                      return category.id !== c.id;
                                    });

                                  setValues({
                                    ...values,
                                    categories: updatedSelectedCategories,
                                  });
                                }}
                              />
                            </Tag>
                          );
                        })}
                      </HStack>
                    </>
                  ) : (
                    <Text> לא נבחרו קטגוריות</Text>
                  )}

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
                  <Button
                    onClick={submithandler}
                    maxW={["70%", "80%", "90%", "100%"]}
                    bg="lightblue"
                    type="submit"
                  >
                    שמור שינויים
                  </Button>
              
                {message && (
                  <Alert status={messageStatus}>
                    <AlertIcon />
                    {message}
                  </Alert>
                )}
                </SimpleGrid>
              </form>
            </FormControl>
          </VStack>
        </Container>
      </>

     
    </>
  );
};

export default EditProductForm;
