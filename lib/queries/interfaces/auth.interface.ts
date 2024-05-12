export interface GetSigninResponse {
    message: string;
    statusCode: number;
    data: Data;
}

export interface Data {
    user: User;
    token: string;
}

export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    phone: string;
    photo: null;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}


export type PostUserSigninParams = Pick<User, "email" | "password">;
export type PostUserSingupParams = Omit<User, "id" | "photo" | "status" | "createdAt" | "updatedAt">;
export type PostUserSingupResponse = Omit<GetSigninResponse, "data"> & { data: Omit<Data, "token"> };

