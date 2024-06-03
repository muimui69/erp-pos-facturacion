export interface PostInvitationParams {
    rolId: number;
    userId: string;
}


export interface GetUserInvitationResponse {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    allUsers: AllUser[];
    total:    number;
}

export interface AllUser {
    id:        string;
    email:     string;
    password:  string;
    name:      string;
    phone:     string;
    photo:     null;
    status:    boolean;
    createdAt: Date;
    updatedAt: Date;
}


export interface GetInvitationsResponse {
    statusCode: number;
    message:    string;
    data:       Data;
}

export interface Data {
    allInvitations: AllInvitation[];
    total:          number;
}

export interface AllInvitation {
    id:        number;
    tenantId:  number;
    userId:    string;
    state:     string;
    rolId:     number;
    status:    boolean;
    createdAt: Date;
    updatedAt: Date;
}
