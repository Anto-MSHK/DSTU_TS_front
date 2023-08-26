import { createApi } from "@reduxjs/toolkit/dist/query/react";
import customFetchBase from "../interceptor";
import { NewsT } from "../Types/NewsType";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getAllNews: builder.query<NewsT[],unknown>({
        query: () => ({
          url: `/news/all`,
        }),
      }),
  }),
});

export const {useGetAllNewsQuery} = newsApi;
