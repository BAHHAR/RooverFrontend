import { IAuth } from "../../../interfaces/IAuth";

export  interface UserRes{
    users:IAuth[]
}


export interface deleteReq{
    id:string
}

export interface addUser{
    email?:string;
    fisrtName?:string;
    lastName?:string;
    password?:string;
    userTypeId?:number;
}

export interface addUserRes{
    user:IAuth;
}