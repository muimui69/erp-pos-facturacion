export interface GetBranchsResponse {
    statusCode: number;
    message: string;
    data: Data;
}

export interface Data {
    total: number;
    branchs: Branch[];
}

export interface Branch {
    id: number;
    address: string;
    status: boolean;
    name: string;
    createdAt: string;
    updatedAt: string;
    city: City;
}

export interface City {
    id: number;
    name: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    tenantId: number;
}


export interface GetBranchIdResponse {
    statusCode: number;
    message: string;
    data: DataBranchID;
}

export interface DataBranchID {
    branch: BranchID;
}

export interface BranchID {
    id: number;
    name: string;
    address: string;
    lat: string;
    lng: string;
    city: CityBranchId;
    createdAt: string;
    updatedAt: string;
    status: boolean;
    Tenant: Tenant;
    atm: any[];
}

export interface Tenant {
    id: number;
    hosting: string;
    createdAt: Date;
    updatedAt: Date;
    status: boolean;
}

export interface CityBranchId {
    id: number;
    name: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    tenantId: number;
}


export type PostBranchParams = Pick<BranchID, 'address' | 'name' | 'lng' |'lat'> & {
    cityId: number;
};

export type PatchBranchParams = Partial<Pick<BranchID,'id'| 'address' | 'name' | 'lng' |'lat'>> & {
    cityId?: number;
};




