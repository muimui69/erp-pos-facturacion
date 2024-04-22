export interface Branch {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    total:   number;
    branchs: BranchElement[];
}

export interface BranchElement {
    id:        number;
    address:   string;
    status:    boolean;
    name:      string;
    createdAt: Date;
    updatedAt: Date;
    city:      City;
}

export interface City {
    id:   number;
    name: string;
}


export interface BranchUpdateData {
    address?: string;
    name?: string;
    lat?: number;
    lng?: number;
    cityId?: string;
    status?:boolean;
  }




