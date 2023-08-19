import { DirectionT, TestT } from "../Types/DirectionType";
import { BASE_URL } from "../http";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../interceptor";
import {Answer} from "../slices/quizSlice";

const token = localStorage.getItem('token');

export const testsApi = createApi({
  reducerPath: "tests",
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    getTests: builder.query<TestT[], any>({
      query: (limit: string) => ({
        url: `/tests`,
      }),
    }),
    getTestById: builder.query<TestT, string>({
      query: (id: string) => ({
        url: `/tests/${id}`,
      }),
    }),
    saveAnswers: builder.mutation<void, { answers: Answer[]; testId: string | undefined }>({
      query: ({ answers, testId }) => {
        return {
          url: `/users/test/save/${testId}`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: answers,
        };
      },
    }),
  }),
});

export const { useGetTestsQuery, useGetTestByIdQuery, useSaveAnswersMutation } = testsApi;
