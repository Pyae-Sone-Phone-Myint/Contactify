import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://contact-app.mmsdev.site/api/v1",
  }),
  tagTypes: "contacts",
  endpoints: (builder) => ({
    getAllContacts: builder.query({
      query: (token) => ({
        url: `/contact`,
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["contacts"],
    }),
    createContact: builder.mutation({
      query: ({ data, token }) => ({
        url: `/contact`,
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
        body: data,
      }),
      invalidatesTags: ["contacts"],
    }),
    deleteContact: builder.mutation({
      query: ({ id, token }) => ({
        url: `/contact/${id}`,
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["contacts"],
    }),
    getSingleContact: builder.query({
      query: ({ id, token }) => ({
        url: `/contact/${id}`,
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      }),
      providesTags: ["contacts"],
    }),
    updateContact: builder.mutation({
      query: ({ data, token, id }) => ({
        url: `/contact/${id}`,
        method: "PUT",
        headers: { authorization: `Bearer ${token}` },
        body: data,
      }),
      invalidatesTags: ["contacts"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllContactsQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
  useGetSingleContactQuery,
  useUpdateContactMutation,
} = contactApi;
