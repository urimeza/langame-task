import React from "react";
import useAppRoutes from './customHooks/useAppRouter';
import { RouterProvider } from "react-router-dom";

function App() {

  const routes = useAppRoutes();
  return <RouterProvider router={routes} />;
}

export default App;
