export interface IGaragiste{
    id?:string;
    name?:string;
    address?:string;
    lat?:number;
    lng?:number;
    phone?:string;
    logo?:string;
    open_date?:string;
    experienceYears?:number;
    workerNumber?:number;
    email?:string;
    openDate?:string;
    images?:[{
        path?:string
    }]
    prestations?:IPrestationGar[]
    userType:{
        name?:string
    },
    user?:{
        id?: number,
        lastName?:string,
        firstName?:string,
        email?:string 
    }
}


export interface IGaragePrestation{
    id?:string;
    categoryId?:string;
    garageId?:string;
    price?:number;
}


export interface IPrestationGar{
    price?:string;
    prestation?:{
        name?:string;
        prestationCategory?:{
            name?:string;
        }
    }
}