import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { contactApi } from "./api/contactApi";
import contactSlice from "./feature/contactSlice";



export const store = configureStore({
  reducer: {

    [contactApi.reducerPath]: contactApi.reducer,
    contactSlice : contactSlice
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactApi.middleware),
});

setupListeners(store.dispatch);
