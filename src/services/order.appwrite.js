import { Client, ID, Databases } from "appwrite";


export class OrderDetails{
    client = new Client()
    databases;

    constructor(){
        this.client
            .setEndpoint(String(import.meta.env.VITE_APPWRITE_URL))
            .setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID))
        
        this.databases = new Databases(this.client)
    }

    async createOrder( orderDetails){
        try{
            return await this.databases.createDocument(
                String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
                String(import.meta.env.VITE_APPWRITE_COLLECTION_ORDER_ID),
                ID.unique(),
                orderDetails
            )
        }catch(error){
            console.log("Error while creating order", error.message);
            throw error;
        }
    }
}

const orderDetails = new OrderDetails();
export default orderDetails;