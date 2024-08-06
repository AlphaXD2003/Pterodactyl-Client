import {Client, Databases} from 'appwrite'
export class Orders{
    client = new Client()
    database;

    constructor(){
        this.client
            .setEndpoint(String(import.meta.env.VITE_APPWRITE_URL))
            .setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID))
        this.database = new Databases(this.client)
    }

    async getAllOrders(){
        try {
            return [ await this.database.listDocuments(
                String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
                String(import.meta.env.VITE_APPWRITE_COLLECTION_ORDER_ID)
            ), null]
        } catch (error) {
            return [null , error]
        }
    }

    async getOrderDetails(orderId){
        try {
            return [ await this.database.getDocument(
                String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
                String(import.meta.env.VITE_APPWRITE_COLLECTION_ORDER_ID),
                orderId
            ) , null]
        } catch (error) {
            return [null , error]
        }
    }



}
const orders = new Orders()
export default orders;