import React, { useState, useEffect } from "react";

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
  Image,
  Heading,
  Select,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  AlertIcon,
  Alert,
  Textarea,
} from "@chakra-ui/react";
import allSubCategoris from "../../../hooks/allSubCategoris";
import allCategoris from "../../../hooks/allCategoris";
import axios from "axios";

const AddProductForm = ({ categoriesData }) => {
  const allSubCategorisArray = allSubCategoris();
  const allCategorisArray = allCategoris();

  console.log(categoriesData);
  const [values, setValues] = useState({
    product_name: "",
    product_description: "",
    product_price: "",
    product_image: [],
    categories: [],
  });
  const [message, setMessage] = useState();
  const [messageStatus, setMessageStatus] = useState();

  

  const handleChangeCategory = (e) => {
    const obj = JSON.parse(e.target.value);
    const check = values.categories.some((c) => c.id == obj.id);
    console.log(obj);

    if (!check) {
      setValues({
        ...values,
        categories: [
          ...values.categories,
          { id: obj.id, name: obj.name, parent: obj.parent },
        ],
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
  
  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/products/managers/add`,
        {
          product_name: values.product_name,
          product_description: values.product_description,
          product_price: values.product_price,
          product_image: values.product_image,
          categories: JSON.stringify(values.categories),
        }
      );

      setMessage("המוצר נוסף בהצלחה!");
      setMessageStatus("success");
    } catch (error) {
      console.log(error.response);
      setMessageStatus("error");
      setMessage("אנא מלא את כל הפרטים של המוצר");
    }
  };
  const clearInput = () => {
    setValues({
      product_name: "",
      product_description: "",
      product_price: "",
      product_image: [],
      categories: [],
    });
    document.getElementById("myForm").reset();
    setMessage(null);
  };
  console.log(values.categories);
  return (
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
            <Heading>הוסף מוצר</Heading>
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
                    placeholder="הזן את שם המוצר"
                    // isInvalid={emailIsError}
                  />
                </GridItem>
                <GridItem height="100px" colSpan={1}>
                  <FormLabel>תיאור המוצר</FormLabel>
                  <Textarea
                    height="80px"
                    onChange={handleChangeInput}
                    type="text"
                    id="product_description"
                    name="product_description"
                    variant="filled"
                    placeholder="הזן תיאור המוצר"
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
                    placeholder="הזן מחיר המוצר"
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
                  {allSubCategorisArray.map((category) => {
                    return (
                      <option
                        key={category._id}
                        value={JSON.stringify({
                          id: category._id,
                          name: category.category_name,
                          parent: category.parent_category,
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
                  הוסף מוצר
                </Button>
                {message === "המוצר נוסף בהצלחה!" ? (
                  <Button onClick={clearInput}>הוסף מוצר נוסף</Button>
                ) : null}
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
  );
};

export default AddProductForm;
