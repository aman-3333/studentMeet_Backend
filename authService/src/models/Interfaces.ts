export interface ILogin {
    email: string;
    password: string;
    googleId:string;
    imageUrl:string;
    name:string;
    country_code:number;
    whatsapp_contact:number;
    institute:any;
    institute_domain:any
}

export interface IError {
    status: number;
    statusText: string;
    message?: string
}

export interface IOtp{
    contact: Number,
    country_code: Number,
    otp: String,
    otpId: String
    
}


export interface IEdneedResponse extends IError {
    data: any;
    token_data:any;
    institute:any;
    user_role:any
}


// export interface IUser {
//     username: string;
//     firstname: string;
//     lastname: string
//     userRoles: IRole[];
//     token: string;
//     refreshToken: string;
//     tokenValidity?: Date;
//     refreshTokenValidity?: Date;
// }

// export interface IRole {
//     roleId: number;
//     roleName: string;
//     roleDescription: string;
// }