import { store } from "../redux/store";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  tags: string[];
  category: string;
};

export type Banner = {
  id: string;
  image: string;
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;