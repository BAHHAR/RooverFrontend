import { IVehicule } from "../../../interfaces/IVehicule";

export interface VehiculeRes{
    vehicules:IVehicule[]
}


export interface VehiculeFuel{
    id?:string;
    name?:string  
}


export interface VehiculeModel{
    id?:string;
    name?:string;
    carMakeId?:string;
}



export interface addMarque{
    name?:string;
}

export interface addModel{
    name:string;
    carMakeId:string;
}


export interface IDeleteVehic{
    id:string;
}