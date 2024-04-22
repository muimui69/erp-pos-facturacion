export interface City {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    total: number;
    citys: CityElement[];
}

export interface CityElement {
    id:        number;
    name:      string;
    status:    boolean;
    createdAt: Date;
    updatedAt: Date;
}




