import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const goodsApi = createApi({
  reducerPath: "goodsApi",
  tagTypes: ["Products"], // для обратного запроса обновленных данных
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  // конечные точки АПИ сервера
  endpoints: (build) => ({
    // получение данных
    getGoods: build.query({
      query: (limit = "") => `goods?${limit && `_limit=${limit}`}`,
      // для обратного запроса обновленных данных
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Products", id })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    // добавление записи
    addProduct: build.mutation({
      query: (body) => ({
        url: "goods",
        method: "POST",
        body,
      }),
      // для обратного запроса обновленных данных
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    // удаление записи
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `goods/${id}`,
        method: "DELETE",
      }),
      // для обратного запроса обновленных данных
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
  }),
});

// хуки создаются автоматически RTK Query, вызываем их где нужно
export const {
  useGetGoodsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = goodsApi;
