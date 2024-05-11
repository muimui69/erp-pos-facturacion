export interface GetProvidersResponse {
    statusCode: number;
    message: string;
    data: Data;
}


export interface Data {
    total?: number;
    allProviders: AllProvider[];
}


export interface AllProvider {
    id: string;
    email: string;
    name: string;
    phone: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    tenantId: number;
}


interface Buy {
    id: number;
    total: number;
    user: {
        id: number;
        name: string;
    };
    time: Date;
}


export type GetProviderIdResponse = Pick<GetProvidersResponse, keyof GetProvidersResponse> & {
    data: {
        allProviders: (AllProvider & { buys: Buy[] })[];
    }
};

export type PostProviderParams = Pick<AllProvider, 'name' | 'email' | 'phone'>;

export type PatchProviderParams = Partial<Pick<AllProvider, 'name' | 'email' | 'phone'>>;
