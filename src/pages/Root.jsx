import { Outlet } from "react-router-dom";
import  ManagerNav  from "../components/manager/ManagerNav";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

function Root() {
  const { manager } = useContext(AuthContext);
console.log(manager);
  return (
    <>
      
      {manager&&<ManagerNav/>}
    
      <Outlet />
    </>
  );
}

export default Root;
