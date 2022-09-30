import React ,{useState}from 'react'
import MySpin from "../../../components/Ui/Spin";
import MyBreadcrumb from "../../../components/Ui/MyBreadcrumb";
import BookingTables from '../../../components/tables/BookingTables';
import { BookingApi } from '../../../store/apis/Bookings';
function Bookings() {
    const {data,isLoading}=BookingApi.useGetAllQuery()
    if(isLoading) return <MySpin/>
    return(
        <div>
        <MyBreadcrumb link={{ link: "/Bookings", title: "Bookings" }} />
        
        <BookingTables bookings={data?.booking!} />
        
      </div>
    )
}

export default Bookings