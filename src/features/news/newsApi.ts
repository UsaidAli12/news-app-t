// src/services/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define types for news items and authors
export interface NewsItem {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Author {
  id: number;
  name: string;
  username: string;
  email: string;
}

// Create RTK Query API slice
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['News', 'Author'],
  endpoints: (builder) => ({
    // News endpoints
    getNews: builder.query<NewsItem[], void>({
      query: () => 'posts',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'News' as const, id })), { type: 'News', id: 'LIST' }]
          : [{ type: 'News', id: 'LIST' }],
    }),
    getNewsById: builder.query<NewsItem, number>({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'News', id }],
    }),
    // Author endpoints
    getAuthors: builder.query<Author[], void>({
      query: () => 'users',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Author' as const, id })), { type: 'Author', id: 'LIST' }]
          : [{ type: 'Author', id: 'LIST' }],
    }),
    getAuthorById: builder.query<Author, number>({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'Author', id }],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetNewsQuery,
  useGetNewsByIdQuery,
  useGetAuthorsQuery,
  useGetAuthorByIdQuery,
} = api;