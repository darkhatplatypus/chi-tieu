// import { API } from "../API";

// export interface Geo {
//   lat: string;
//   lng: string;
// }

// export interface Address {
//   city: string;
//   geo: Geo;
//   street: string;
//   suite: string;
//   zipcode: string;
// }

// export interface Company {
//   bs: string;
//   catchPhrase: string;
//   name: string;
// }

// export interface User {
//   _id: string;
//   email: string;
//   name: string;
//   phoneNumber: string;
// }

// const userApi = API.injectEndpoints({
//   endpoints: (builder) => ({
//     getUser: builder.query<User, string|void>({
//       query: (id) => `users/${id}`,
//     }),
//   }),
//   overrideExisting: true,
// });

// // export const { useLazyGetUserQuery } = userApi;
