import { IAuth } from "../../../interfaces/IAuth";

export interface loginReq {
  email: string;
  password: string;
}

export interface loginRes {
  tokens: {
      access:{
        expires:string | null;
        token : string | null
      },
      refresh:{
        expires:string | null;
        token : string | null
      }
  };
  user: IAuth | null;
}

export interface createUserRes {
  auth: IAuth | null;
}
export interface createUserReq {
  email: string;
  password: string;
  zones: string[];
  userName: string;
}

export interface updateUserReq {
  email: string;
  zones: string[];
  image: Blob;
  userName: string;
}


export interface getALlUsersRes {
  users: IAuth[];
}

export interface successRes {
  code: number;
}


export interface changePassword{
  password:string|undefined;
}


export interface SendEmail{
  email:string
}


export interface updatePassword{
  token:string;
  password:string
}

export interface UpdateGaragiste{
  email?:string;
  id?:number;
  lastName?:string;
  firstName?:string;

}


export interface UserTypeRes{
  id?:number;
  name?:string
}


export interface ActivateUserReq{
  id?:string
}