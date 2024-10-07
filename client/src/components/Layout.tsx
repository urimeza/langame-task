import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./ui/Footer";
import Loader from "./HOC/Loader";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setLoad } from "../redux/slices/all/all";

export default function Layout(): JSX.Element {
  const back = `${process.env.PUBLIC_URL}/image/elementsbackground.png`;
  const { load } = useAppSelector((s) => s.all);
  const dispath = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      void dispath(setLoad());
    }, 800);
  }, []);

  return (
    <>
      <Loader loading={load}>
        <>
          <img src={back} alt="back" className="backgroundImg" />
          <Outlet />
          <Footer />
        </>
      </Loader>
    </>
  );
}
