import { Component } from "react";
import { createBrowserRouter } from "react-router";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
]);
export default router;
