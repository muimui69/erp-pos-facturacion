export interface GetPermissionsResponse {
    statusCode: number;
    message: string;
    data: Data;
}

export interface Data {
    total: number;
    allPermission: AllPermission[];
}

export interface AllPermission {
    id: number;
    desc: string;
}

export interface GelRolesResponse {
    statusCode: number;
    message: string;
    data: Data;
}

export interface Data {
    allRoles: AllRole[];
    total: number;
}

export interface AllRole {
    id: number;
    desc: string;
    status: boolean;
    tenantId: number;
    createdAt: string;
    updatedAt: string;
}

export interface PostRoleParams {
    desc: string;
    permissions: number[];
}

