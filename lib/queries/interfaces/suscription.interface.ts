export interface GetSuscriptionsResponse {
    statusCode: number;
    message: string;
    data: Data;
}

export interface Data {
    total?: number;
    allSuscription: SuscriptionElement[];
}

export interface SuscriptionElement {
    id: number;
    name: string;
    price: string;
    duracion: number;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}


export interface PostSuscriptionParams {
    suscriptionId: number;
    hosting: string;
    name: string;
}
