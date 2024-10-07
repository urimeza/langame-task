import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignUpState {
  fio: string;
  phoneNum: string;
  birthday: string;
  documentType: string;
  documentNumber: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  agreedToNewsletter: boolean;
  fioError: string;
  phoneError: string;
  birthdayError: string;
  documentError: string;
  documentTypeError: string;
  passwordError: string;
}

const initialState: SignUpState = {
  fio: "",
  phoneNum: "",
  birthday: "",
  documentType: "",
  documentNumber: "",
  password: "",
  confirmPassword: "",
  showPassword: false,
  showConfirmPassword: false,
  agreedToNewsletter: false,
  fioError: "ФИО должно содержать 3 слова, разделенные пробелами.",
  phoneError: "Поле должно содержатьсодержать 11 цифр.",
  birthdayError: "Пожалуйста, выберите дату рождения.",
  documentTypeError: "Не выбран тип",
  documentError: "Поле должно содержать 10 симфолов.",
  passwordError: "Пароль должен быть не менее 6 символов.",
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setFio(state, action: PayloadAction<string>) {
      state.fio = action.payload;
      state.fioError =
        state.fio.trim().split(" ").length === 3
          ? ""
          : "ФИО должно содержать 3 слова, разделенные пробелами.";
    },
    setPhoneNum(state, action: PayloadAction<string>) {
      state.phoneNum = action.payload;
      state.phoneError =
        state.phoneNum.replace(/\D/g, "").length === 11
          ? ""
          : "Поле должно содержатьсодержать 11 цифр.";
    },
    setBirthday(state, action: PayloadAction<string>) {
      state.birthday = action.payload;
      state.birthdayError = state.birthday
        ? ""
        : "Пожалуйста, выберите дату рождения.";
    },
    setDocumentType(state, action: PayloadAction<string>) {
      state.documentType = action.payload;
      state.documentTypeError =
        state.documentType === "" ? "Не выбран тип" : "";
    },
    setDocumentNumber(state, action: PayloadAction<string>) {
      state.documentNumber = action.payload;
      state.documentError =
        state.documentNumber.replace("№", "").length === 10
          ? ""
          : "Поле должно содержать 10 симфолов.";
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
      state.passwordError =
        state.password.length < 6
          ? "Пароль должен быть не менее 6 символов."
          : "";
    },
    setConfirmPassword(state, action: PayloadAction<string>) {
      state.confirmPassword = action.payload;
      state.passwordError =
        state.password === state.confirmPassword
          ? ""
          : "Пароли должны совпадать.";
    },
    toggleShowPassword(state) {
      state.showPassword = !state.showPassword;
    },
    toggleShowConfirmPassword(state) {
      state.showConfirmPassword = !state.showConfirmPassword;
    },
    setAgreedToNewsletter(state, action: PayloadAction<boolean>) {
      state.agreedToNewsletter = action.payload;
    },
    resetForm(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
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
  resetForm,
} = signUpSlice.actions;

export default signUpSlice.reducer;
