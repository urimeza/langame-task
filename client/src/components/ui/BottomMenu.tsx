import React from "react";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/slices/all/all";

export default function BottomMenu({
  vibleClass,
}: {
  vibleClass: string;
}): JSX.Element {
  const device = `${process.env.PUBLIC_URL}/image/main/bottom-menu/device.svg`;
  const selectGame = `${process.env.PUBLIC_URL}/image/main/bottom-menu/selectGame.svg`;
  const problem = `${process.env.PUBLIC_URL}/image/main/bottom-menu/problem.svg`;
  const session = `${process.env.PUBLIC_URL}/image/main/bottom-menu/session.svg`;
  const logOut = `${process.env.PUBLIC_URL}/image/main/bottom-menu/logOut.svg`;
  const dispatch = useAppDispatch();

  return (
    <div className={vibleClass}>
      <div
        className="bottom-menu-element"
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: "#F6FBFF" }}
      >
        <img src={device} alt="PC" />
        <p>{"вернутся на рабочий стол".toUpperCase()}</p>
      </div>
      <div
        className="bottom-menu-element"
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: "#F8F0FF" }}
      >
        <img src={selectGame} alt="[]" />
        <p>{"выбрать игру".toUpperCase()}</p>
      </div>
      <div
        className="bottom-menu-element"
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: "#FFFEEE" }}
      >
        <img src={problem} alt="!" />
        <p>{"сообщить о проблеме".toUpperCase()}</p>
      </div>
      <div
        className="bottom-menu-element"
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: "#F0FFF9" }}
      >
        <img src={session} alt=">" />
        <p>{"Продлить сессию".toUpperCase()}</p>
      </div>
      <div
        className="bottom-menu-element"
        style={{ backgroundColor: "#FFEDED" }}
        onClick={(e) => {
          e.stopPropagation()
          void dispatch(setUser(null));
        }}
      >
        <img src={logOut} alt="!" />
        <p>{"завершить сессию".toUpperCase()}</p>
      </div>
    </div>
  );
}
