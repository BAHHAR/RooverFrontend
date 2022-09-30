import { IBookingAdmin } from "../../../interfaces/IBooking";

export interface BookingAdminRes{
    booking:IBookingAdmin[]
}


export interface BookingUpdateReq{
    id:number
    status:string;
}

export interface addBooking{
    date:string;
    carEngineId:string|undefined;
    garageId:number;
    prestations:{
        prestationId:number
    }[];
    userId:string|undefined;
    status:string;
}
