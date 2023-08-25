import { NewsT } from "../Types/DirectionType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../interceptor";
import {AddCriteriaBodyT} from "../Types/TestApiReqTypes";

const token = localStorage.getItem("token");

export const newsApi = createApi({
    reducerPath: "news",
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
        getNews: builder.query<NewsT[], any>({
            query: () => ({
                url: `/news/all`,
            }),

        }),
        deleteNews: builder.mutation<null, NewsT >({
            query: ({id}) => ({
                url: `/news/${id}`,
                method: "DELETE",
            })
        }),
        addNews: builder.mutation<null, NewsT >({
            query: ({id, title, text}) => ({
                url: `/news/`,
                method: "POST",
                body: {
                    title,
                    text
                },
            })
        }),
    }),
});

export const { useDeleteNewsMutation, useGetNewsQuery, useAddNewsMutation} = newsApi;
