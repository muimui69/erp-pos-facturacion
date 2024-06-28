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
    message: string;
    data: DataProductIDResponse;
}

export interface DataProductIDResponse {
    product: ProductIDResponse;
}

export interface ProductIDResponse {
    id: number;
    name: string;
    description: string;
    price: string;
    discount: string;
    images: string[];
    stock: Stock;
    status: boolean;
    categories: CategoryElement[];
    createdAt: string;
    updatedAt: string;
}

export interface Stock {
    id: number;
    cantTotal: number;
    inventorys: any[];
}



export interface GetBranchsInProduct {
    statusCode: number;
    message: string;
    data: DataInventoryBranchsInProduct;
}

export interface DataInventoryBranchsInProduct {
    stock: StockInventoryBranchsInProduct;
}

export interface StockInventoryBranchsInProduct {
    id: number;
    inventorys: InventoryBranchsInProduct[];
    cantTotal: number;
    updatedAt: Date;
}

export interface InventoryBranchsInProduct {
    cant: number;
    branch: BranchBranchsInProduct;
}

export interface BranchBranchsInProduct {
    id: number;
    city: CityBranchBranchsInProduct;
    name: string;
    address: string;
    status: boolean;
    updatedAt: Date;
}

export interface CityBranchBranchsInProduct {
    id: number;
    name: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    tenantId: number;
}


export interface BranchIdsPayload {
    branchIds: number[];
}
