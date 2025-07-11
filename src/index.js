import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import TaskDetails from "./components/TaskDetails/TaskDetails";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/tasks/api/:id", element: <TaskDetails /> },
  { path: "/tasks/custom/:id", element: <TaskDetails /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
