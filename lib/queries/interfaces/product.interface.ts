export interface GetProductsResponse {
    statusCode: number;
    message: string;
    data: Data;
}

export interface Data {
    allProducts: AllProduct[];
    total?: number;
}

export interface AllProduct {
    id: number;
    name: string;
    description: string;
    discount: string;
    price: string;
    images: string[];
    categories: CategoryElement[];
    createdAt: string;
    updatedAt: string;
}

export interface CategoryElement {
    category: CategoryCategory;
}

export interface CategoryCategory {
    id: number;
    description: string;
}

interface Stock {
    id: number;
    cantTotal: number;
    inventorys: any[]
}

export type GetProdutIdResponse = Pick<GetProductsResponse, keyof GetProductsResponse> & {
    data: {
        product: (AllProduct & {
            stock: Stock,
            status: boolean,
        })[];
    }
};

export type PostProductParams = Omit<AllProduct, 'id' | 'images' | 'createdAt' | 'updatedAt'> & {
    photo: File;
};

export type PatchProductParams = Partial<Omit<AllProduct, 'id' | 'images' | 'createdAt' | 'updatedAt'> & {
    photo: File;
}>;