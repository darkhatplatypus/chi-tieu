import { Config } from "@/Config";
import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { isoCurrencyCodes } from "expo-localization";
import * as SecureStore from "expo-secure-store";

export interface User {
  _id: string;
  email: string;
  name: string;
  phone_number: string;
  wallets: string[];
  transactions: string[];
  savings: string[];
  token: string;
}

export interface Statistics {
  total_amount: number;
}

export interface SavingWrapper {
  savings: SavingItem[];
}

export interface SavingItem {
  _id: string;
  wallet: string;
  user: string;
  amount: number;
  saved_amount: number;
  title: string;
  category: string[];
  detail: string[];
  is_completed: boolean;
}

export interface SavingSingleItem {
  saving: SavingItem;
}

export interface TransactionItem {
  _id: string;
  wallet: string;
  user: string;
  amount: number;
  title: string;
  category: string;
  detail: string;
  createdTime: string;
}

export interface TransactionWrapper {
  transactions: TransactionItem[];
}

export interface TransactionSingleItem {
  transaction: TransactionItem;
}

export interface WalletItem {
  _id: string;
  user: string;
  name: string;
  balance: number;
  detail: string;
}

export interface WalletContainer {
  wallets: WalletItem[];
}

const baseQuery = fetchBaseQuery({
  baseUrl: Config.API_URL,
  prepareHeaders: async (headers) => {
    const token = await SecureStore.getItemAsync("token");
    headers.set("Authorization", "Bearer " + token);
    return headers;
  },
});

const baseQueryWithInterceptor = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // here you can deal with 401 error
  }
  return result;
};

export const API = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => `/users/`,
    }),
    getAmountThisMonth: builder.query<Statistics, void>({
      query: () => `/statistics/month`,
    }),
    getAmountAll: builder.query<Statistics, void>({
      query: () => `/statistics/`,
    }),
    getAllTransactions: builder.query<TransactionWrapper, void>({
      query: () => `/transactions/`,
    }),
    getTransactionsThisWeek: builder.query<TransactionWrapper, void>({
      query: () => `/transactions/find_week`,
    }),
    getAllSavings: builder.query<SavingWrapper, void>({
      query: () => `/savings/`,
    }),
    getSaving: builder.query<SavingSingleItem, string | void>({
      query: (id) => `/savings/find_id/${id}`,
    }),
    getTransaction: builder.query<TransactionSingleItem, string | void>({
      query: (id) => `/transactions/find_id/${id}`,
    }),
    getAllWallets: builder.query<WalletContainer, void>({
      query: () => `/wallets/`,
    }),
    login: builder.mutation<User, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: `/users/signin`,
        method: "POST",
        body: { email: email, password: password },
      }),
    }),
    register: builder.mutation<
      User,
      { email: string; password: string; name: string; phoneNumber: string }
    >({
      query: ({ email, name, password, phoneNumber }) => ({
        url: `/users/signup`,
        method: "POST",
        body: {
          email: email,
          name: name,
          password: password,
          phone_number: phoneNumber,
        },
      }),
    }),
    createWallet: builder.mutation<WalletItem, void>({
      query: () => ({
        url: `/wallets/create`,
        method: "POST",
        body: {
          name: "Wallet",
        },
      }),
    }),
    addTransaction: builder.mutation<
      TransactionItem,
      {
        wallet: string;
        amount: string;
        title: string;
        category: string;
        detail: string;
        createdTime: string;
      }
    >({
      query: ({ wallet, amount, title, category, detail, createdTime }) => ({
        url: `/transactions/create`,
        method: "POST",
        body: {
          wallet: wallet,
          amount: amount,
          title: title,
          category: category,
          detail: detail,
          createdTime: createdTime,
        },
      }),
    }),
    addSaving: builder.mutation<
      SavingItem,
      {
        wallet: string;
        title: string;
        detail: string;
        amount: string;
        saved_amount: string;
        category: string;
        is_completed: boolean;
      }
    >({
      query: ({
        wallet,
        title,
        detail,
        amount,
        saved_amount,
        category,
        is_completed,
      }) => ({
        url: `/savings/create`,
        method: "POST",
        body: {
          wallet: wallet,
          title: title,
          detail: detail,
          amount: amount,
          saved_amount: saved_amount,
          category: category,
          is_completed: is_completed,
        },
      }),
    }),
  }),
});

export const {
  useLazyGetUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useCreateWalletMutation,
  useGetAmountThisMonthQuery,
  useLazyGetAmountThisMonthQuery,
  useLazyGetAmountAllQuery,
  useAddSavingMutation,
  useAddTransactionMutation,
  useLazyGetAllTransactionsQuery,
  useGetAllTransactionsQuery,
  useGetTransactionsThisWeekQuery,
  useGetAllSavingsQuery,
  useLazyGetAllSavingsQuery,
  useLazyGetSavingQuery,
  useLazyGetTransactionQuery,
  useGetAllWalletsQuery,
} = API;
