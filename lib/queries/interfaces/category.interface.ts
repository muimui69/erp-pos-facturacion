export interface GetCategoriesResponse {
    statusCode: number;
    message: string;
    data: Data;
}

export interface Data {
    total: number;
    allCategories: AllCategory[];
}

export interface AllCategory {
    id: number;
    description: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
    tenantId: number;
}

export type GetCategoryIdResponse = Pick<GetCategoriesResponse, keyof GetCategoriesResponse>;

export type PostCategoryParams = Pick<AllCategory, 'description'>;

export type PatchCategoryParams = Partial<Pick<AllCategory, 'description'>>;


