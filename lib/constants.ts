export interface Params {
    params: {
        [param: string]: any;
    }
}

export interface SearchParams {
    searchParams: {
        [key: string]: string
    }
}

export const href = process.env.NODE_ENV === 'production' ? process.env.APP_URL : process.env.NEXT_PUBLIC_APP_URL;


