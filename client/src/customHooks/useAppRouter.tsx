import React, { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import PrivateRoute from "../components/HOC/PrivateRoute";
import { useAppSelector } from "../redux/hooks";
import Loader from "../components/HOC/Loader";

// Ленивая загрузка компонентов
const MainPage = lazy(() => import("../components/pages/MainPage"));
const SignIn = lazy(() => import("../components/pages/SignIn"));
const SignUp = lazy(() => import("../components/pages/SignUp"));

function useAppRouter(): ReturnType<typeof createBrowserRouter> {
  const { user } = useAppSelector((s) => s.all);

  return createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          element: <PrivateRoute isAllowed={!!user} redirect="/signin" />,
          children: [
            {
              path: "/",
              element: (
                <Suspense
                  fallback={
                    <Loader loading={true}>
                      <></>
                    </Loader>
                  }
                >
                  <MainPage />
                </Suspense>
              ),
            },
          ],
        },
        {
          element: <PrivateRoute isAllowed={!user} redirect="/" />,
          children: [
            {
              path: "/signin",
              element: (
                <Suspense
                  fallback={
                    <Loader loading={true}>
                      <></>
                    </Loader>
                  }
                >
                  <SignIn />
                </Suspense>
              ),
            },
            {
              path: "/signup",
              element: (
                <Suspense
                  fallback={
                    <Loader loading={true}>
                      <></>
                    </Loader>
                  }
                >
                  <SignUp />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
  ]);
}

export default useAppRouter;
