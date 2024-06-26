export interface GetAtmsBoxResponse {
    statusCode: number;
    message: string;
    data: Data;
}

export interface Data {
    total: number;
    atms: ATM[];
}

export interface ATM {
    id: number;
    name: string;
    status: boolean;
    branch: Branch;
    createdAt: string;
    updatedAt: string;
}

export interface Branch {
    id: number;
    name: string;
    address: string;
    city: City;
}

export interface City {
    id: number;
    name: string;
}




export interface GetATMID {
    statusCode: number;
    message: string;
    data: DataATMID;
}

export interface DataATMID {
    atm: ATMID;
}

export interface ATMID {
    id: number;
    name: string;
    branch: BranchATMID;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface BranchATMID {
    id: number;
    name: string;
    city: CityATMID;
}

export interface CityATMID {
    id: number;
    name: string;
}


export interface PostAtmParams {
    name: string;
    branchId: number;
}
