export interface Signin {
    message:    string;
    statusCode: number;
    data:       Data;
}

export interface Data {
    user:  User;
    token: string;
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


export interface PostUser{
    email:     string;
    password:  string;
}
