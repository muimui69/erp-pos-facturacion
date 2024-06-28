export interface GetBuysResponse {
    statusCode: number;
    message: string;
    data: Data;
}

export interface Data {
    total: number;
    buys: Buy[];
}

export interface Buy {
    id: number;
    provider: Provider;
    user: Provider;
    total: string;
    createdAt: string;
    updatedAt: string;
}

export interface Provider {
    id: string;
    email: string;
    name: string;
    phone: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    tenantId?: number;
    password?: string;
    photo?: null;
}


export interface RangeDate {
    from: Date;
    to: Date;
}


export interface PostBuyParams {
    providerId: string;
    branchId: number;
    products: {
        productId: number;
        cant: number;
        proce: string;
    }[]
}


export interface GetProductForBuys {
    statusCode: number;
    message:    string;
    data:       DataProductForBuys;
}

export interface DataProductForBuys {
    product: Product;
}

export interface Product {
    id:          number;
    name:        string;
    description: string;
    price:       string;
    discount:    string;
    status:      boolean;
    images:      string[];
    createdAt:   Date;
    updatedAt:   Date;
    tenantId:    number;
}
