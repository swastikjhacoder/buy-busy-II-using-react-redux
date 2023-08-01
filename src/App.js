import React from "react";
import Home from "./pages/home/Home";
import Navbar from "./components/Navbar";
import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";
import Cart from "./pages/cart/Cart";
import MyOrder from "./pages/myorder/MyOrder";
import productData from "./api/contents";
import { 
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration 
} from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Navbar/>
      <ScrollRestoration />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        path: "/",
        element: <Home />,
        loader: productData
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/myorder",
        element: <MyOrder />
      },
      {
        path: "/signin",
        element: <SignIn />
      },
      {
        path: "/signup",
        element: <SignUp />
      }
    ]
  }
])

function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
