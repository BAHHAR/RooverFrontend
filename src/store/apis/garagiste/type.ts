import { IGaragiste } from "../../../interfaces/IGaragiste";

export interface GaragistesRes{
    garages:IGaragiste[]
}


export interface GarageIdReq{
    id:string;
}


export interface GarageRes{
    garage:IGaragiste
}

export interface GarageLogo{
    id:string;
    logo:string;
}

export interface GaragePrest{
    prestationId?:string;
    garageId?:string;
    price?:number;
    
}

export interface GarageBusinessHour{
    day_of_week:number;
    garageId?:string;
    open_time?:string;
    close_time?:string;
}

export interface ImageDelete{
    id:string;
    ImageName:string
}

export interface GaregeDelete{
    id:string;
}

export interface GaragePrestations{
    prestationId?:string;
    garageId?:string;
    price?:number;
    carMakeId?:number;
    carModelId?:number;
    prestation?:{
        prestationCategory?:{
            name?:string;
        }
    }
}


export interface GaragePrestReq{
    prestations:GaragePrestations[]
}


export interface GarageFindReq{
    lat:number|undefined;
    lng:number|undefined;
    prestationIds:(string|undefined)[]
}


export interface GarageFindRes{
        id?:number;
        name?:string;
        address?:string;
        prestations:{
            price:string;
            prestation:{
                id?:number;
                name?:number;
            },
            carMakeId?:number    
            carModelId:number
        }[]
        businessHours:{
            dayOfWeek?:number;
            openTime:string;
            closeTime?:string;
        }[]
        lat:number;
        lng:number;
        distance:number;
        logo:string;
        reviews:number;
    
}