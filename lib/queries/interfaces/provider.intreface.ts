import { User } from "./auth.interface";

export interface Provider {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    total:        number;
    allProviders: AllProvider[];
}

export interface AllProvider {
    id:        string;
    email:     string;
    name:      string;
    phone:     string;
    status:    boolean;
    createdAt: string;
    updatedAt: string;
    tenantId:  number;
}


export type PostProviderParams = Pick<User, 'name' | 'email' | 'phone'> 


interface Buy {
    id:         number;
    total:      number;
    user: {
      id:       number;
      name:     string;
    };
    time:       Date;
}

export type GetProviderUuid = Omit<User, 'id' | 'photo' > & {
    buys : Buy[]
}

export type PatchProviderParams = Partial<Pick<User, 'name' | 'email' | 'phone'>>;
