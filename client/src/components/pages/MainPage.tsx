import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setMain } from "../../redux/slices/all/all";
import BottomMenu from "../ui/BottomMenu";

export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const logo = `${process.env.PUBLIC_URL}/image/signin/logotypelogin.svg`;
  const transaction = `${process.env.PUBLIC_URL}/image/main/left-menu/transaction.svg`;
  const book = `${process.env.PUBLIC_URL}/image/main/left-menu/book.svg`;
  const seings = `${process.env.PUBLIC_URL}/image/main/left-menu/seings.svg`;
  const support = `${process.env.PUBLIC_URL}/image/main/left-menu/support.svg`;

  const avatar = `${process.env.PUBLIC_URL}/image/main/avatar.svg`;
  const refresh = `${process.env.PUBLIC_URL}/image/main/refresh.svg`;
  const ADS = `${process.env.PUBLIC_URL}/image/main/ADS.svg`;
  const ADS2 = `${process.env.PUBLIC_URL}/image/main/ADS2.svg`;
  const close = `${process.env.PUBLIC_URL}/image/main/close.svg`;

  const { tariffs, user } = useAppSelector((s) => s.all);

  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    void dispatch(setMain(true));
  }, []);
  return (
    <div className="flex mainBack">
      <div
        className="modal-back"
        style={{ display: modal ? "flex" : "none" }}
        onClick={() => setModal(false)}
      >
        <img src={close} alt="close" className="close" />
        <BottomMenu vibleClass={"modal-menu"} />
        <p className="pAbsolute">НАЖМИ В ЛЮБОЕ МЕСТО</p>
      </div>
      <div className="main-menu">
        <div className="main-menu-element" style={{ marginTop: "10%" }}>
          <img src={logo} alt="LANGAME" className="logoMenu" />
        </div>

        <div className="main-menu-element">
          <img src={transaction} alt="transactions" />
          <p>История транзакций</p>
        </div>

        <div className="main-menu-element">
          <img src={book} alt="books" />
          <p>Забронировать</p>
        </div>

        <div className="main-menu-element">
          <img src={seings} alt="seings" />
          <p>Настройки</p>
        </div>

        <div className="main-menu-element">
          <img src={support} alt="support" />
          <p>Поддержка</p>
        </div>

        <div
          className="main-menu-element more-actions"
          onClick={() => setModal(true)}
        >
          <p>. . .</p>
        </div>
      </div>

      <div className="right-panel">
        <div className="flex-row">
          <div className="flex-row-element-left">
            <div className="flex-row-element-left-element user">
              <img src={avatar} className="avatar" alt="avatar" />
              <p>{user}</p>
            </div>

            <div className="flex-row-element-left-element white-back">
              <div className="row-beetween">
                <p>Текущий статус:</p>
                <p className="text-bold">STANDART</p>
              </div>

              <div className="row-beetween">
                <p>До смены статуса осталось:</p>
                <p className="text-bold">10 часов 23 минуты</p>
              </div>
            </div>

            <div className="flex-row-element-left-element white-back">
              <div className="row-beetween" style={{ marginTop: "5%" }}>
                <p>{"Информация о текущей сесии".toUpperCase()}</p>
              </div>

              <div className="row-beetween" style={{ marginTop: "10%" }}>
                <p>Осталось минут:</p>
                <p className="text-bold">120 мин.</p>
              </div>

              <div
                className="row-beetween"
                style={{ marginTop: "3%", paddingBottom: "10%" }}
              >
                <p>Сессия истекает:</p>
                <p className="text-bold" style={{ marginTop: "3%" }}>
                  14.12.2020, 20:24
                </p>
              </div>
            </div>

            <div className="flex-row-element-left-element white-back">
              <div className="row-beetween mb-5" style={{ marginTop: "0%" }}>
                <p>{"Основной счет".toUpperCase()}</p>
                <img
                  src={refresh}
                  alt="refresh"
                  style={{ cursor: "pointer" }}
                  className="refresh"
                />
              </div>

              <div className="balance-actions">
                <div className="balance-info">
                  <p style={{ fontWeight: "700", fontSize: "2em" }}>15 000 ₽</p>
                  <div
                    className="balance-info-bonuse"
                    style={{ marginLeft: "3%" }}
                  >
                    <div className="dop-balance">
                      <p style={{ textAlign: "left" }}>
                        <strong>1200</strong> ₽
                      </p>
                      <p>Бонусный счет</p>
                    </div>
                  </div>
                </div>

                <div className="balance-button-donate">ПОПОЛНИТЬ</div>
              </div>
            </div>

            <div className="flex-row-element-left-element imgBack">
              <img src={ADS} className="left-ADS ADSL" alt="ADS" />
            </div>

            <div className="flex-row-element-left-element imgBack">
              <img src={ADS2} className="left-ADS ADSR" alt="ADS" />
            </div>
          </div>

          <div className="flex-row-element-tariff">
            <div
              className="tariff-element"
              style={{ color: "white", fontWeight: "700" }}
            >
              <p>{"Тарифы,  доступные на данном ПК".toUpperCase()}</p>
            </div>
            {tariffs.map((el) => {
              return (
                <div className="tariff-element" key={el.id}>
                  <p>{el.name}</p>
                  <p className="tariff-price">{`${el.price} ₽`}</p>
                </div>
              );
            })}
          </div>
        </div>
        <BottomMenu vibleClass={"bottom-menu"} />
      </div>
    </div>
  );
}
