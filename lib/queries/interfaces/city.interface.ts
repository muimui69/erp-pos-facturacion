export interface GetCitiesResponse {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    total: number;
    citys: City[];
}

export interface City {
    id:        number;
    name:      string;
    status:    boolean;
    createdAt: Date;
    updatedAt: Date;
    tenantId:  number;
}


export interface GetCityByID {
    statusCode: number;
    message:    string;
    data:       DataCityByID;
}

export interface DataCityByID {
    city: City;
}

