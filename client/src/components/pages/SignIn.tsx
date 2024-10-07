import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Timer from "../ui/Timer";
import { useAppDispatch } from "../../redux/hooks";
import { setMain, setUser } from "../../redux/slices/all/all";

function makePhoneMusk(str: string) {
  let cleanedStr = str.replace(/\D/g, "");

  if (cleanedStr.startsWith("8")) {
    cleanedStr = "8" + cleanedStr.slice(1);
  } else if (cleanedStr.startsWith("7")) {
    cleanedStr = "7" + cleanedStr.slice(1);
  } else if (cleanedStr.length > 0) {
    cleanedStr = "8" + cleanedStr.slice(0);
  }

  const formattedStr = cleanedStr.replace(
    /^(\d)(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/,
    (_, p1, p2, p3, p4, p5) => {
      let result = p1 === "7" || p1 === "8" ? p1 + " " : "";
      if (p2) result += `(${p2}`;
      if (p2.length === 3) result += ") ";
      if (p3) result += p3;
      if (p3.length === 3) result += "-";
      if (p4) result += p4;
      if (p4.length === 2) result += "-";
      if (p5) result += p5;
      return result;
    }
  );

  return formattedStr;
}

function countDigits(str: string) {
  return str.replace(/\D/g, "").length;
}

export default function SignIn(): JSX.Element {
  const logo = `${process.env.PUBLIC_URL}/image/signin/logotypelogin.svg`;
  const googlePlay = `${process.env.PUBLIC_URL}/image/signin/google_play.svg`;
  const apple = `${process.env.PUBLIC_URL}/image/signin/app_store.svg`;

  const dispatch = useAppDispatch();

  const [phoneNum, setPhoneNum] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNum = makePhoneMusk(e.currentTarget.value);
    setPhoneNum(formattedPhoneNum);
  };

  useEffect(() => {
    void dispatch(setMain(false));
  }, []);

  const isFormValid = password.length > 0 && countDigits(phoneNum) === 11;

  return (
    <div className="backForm">
      <Timer />
      <form
        className="formSignIn"
        onSubmit={(e) => {
          e.preventDefault();
          void dispatch(setUser("Алексей Костылев Николаевич"));
        }}
      >
        <img src={logo} alt="logo" className="formSignIn__image" />
        <label htmlFor="phone" className="formSignIn__label">
          <input
            type="tel"
            id="phone"
            value={phoneNum}
            onChange={handleChangePhone}
            placeholder="Введите номер телефона"
            className="formSignIn__input"
            maxLength={17}
          />
        </label>
        <label htmlFor="password" className="formSignIn__label">
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="Введите пароль"
            className="formSignIn__input"
          />
        </label>
        <button
          type="button"
          className="formSignIn__forgot-button"
          onClick={() => alert("Восстановление пароля")}
        >
          Забыли пароль?
        </button>

        <button
          type="submit"
          className="formSignIn__submit-button"
          disabled={!isFormValid}
          style={{ backgroundColor: !isFormValid ? "#e99494" : "" }}
        >
          ВОЙТИ
        </button>

        <div className="mediaFlexDiv">
          <div className="formSignIn__bottomFormLink">
            <p>Если у вас еще нет аккаунта?</p>
            <Link to="/signup" className="formSignIn__link">
              Зарегистрируйтесь
            </Link>
          </div>

          <div className="formSignIn__bottomFormLink">
            <p style={{ marginBottom: "2%" }}>Установите приложение.</p>
            <div className="formSignIn__apk">
              <img src={googlePlay} alt="google play" />
              <img src={apple} alt="app store" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
