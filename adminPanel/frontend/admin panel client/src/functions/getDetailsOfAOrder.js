import { orders } from "../appwrite";

const getOrderDetail = async (orderId) => {
    const [response, error] = await orders.getOrderDetails(orderId);
    if(error) return [null ,error]
    
    return [response , null]
}

export default getOrderDetail;