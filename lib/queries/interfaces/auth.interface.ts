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


export interface GetSigninTenantResponse {
    message:    string;
    statusCode: number;
    data:       DataTenant;
}

export interface DataTenant {
    user:       UserTenant;
    token:      string;
    memberRole: MemberRole;
}

export interface MemberRole {
    id:             number;
    userId:         string;
    passwordTenant: string;
    rol:            RolTenant;
}

export interface RolTenant {
    id:          number;
    desc:        string;
    status:      boolean;
    permissions: PermissionElement[];
}

export interface PermissionElement {
    permission: PermissionPermission;
}

export interface PermissionPermission {
    desc:   string;
    id:     number;
    module: string;
}

export interface UserTenant {
    id:        string;
    email:     string;
    password:  string;
    name:      string;
    phone:     string;
    photo:     null;
    status:    boolean;
    createdAt: Date;
    updatedAt: Date;
}
