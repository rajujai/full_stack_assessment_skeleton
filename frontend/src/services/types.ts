export interface User {
    id: number;
    username: string;
    email: string;
    createdAt?: Date;
    lastUpdated?: Date;
    homes?: Home[];
}

export interface Home {
    id: number;
    streetAddress: string;
    state: string;
    zip: number;
    sqft: number;
    beds: number;
    baths: number;
    listPrice: number;
    createdAt?: Date;
    lastUpdated?: Date;
    users?: User[];
}

export interface Page<T> {
    data: T[];
    page: number;
    size: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean
}

export interface UpdateUsersInHomePayload {
    homeId: number;
    userIds: number[] | undefined;
}

export interface HomesPageRequest {
    userId: number,
    pageNo: number,
    pageSize?: number
}