import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, Banner } from '../../types';
import { BASE_URL } from '../../utils/constants';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }), 
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
    }),
    getBanners: builder.query<Banner[], void>({
      query: () => '/banners',
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetBannersQuery,
  useGetProductByIdQuery,
  useLazyGetProductsQuery,
  useLazyGetProductByIdQuery,
  useLazyGetBannersQuery,
} = productsApi;
