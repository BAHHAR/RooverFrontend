import { IMarque } from "../../../interfaces/IMarque";

export interface MarqueRes{
    marques:IMarque[]
}

export interface AddMarqueReq{
    name:string;
}