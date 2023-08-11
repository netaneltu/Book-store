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
import Dashboard from "./pages/private/Dashboard";
import Products from "./pages/private/Products/Products";
import Orders from "./pages/private/Orders/Orders";
import Users from "./pages/private/Users/Users";
import AddProduct from "./pages/private/Products/AddProduct";
import AddCategory from "./pages/private/Categories/AddCategory";
import EditCategory from "./pages/private/Categories/EditCategory";
import EditProduct from "./pages/private/Products/EditProduct";
import Categories from "./pages/private/Categories/Categories";

import { ChakraProvider } from "@chakra-ui/react";
import PriveateRoutes from "./utils/PrivateRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route index element={<Login />} />

      <Route element={<PriveateRoutes />}>
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="products">
          <Route index element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit" element={<EditProduct />} />
        </Route>

        <Route path="categories">
          <Route index element={<Categories />} />
          <Route path="/categories/add" element={<AddCategory />} />
          <Route path="/categories/edit" element={<EditCategory />} />
        </Route>

        <Route path="users">
          <Route index element={<Users />} />
        </Route>

        <Route path="orders">
          <Route element={<Orders />} />
        </Route>
      </Route>
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
