import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import EndPoints from './EndPoints';
import { Home, HomesPageRequest, Page, UpdateUsersInHomePayload, User } from './types';

const BASE_URL = 'http://localhost:3000/api';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    keepUnusedDataFor: 0,
    endpoints: (builder) => ({
        getAllUsers: builder.query<User[], void>({
            query: EndPoints.GET_ALL_USERS
        }),
        getHomesByUserId: builder.query<Page<Home>, HomesPageRequest>({
            query: (pageRequest: HomesPageRequest) => EndPoints.GET_HOMES_BY_USER_ID(pageRequest)
        }),
        getUsersByHomeId: builder.query<User[], number>({
            query: (homeId: number) => EndPoints.GET_USERS_BY_HOME_ID(homeId)
        }),
        updateUsersInHome: builder.mutation<Home, UpdateUsersInHomePayload>({
            query: ({ homeId, userIds }) => ({
                url: EndPoints.UPDATE_USERS_IN_HOME(homeId),
                method: 'PUT',
                body: { userIds }
            })
        })
    }),
});


export const { useGetAllUsersQuery, useGetHomesByUserIdQuery, useGetUsersByHomeIdQuery, useUpdateUsersInHomeMutation } = api;
