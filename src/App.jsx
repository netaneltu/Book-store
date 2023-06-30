import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Root from "./pages/Root";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import { ChakraProvider } from "@chakra-ui/react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route index element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />

      {/* <Route element={<PriveateRoutes />}> */}
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      {/* </Route> */}
    </Route>
  )
);

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
