import React, { useEffect, useRef } from "react";
import Timer from "../ui/Timer";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  setFio,
  setPhoneNum,
  setBirthday,
  setDocumentType,
  setDocumentNumber,
  setPassword,
  setConfirmPassword,
  toggleShowPassword,
  toggleShowConfirmPassword,
  setAgreedToNewsletter,
} from "../../redux/slices/signup/signup";
import { Link } from "react-router-dom";
import { setMain, setUser } from "../../redux/slices/all/all";

function formatDockNumber(str: string) {
  console.log(str);

  if (str.length > 1 && str.length !== 2) {
    const cleanedStr = str.replace(/\D/g, "");
    const formattedStr = `${cleanedStr.slice(0, 2)}№${cleanedStr.slice(2)}`;
    return formattedStr;
  } else if (str.length === 2) {
    return str[0] + str[1];
  }
}

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

export default function SignUp(): JSX.Element {
  const vector = `${process.env.PUBLIC_URL}/image/signup/Vector.svg`;
  const yes = `${process.env.PUBLIC_URL}/image/signup/yes.svg`;
  const no = `${process.env.PUBLIC_URL}/image/signup/no.svg`;
  const user = `${process.env.PUBLIC_URL}/image/signup/user.svg`;

  const dispatch = useAppDispatch();

  const birthdayInputRef = useRef<HTMLInputElement>(null);

  const handleChange =
    (setter: Function) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

    useEffect(() => {
      void dispatch(setMain(false));
    }, []);

  const {
    fio,
    phoneNum,
    birthday,
    documentType,
    documentNumber,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    agreedToNewsletter,
    fioError,
    phoneError,
    birthdayError,
    documentError,
    passwordError,
    documentTypeError,
  } = useAppSelector((state) => state.signup);

  const isFormValid = () => {
    return (
      !fioError &&
      !phoneError &&
      !birthdayError &&
      !documentError &&
      !passwordError &&
      fio &&
      phoneNum &&
      birthday &&
      documentType &&
      documentNumber &&
      password &&
      confirmPassword &&
      agreedToNewsletter
    );
  };

  return (
    <div className="backFormSignUp">
      <Timer />
      <div className="signUpFormdiv">
        <form
          className="formSignup"
          onSubmit={(e) => {
            e.preventDefault();
            if (isFormValid()) void dispatch(setUser(fio));
          }}
        >
          <p className="formSignup__title">Регистрация</p>

          <div className="variatActions">
            <button
              type="button"
              className="formSignup__fullReg buttonActionReg"
            >
              ПОЛНАЯ
              <img src={`${process.env.PUBLIC_URL}/image/signup/info.svg`} alt="" />
            </button>
            <button
              type="button"
              className="formSignup__simpleReg buttonActionReg"
            >
              УПРОЩЕННАЯ
            </button>
          </div>

          <div className="mainFormSignUp">
            <div className="formSignUp__label">
              <div className="inputIconsFio">
                <img src={user} alt="" />
                <img
                  src={fioError ? no : yes}
                  className="checkedInput"
                  alt=""
                />
              </div>
              {fioError && <span className="error-messageFIO">{fioError}</span>}
              <input
                type="text"
                id="FIO"
                value={fio}
                onChange={handleChange((value: string) =>
                  dispatch(setFio(value))
                )}
                placeholder=" "
                className={`formSignUp__input fioInput ${
                  fioError ? "input-invalid" : "input-valid"
                }`}
              />
              <label htmlFor="FIO" className="floating-placeholder">
                ФИО
              </label>
            </div>

            <div className="formSignUp__rowTwoInputs">
              <div className="formSignUp__labelTwo">
                <div className="inputIcons">
                  <img
                    src={`${process.env.PUBLIC_URL}/image/signup/telephone.svg`}
                    alt=""
                  />
                  <img
                    src={phoneError ? no : yes}
                    className="checkedInput"
                    alt=""
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  id="PhoneNumber"
                  value={phoneNum}
                  onChange={handleChange((value: string) =>
                    dispatch(setPhoneNum(makePhoneMusk(value)))
                  )}
                  maxLength={17}
                  placeholder=" "
                  className={`formSignUp__input inputsTwo noFioInput ${
                    phoneError ? "input-invalid" : "input-valid"
                  }`}
                />
                <label
                  htmlFor="PhoneNumber"
                  className="floating-placeholder more"
                >
                  Номер телефона
                </label>
                {phoneError && (
                  <span className="error-message">{phoneError}</span>
                )}
              </div>

              <div className="formSignUp__labelTwo">
                <div className="inputIcons">
                  <img
                    src={`${process.env.PUBLIC_URL}/image/signup/Calendar.svg`}
                    alt=""
                  />
                  <img
                    src={birthdayError ? no : yes}
                    className="checkedInput"
                    alt=""
                  />
                </div>
                <div
                  className="birthday-container"
                  onClick={() => birthdayInputRef.current?.showPicker()}
                >
                  <input
                    type="date"
                    id="birthday"
                    ref={birthdayInputRef}
                    value={birthday}
                    onChange={handleChange((value: string) =>
                      dispatch(setBirthday(value))
                    )}
                    placeholder=" "
                    className={`formSignUp__input inputsTwo noFioInput ${
                      birthdayError ? "input-invalid" : "input-valid"
                    }`}
                  />
                  <label
                    htmlFor="birthday"
                    className="floating-placeholder more"
                  >
                    Дата рождения
                  </label>
                  <button
                    type="button"
                    className="calendar-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      birthdayInputRef.current?.showPicker();
                    }}
                  >
                    <img src={vector} alt=">" />
                  </button>
                </div>
                {birthdayError && (
                  <span className="error-message">{birthdayError}</span>
                )}
              </div>
            </div>

            <div className="formSignUp__rowTwoInputs">
              <div className="formSignUp__labelTwo">
                <div className="inputIcons">
                  <img
                    src={`${process.env.PUBLIC_URL}/image/signup/document.svg`}
                    alt=""
                  />
                  <img
                    src={documentTypeError ? no : yes}
                    className="checkedInput"
                    alt=""
                  />
                </div>
                <select
                  id="documentType"
                  value={documentType}
                  onChange={(e) => dispatch(setDocumentType(e.target.value))}
                  className={`formSignUp__input inputsTwo noFioInput ${
                    documentTypeError ? "input-invalid" : "input-valid"
                  }`}
                >
                  <option value="">Выберите документ</option>
                  <option value="passport">Паспорт РФ</option>
                </select>
                <label
                  htmlFor="documentType"
                  className="floating-placeholder more"
                >
                  Тип документа
                </label>
                {documentTypeError && (
                  <span className="error-message">{documentTypeError}</span>
                )}
              </div>

              <div className="formSignUp__labelTwo">
                <div className="inputIcons">
                  <img
                    src={`${process.env.PUBLIC_URL}/image/signup/transcript.svg`}
                    alt=""
                  />
                  <img
                    src={documentError ? no : yes}
                    className="checkedInput"
                    alt=""
                  />
                </div>
                <input
                  type="text"
                  id="dataDocx"
                  value={formatDockNumber(documentNumber)}
                  onChange={handleChange((value: string) => {
                    console.log(value);

                    if (value[value.length - 1] === "№")
                      dispatch(setDocumentNumber(value[0] + value[1]));
                    else dispatch(setDocumentNumber(value));
                  })}
                  placeholder=" "
                  maxLength={11}
                  className={`formSignUp__input inputsTwo noFioInput ${
                    documentError ? "input-invalid" : "input-valid"
                  }`}
                  disabled={!documentType}
                />
                <label htmlFor="dataDocx" className="floating-placeholder more">
                  Серия и номер
                </label>
                {documentError && (
                  <span className="error-message">{documentError}</span>
                )}
              </div>
            </div>

            <div className="formSignUp__rowTwoInputs">
              <div className="formSignUp__labelTwo">
                <div className="inputIcons">
                  <img
                    src={`${process.env.PUBLIC_URL}/image/signup/password.svg`}
                    alt=""
                  />
                  <img
                    src={passwordError ? no : yes}
                    className="checkedInput"
                    alt=""
                  />
                </div>
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="passwordReg"
                    value={password}
                    onChange={handleChange((value: string) =>
                      dispatch(setPassword(value))
                    )}
                    placeholder=" "
                    className={`formSignUp__input inputsTwo noFioInput ${
                      passwordError ? "input-invalid" : "input-valid"
                    }`}
                  />
                  <label
                    htmlFor="passwordReg"
                    className="floating-placeholder more"
                  >
                    Укажите пароль
                  </label>
                  <button
                    type="button"
                    className="passHelper"
                    onClick={() => dispatch(toggleShowPassword())}
                  >
                    {showPassword ? "Скрыть" : "Показать"}
                  </button>
                </div>
                {passwordError && (
                  <span className="error-message pass">{passwordError}</span>
                )}
              </div>

              <div className="formSignUp__labelTwo">
                <div className="inputIcons">
                  <img
                    src={`${process.env.PUBLIC_URL}/image/signup/password.svg`}
                    alt=""
                  />
                  <img
                    className="checkedInput"
                    src={
                      confirmPassword === password && password.length >= 6
                        ? yes
                        : no
                    }
                    alt=""
                  />
                </div>
                <div className="password-container">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="clonePasswordReg"
                    value={confirmPassword}
                    onChange={handleChange((value: string) =>
                      dispatch(setConfirmPassword(value))
                    )}
                    placeholder=" "
                    className={`formSignUp__input inputsTwo noFioInput ${
                      confirmPassword === password && password.length >= 6
                        ? "input-valid"
                        : "input-invalid"
                    }`}
                  />
                  <label
                    htmlFor="clonePasswordReg"
                    className="floating-placeholder more"
                  >
                    Повторите пароль
                  </label>
                  <button
                    type="button"
                    className="passHelper"
                    onClick={() => dispatch(toggleShowConfirmPassword())}
                  >
                    {showConfirmPassword ? "Скрыть" : "Показать"}
                  </button>
                </div>
                {passwordError && (
                  <span className="error-message pass">{passwordError}</span>
                )}
              </div>
            </div>

            <div className="formSignUp__rowTwoInputs forcheckboxAndLabel">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={agreedToNewsletter}
                  onChange={(e) =>
                    dispatch(setAgreedToNewsletter(e.target.checked))
                  }
                />
                <span className="slider" />
              </label>
              <p
                style={{ color: agreedToNewsletter ? "black" : "red" }}
                className="forcheckboxAndLabelP"
              >
                Я даю свое право на информационную рассылку
              </p>
            </div>

            <button
              type="submit"
              className="signup-submitbutton buttonsBottomActions"
              disabled={!isFormValid()}
            >
              ЗАРЕГИСТРИРОВАТЬСЯ
            </button>

            <Link
              to="/signin"
              className="signup-backbutton buttonsBottomActions"
            >
              <img src={`${process.env.PUBLIC_URL}/image/signup/Union.svg`} alt="" />
              ВЕРНУТЬСЯ НА ГЛАВНУЮ
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
