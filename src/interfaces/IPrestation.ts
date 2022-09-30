export interface IPrestations{
    id?:string;
    name?:string;
    categoryId?:string;
}


export interface IPrestationsCategory{
    id?:string;
    name?:string;
    prestationCategory:{
        name?:string
    }
}


export interface IDeletePrest{
    id:string;
}
