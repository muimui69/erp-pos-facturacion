export interface PostInvitationParams {
    rolId: number;
    userId: string;
}


export interface GetUserInvitationResponse {
    statusCode: number;
    message:    string;
    data:       DataUserInvitationResponse;
}

export interface DataUserInvitationResponse {
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
    data:       DataInvitationsResponse;
}

export interface DataInvitationsResponse {
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


export interface PatchInvitationAcceptResponse {
    statusCode: number;
    message:    string;
    data:       DataInvitationAcceptResponse;
}

export interface DataInvitationAcceptResponse {
    invitation:    Invitation;
    memeberTenant: MemeberTenant;
    memberRole:    MemberRole;
}

export interface Invitation {
    user:   User;
    rol:    Rol;
    tenant: Tenant;
}

export interface Rol {
    id:        number;
    desc:      string;
    status:    boolean;
    tenantId:  number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Tenant {
    id:        number;
    hosting:   string;
    createdAt: Date;
    updatedAt: Date;
    status:    boolean;
}

export interface User {
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

export interface MemberRole {
    memberId: number;
    rolId:    number;
}

export interface MemeberTenant {
    id:             number;
    passwordTenant: string;
    userId:         string;
    tenantId:       number;
}
