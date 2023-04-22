import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setUser } from "../slices/authManage";
import { RootState } from "../store";
import { toast } from "react-hot-toast";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001/api/",
  prepareHeaders: (headers, { getState }) => {
    const token = JSON.parse(
      window.localStorage.getItem("userAuth") as string
    )?.token;

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    toast.error("You don't have a active session");
    api.dispatch(setUser({ user: null, isLoggedIn: false }));
    window.localStorage.removeItem("userAuth");
  }
  return result;
};

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => `profile`,
    }),
    refecth: builder.query({
      query: () => `auth/refecth`,
    }),
    login: builder.mutation({
      query: (credentials: { username: string; password: string }) => ({
        url: `auth/login`,
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // `onStart` side-effect
        try {
          const { data } = await queryFulfilled;
          // `onSuccess` side-effect
          dispatch(setUser({ user: data, isLoggedIn: true }));
          window.localStorage.setItem("userAuth", JSON.stringify(data));
        } catch (err) {
          // `onError` side-effect
          dispatch(setUser({ user: null, isLoggedIn: false }));
          window.localStorage.removeItem("userAuth");
        }
      },
    }),
    updateUser: builder.mutation({
      query: (body) => ({ url: "profile", method: "PUT", body }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useLoginMutation,
  useLazyRefecthQuery,
  useUpdateUserMutation,
} = appApi;
