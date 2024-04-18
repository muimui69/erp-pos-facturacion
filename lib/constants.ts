export interface ATM {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    employee: Employee;
}

export interface Employee {
    id:           string;
    codeEmployee: string;
    email:        string;
    name:         string;
    phone:        string;
    photo:        null;
    status:       boolean;
    rol:          string;
    branchId:     number;
    createdAt:    Date;
    updatedAt:    Date;
}

export interface BranchOfficeData {
    address?: string;
    name?: string;
    lng?: string;
    lat?: string;
}