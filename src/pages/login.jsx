import {
  VStack,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  Container,
  FormErrorMessage,
  FormHelperText,
  Flex,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import LoginButton from "../components/Auth0"

import { useCookies } from "react-cookie";
import { useState } from "react";
import { useEffect } from "react";

const emailregex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const passwordregex = /^(?=.*[A-Z]).{6,12}$$/;

const login = () => {
  const [enterdName, setEnteredName] = useState("");
  const [enterdPassword, setEnteredPassword] = useState("");
  const [emailIsError, setEmailIsError] = useState(false);
  const [passwordIsError, setPasswordIsErrorr] = useState(false);
  const [message, setMessage] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  // password validation
  const passwordInputChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    if (passwordregex.test(enterdPassword)) {
      setPasswordIsErrorr(false);
    }
  };
  const passwordInputBlureHandler = (e) => {
    setEnteredPassword(e.target.value);
    setPasswordIsErrorr(!passwordregex.test(enterdPassword));
  };

  //
  // Email Validation
  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
    if (emailregex.test(enterdName)) {
      setEmailIsError(false);
    }
  };

  const nameInputBlureHandler = (e) => {
    setEnteredName(e.target.value);
    setEmailIsError(!emailregex.test(enterdName));
  };

  useEffect(() => {
    if (emailIsError) {
      setMessage("Please enter a valid email");
    } else if (passwordIsError) {
      setMessage(
        "Please enter a valid password (contains at least one uppercase letter and has a length between 6 and 12 characters)"
      );
    } else {
      setMessage("");
    }
  }, [emailIsError, passwordIsError]);

  const submithandler = async (e) => {
    e.preventDefault();
    setEnteredName(email.value);
    setEnteredPassword(password.value);
    setEmailIsError(!emailregex.test(enterdName));
    try {
      if (emailIsError) {
        setMessage("Please enter a valid email");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/managers/login`,
        {
          manager_email: enterdName,
          manager_password: enterdPassword,
        }
      );
      const data = response.data;
      // setLoggedManager(data.manager);
      setCookie("token", data.token, { path: "/", maxAge: 10800 });

      
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container borderRadius={20} mt={20} p={15}>
      <VStack
        rowGap={5}
        borderRadius={20}
        w="90%"
        h="90%"
        bg="gray.200"
        alignItems="self-center"
        p={10}
      >
        <VStack>
          <Heading>Log In</Heading>
          <Text>
            If you dont have an account, <Link>register here</Link>
          </Text>
        </VStack>
        <FormControl>
          <form onSubmit={submithandler}>
            <SimpleGrid rowGap={6} w="full">
              <GridItem colSpan={2}>
                <FormLabel>מייל</FormLabel>
                <Input
                  type="email"
                  id="email"
                  onBlur={nameInputBlureHandler}
                  onChange={nameInputChangeHandler}
                  variant="filled"
                  placeholder="israel"
                  isInvalid={emailIsError}
                />
              </GridItem>
              <GridItem colSpan={2}>
                <FormLabel>סיסמא</FormLabel>
                <Input
                  type="password"
                  id="password"
                  onBlur={passwordInputBlureHandler}
                  onChange={passwordInputChangeHandler}
                  variant="filled"
                  placeholder="israeli"
                  isInvalid={passwordIsError}
                />
              </GridItem>
              <GridItem align="center" colSpan={2}>
                <Button bg="lightblue" type="submit">
                  כניסה
                </Button>
              </GridItem>
              {(emailIsError || passwordIsError || Error) && (
                <Text fontSize="md" color="red">
                  {message}
                </Text>
              )}
              <LoginButton>log in</LoginButton>
            </SimpleGrid>
          </form>
        </FormControl>
      </VStack>
    </Container>
  );
};

export default login;
