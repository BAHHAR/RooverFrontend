export interface IBookingAdmin{
    date?:string;
    Garage?:{
        name?:string;  
        userId:number;      
        id:number;
        logo:string;
        prestations:{
            price?:number;
            prestation:{
                name?:string;
                
                id?:number;
                prestationCategory:{
                    name:string;
                }
            }
        }[],
    },
    CarEngine?:{
        name?:string;
        carModel?:{
            carMake?:{
                name?:string
            }
        }
    },
    
   
    status:string;
    user:{
        lastName?:string;
        firstName?:string;
        id:string|undefined;
    }
}