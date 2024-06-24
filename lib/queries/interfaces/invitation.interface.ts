export interface PostInvitationParams {
    rolId: number;
    users: string[];
}


export interface PatchInvitationParams {
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
    rol:       Rol;
    state:     string;
    user:      User;
    createdAt: string;
    updatedAt: string;
}

export interface Rol {
    id:        number;
    desc:      string;
    status:    boolean;
    tenantId:  number;
    createdAt: Date;
    updatedAt: Date;
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


export interface GetInvitationByID {
    statusCode: number;
    message:    string;
    data:       DataInvitationByID;
}

export interface DataInvitationByID {
    rol:       RolDataInvitationByID;
    id:        number;
    state:     string;
    createdAt: Date;
    tenant:    TenantRolDataInvitationByID;
    user:      UserTenantRolDataInvitationByID;
}

export interface RolDataInvitationByID {
    id:        number;
    desc:      string;
    status:    boolean;
    tenantId:  number;
    createdAt: Date;
    updatedAt: Date;
}

export interface TenantRolDataInvitationByID {
    id:        number;
    hosting:   string;
    name:      string;
    logo:      null;
    createdAt: Date;
    updatedAt: Date;
    status:    boolean;
}

export interface UserTenantRolDataInvitationByID {
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
