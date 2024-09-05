import { HomesPageRequest } from "./types";

const END_POINTS = {
    GET_ALL_USERS: () => `/users/all`,

    GET_USERS_BY_HOME_ID: (homeId: number) => `/users/find-by-home?id=${homeId}`,

    GET_HOMES_BY_USER_ID: ({ userId, pageNo, pageSize }: HomesPageRequest) => `/homes/find-by-user?id=${userId}&page=${pageNo}${pageSize ? "&size=" + pageSize : ""}`,

    UPDATE_USERS_IN_HOME: (homeId: number) => `/homes/update-users/${homeId}`

}

export default END_POINTS;