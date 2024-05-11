export interface GetCategoryResponse {
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

export type GetCategoryIdResponse = Pick<GetCategoryResponse, keyof GetCategoryResponse>;

export type PostCategoryParams = Pick<AllCategory, 'description'>;

export type PatchCategoryParams = Partial<Pick<AllCategory, 'description'>>;


