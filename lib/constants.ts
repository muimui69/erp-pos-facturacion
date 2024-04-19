export interface Employee {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    total:     number;
    employees: EmployeeElement[];
}

export interface EmployeeElement {
    id:        string;
    email:     string;
    phone:     string;
    rol:       string;
    branch:    Branch;
    status:    boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Branch {
    id:        number;
    address:   string;
    name:      string;
    lat:       string;
    lng:       string;
    status:    boolean;
    cityId:    number;
    createdAt: Date;
    updatedAt: Date;
}

