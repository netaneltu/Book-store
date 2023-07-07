
import {
  Box,
  Flex,
  Text,
  Link,
  Button,
  Image,
  Input,
  IconButton,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useState } from "react";
import { ImMenu } from "react-icons/im";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContextProvider";
import { useCookies } from "react-cookie";
import { BiSearchAlt } from "react-icons/bi";
import { BsFillPersonFill, BsEnvelopeAtFill } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";

import { Link as rl } from "react-router-dom";

const Nav = () => {
  // const { manager, setManager } = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/managers/logout`
      );

      toast.success(data.message, {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
      });

      setTimeout(() => {
        removeCookie("token");
        setManager(null);
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error, {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
      });
    }
  };

  const logFun = () => {
    console.log("hi");
  };

  return (
    <div>
      <Box
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        color={[isOpen ? "white" : "black"]}
        fontSize={50}
        pos="fixed"
        left={2.5}
        top={2.5}
        display={["flex", "none", "none"]}
      >
        <ImMenu />
      </Box>
      <Flex
        as="nav"
        align="center"
        justifyContent="center"
        gap={5}
        padding={4}
        bg="#DEB887"
        color="white"
        display={[isOpen ? "flex" : "none", "flex", "flex"]}
        direction={["row-reverse", "row", "row"]}
        mt={[20, 0, 0]}
      >
        <Box as={rl} to="/home" justifyContent="center" boxSize="5rem">
          <Image src="../../public/open-book.png" />
        </Box>
        <Box w={[100, 300, 400]} maxW="30rem">
          <Input
            borderColor="gray.800"
            borderWidth={2}
            color="black"
            placeholder="מה תרצו לקנות?"
          />
        </Box>
        <Box as="button" onClick={logFun}>
          <BiSearchAlt size="2rem"></BiSearchAlt>
        </Box>
        <Box as={rl} to="/account">
          <BsFillPersonFill size="2rem"></BsFillPersonFill>
        </Box>
        <Box as={rl} to="/cart">
          <AiOutlineShoppingCart size="2rem"></AiOutlineShoppingCart>
        </Box>
        <Box as={rl} to="/mail">
          <BsEnvelopeAtFill size="2rem"></BsEnvelopeAtFill>
        </Box>
      </Flex>
    </div>
  );
};

export default Nav;

