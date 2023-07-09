
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import Nav from "../components/Nav";
import { AuthContext } from "../context/AuthContextProvider";

function Root() {
  // const { manager } = useContext(AuthContext);

  return (
    <>
      {/* <Nav /> */}
      <Outlet />
    </>
  );
}

export default Root;

