export interface Product {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    allProducts: AllProduct[];
    total:       number;
}

export interface AllProduct {
    id:          number;
    name:        string;
    description: string;
    discount:    string;
    price:       string;
    images:      string[];
    categories:  CategoryElement[];
    createdAt:   string;
    updatedAt:   string;
}

export interface CategoryElement {
    category: CategoryCategory;
}

export interface CategoryCategory {
    id:          number;
    description: string;
}


export type PostProduct = Omit<AllProduct, 'id'  | 'createdAt' | 'images' |'updatedAt'>&{
    photo : File;
};