import { notifications } from "@mantine/notifications";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
  searchTerm: "",
  favorite: [],
  recentlyVisit: [],
};
export const contactSlice = createSlice({
  name: "contactSlice",
  initialState,
  reducers: {
    // ADD CONTACTS
    addContacts: (state, { payload }) => {
      state.contacts = payload?.map((item) => {
        const check = state.favorite?.find((fItem) => fItem.id === item.id);
        if (check) {
          return { ...item, isFavourite: true };
        }
        return { ...item, isFavourite: false };
      });
    },

    // SET SEARCH TERM
    setSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
    },

    // SET FAVORITE
    setFavorite: (state, { payload }) => {
      payload = { ...payload, isFavourite: true };
      const id = state.contacts?.find((item) => item.id === payload.id);
      const vid = state.recentlyVisit?.find((item) => item.id === payload.id);
      if (id) {
        state.contacts?.map((item) => {
          if (item.id === payload.id) {
            item.isFavourite = !item.isFavourite;
          } else {
            return state.contacts;
          }
        });
      }

      if (vid) {
        state.recentlyVisit?.map((item) => {
          if (item.id === payload.id) {
            item.isFavourite = !item.isFavourite;
          } else {
            return state.recentlyVisit;
          }
        });
      }
      // const alreadyExist = state.favorite.find(
      //   (item) => item.id === payload.id
      // );

      // if (alreadyExist) {
      //   notifications.show({
      //     title: "Contact Notification",
      //     message: `${payload?.name} is already exited in the Favourite List !`,
      //   });
      //   return state.favorite;
      // }

      state.favorite = [...state.favorite, payload];
      notifications.show({
        title: "Contact Notification",
        message: `${payload?.name} is successfully added into the Favourite List !`,
      });
    },

    // REMOVE FAVORITE
    removeFavorite: (state, { payload }) => {
      const id = state.favorite.find((item) => item.id === payload.id);
      if (id) {
        state.favorite = state.favorite.filter(
          (item) => item.id !== payload.id
        );
      }

      // Adjust fav contacts after remove wherever you want
      const cid = state.contacts.find((item) => item.id === payload.id);
      if (cid) {
        state.contacts?.map((item) => {
          if (item.id === payload.id) {
            item.isFavourite = !item.isFavourite;
            notifications.show({
              title: "Contact Notification",
              message: `${payload?.name} is successfully removed from the Favourite List !`,
            });
          } else {
            return state.contacts;
          }
        });
      }

      // Remove fav icon after remove wherever you want in recently visit page
      const vid = state.contacts.find((item) => item.id === payload.id);
      if (vid) {
        state.recentlyVisit?.map((item) => {
          if (item.id === payload.id) {
            item.isFavourite = !item.isFavourite;
          } else {
            return state.recentlyVisit;
          }
        });
      }

      return state;
    },

    // RECENTLY VISIT

    setVisit: (state, { payload }) => {
      const checkId = state.recentlyVisit?.find(
        (item) => item.id === payload.id
      );
      if (checkId) {
        return state;
      }
      state.recentlyVisit = [...state.recentlyVisit, payload];
    },

    removeRecentFile: (state, { payload }) => {
      state.recentlyVisit = state.recentlyVisit.filter(
        (item) => item.id !== payload.id
      );
      // Filter visit id when you delete contact
      const vFilterId = state.recentlyVisit.find(
        (item) => item.id === payload.id
      );
      if (vFilterId) {
        state.recentlyVisit = state.recentlyVisit.filter(
          (item) => item.id !== payload.id
        );
      }
    },
  },
});

export const {
  addContacts,
  setSearchTerm,
  setFavorite,
  removeFavorite,
  setVisit,
  removeRecentFile,
} = contactSlice.actions;
export default contactSlice.reducer;
