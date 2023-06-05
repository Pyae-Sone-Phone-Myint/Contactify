import { notifications } from "@mantine/notifications";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
  searchTerm: "",
  favorite: [],
  recentlyVisit: [],
  contacts_quantity:0,
  fetchQueryFinished:false
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
              message: `${payload?.name} is  removed from the Favourite List !`,
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

      const cid = state.contacts.find((item) => item.id === payload.id);
      if (cid) {
        state.contacts?.map((item) => {
          if (item.id === payload.id) {
            item.isFavourite = !item.isFavourite;
            notifications.show({
              title: "Contact Notification",
              message: `${payload?.name} is removed from the Recent List !`,
            });
          } else {
            return state.contacts;
          }
        });
      }
    },

    add_contact_quantity:(state,{payload})=>{
      state.contacts_quantity=payload
    },
    finished_query:(state,{payload})=>{
      state.fetchQueryFinished=payload
    }
  },
});

export const {
  addContacts,
  setSearchTerm,
  setFavorite,
  removeFavorite,
  setVisit,
  removeRecentFile,
  add_contact_quantity,
  finished_query
} = contactSlice.actions;
export default contactSlice.reducer;
