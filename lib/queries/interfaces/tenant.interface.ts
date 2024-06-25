export interface GetTenantsResponse {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    allTenants: AllTenant[];
    total:      number;
}

export interface AllTenant {
    rol:    Role[];
    tenant: Tenants;
}

export interface Rol {
    id:   number;
    desc: string;
}

export interface Role {
    rol: Rol;
}

export interface Tenants {
    id:        number;
    hosting:   string;
    name:string;
    createdAt: string;
    updatedAt: string;
    status:    boolean;
}








