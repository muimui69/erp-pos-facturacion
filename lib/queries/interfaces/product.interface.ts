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



export type PostProductParams = Omit<AllProduct, 'id' | 'images' | 'createdAt' | 'updatedAt'> & {
    photo: File;
};

export type PatchProductParams = Partial<Omit<AllProduct, 'id' | 'images' | 'createdAt' | 'updatedAt'> & {
    photo: File;
}>;


interface Elemento {
    id: string;
}

export interface CategoriesProduct {
    categories: Elemento[];
}




export interface GetProductIDResponse {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    product: ProductIDResponse;
}

export interface ProductIDResponse  {
    id:          number;
    name:        string;
    description: string;
    price:       string;
    discount:    string;
    images:      string[];
    stock:       Stock;
    status:      boolean;
    categories:  CategoryElement[];
    createdAt:   string;
    updatedAt:   string;
}

export interface Stock {
    id:         number;
    cantTotal:  number;
    inventorys: any[];
}

