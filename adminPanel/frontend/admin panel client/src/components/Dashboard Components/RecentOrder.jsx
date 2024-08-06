import React, { useEffect } from 'react'
import { getOrderDetail,  getUserInfo} from '../../functions'
import { TableCell, TableRow } from '@mui/material';
const RecentOrder = ({order}) => {
    
    const [orderDetails, setOrderDetails] = React.useState({})
    const [userDetails, setUserDetails] = React.useState({})
    useEffect(()=>{
        const fetchDetails = async() => {

            const [response, error] = await getOrderDetail(order.$id)
            
            setOrderDetails(response)
        }
        fetchDetails()
    }, [])
    useEffect(() => {
        if(Object.keys(orderDetails).length !== 0 ){
            
            const fetchDetails = async() => {
                const [response, error] = await getUserInfo(order?.buyerId)
                if(!error)setUserDetails(response)
            }
           fetchDetails()
        }
    }, [orderDetails])
  return (
    <>
    {orderDetails&& userDetails && 
        <TableRow>
            <TableCell>{orderDetails.$id}</TableCell>
            <TableCell>{orderDetails.productId}</TableCell>
            <TableCell>{userDetails.user_name}</TableCell>
            <TableCell>{orderDetails.total}</TableCell>
            <TableCell>{String(orderDetails.success)}</TableCell>
        </TableRow>
    }
    </>
  )
}

export default RecentOrder;