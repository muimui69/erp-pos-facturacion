export interface GetTenantsUserResponse {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    allTenants: AllTenant[];
    total:      number;
}

export interface AllTenant {
    rol:    Rol;
    tenant: Tenant;
}

export interface Rol {
    id:   number;
    desc: string;
}

export interface Tenant {
    id:        number;
    hosting:   string;
    name:      string;
    logo:      null;
    createdAt: string;
    updatedAt: string;
    status:    boolean;
}
