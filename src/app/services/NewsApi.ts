import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../interceptor";
import { NewsT } from "../Types/DirectionType";
import { AddCriteriaBodyT } from "../Types/TestApiReqTypes";

const token = localStorage.getItem("token");

export const newsApi = createApi({
    reducerPath: "news",
    baseQuery: customFetchBase,
    tagTypes: ['News'],
    endpoints: (builder) => ({
        getNews: builder.query<NewsT[], void>({
            query: () => ({
                url: `/news/all`,
            }),
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'News' as const, id })), 'News']
                    : ['News'],
        }),
        deleteNews: builder.mutation<void, NewsT>({
            query: ({ id }) => ({
                url: `/news/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [ "News" ],
        }),
        addNews: builder.mutation<void, NewsT>({
            query: ({ id, title, text }) => ({
                url: `/news/`,
                method: "POST",
                body: {
                    title,
                    text,
                },
            }),
            invalidatesTags: [ "News" ],
        }),
    }),
});

export const { useDeleteNewsMutation, useGetNewsQuery, useAddNewsMutation } = newsApi;
