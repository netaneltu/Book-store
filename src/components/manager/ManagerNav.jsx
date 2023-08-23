import { Box, Flex, Link, Button, Image, Input } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { ImMenu } from "react-icons/im";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContextProvider";
import { useCookies } from "react-cookie";
import { BiLogOut } from "react-icons/bi";
import { BsFillPersonFill, BsEnvelopeAtFill } from "react-icons/bs";

import { Link as rl } from "react-router-dom";

const ManagerNav = () => {
  // const { manager, setManager } = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies("token");

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/managers/logout`,
        {
         cookies:JSON.stringify(cookies) 
        },
        );
      
      removeCookie("token", { path: "/" });
      console.log("hi");
    } catch (error) {
      console.log(error);
    }
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
        bg="#E8DBC9"
        color="black"
        display={[isOpen ? "flex" : "none", "flex", "flex"]}
        direction={["row-reverse", "row", "row"]}
        mt={[20, 0, 0]}
      >
        <Box as={rl} to="/home" justifyContent="center" boxSize="5rem">
          <Image src="../../public/open-book.png" />
        </Box>
        <Box>
          <Link href="/products">מוצרים</Link>
        </Box>
        <Box>
          <Link href="/products/add">הוסף מוצר</Link>
        </Box>
        <Box>
          <Link href="/categories"> קטגוריות</Link>
        </Box>
        <Box>
          <Link href="/categories/add">הוסף קטגוריה</Link>
        </Box>
        <Box>
          <Link href="/users">משתמשים</Link>
        </Box>
        <Box>
          <Link href="/orders">הזמנות</Link>
        </Box>

        <Box as={rl} to="/account">
          <BsFillPersonFill size="2rem"></BsFillPersonFill>
        </Box>

        <Box as={rl} to="/mail">
          <BsEnvelopeAtFill size="2rem"></BsEnvelopeAtFill>
        </Box>
        <Box as="button" onClick={handleLogout}>
          <BiLogOut size="2rem"></BiLogOut>
        </Box>
      </Flex>
    </div>
  );
};

export default ManagerNav;
