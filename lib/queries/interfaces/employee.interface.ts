export interface GetEmployeesResponse {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    total:    number;
    allUsers: AllUser[];
}

export interface AllUser {
    id:        number;
    user:      User;
    rol:       Rol;
    createdAt: string;
    updatedAt: string;
}

export interface Rol {
    id:        number;
    desc:      string;
    status:    boolean;
    tenantId:  number;
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
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


export interface GetEmployeeByID {
    statusCode: number;
    message:    string;
    data:       DataEmployeeByID;
}

export interface DataEmployeeByID {
    employee: Employee;
}

export interface Employee {
    rol:       Rol;
    tenant:    Tenant;
    id:        number;
    user:      User;
    createdAt: string;
    updatedAt: string;
}

export interface Tenant {
    id:        number;
    hosting:   string;
    createdAt: Date;
    updatedAt: Date;
    status:    boolean;
}

