import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//action: PayloadAction<TableT>

interface TeriffT {
  id: number;
  name: string;
  price: number;
}

interface AllState {
  load: boolean;
  user: string | null;
  main: boolean;
  tariffs: TeriffT[];
}

const initialState: AllState = {
  load: true,
  user: "Алексей Костылев Николаевич",
  main: false,
  tariffs: [
    { id: 1, name: "Часовой тариф", price: 100 },
    { id: 2, name: "Пакет на 3 часа", price: 270 },
    { id: 3, name: "Пакет на 5 часов", price: 400 },
    { id: 4, name: "Пакет “День” (9:00 - 16:00)", price: 450 },
    { id: 5, name: "Пакет ”Вечер” (16:00 - 22:00)", price: 450 },
    { id: 6, name: "Пакет “Сутки” 24 часа", price: 1450 },
  ],
};

const AllSlice = createSlice({
  name: "All",
  initialState,
  reducers: {
    setLoad: (state) => {
      state.load = false;
    },
    setUser: (state, action: PayloadAction<string | null>) => {
      state.user = action.payload;
    },
    setMain: (state, action: PayloadAction<boolean>) => {
      state.main = action.payload;
    },
  },
});

export const { setLoad, setUser, setMain } = AllSlice.actions;
export default AllSlice.reducer;
