import { Client, Databases } from "appwrite";


export class Products{
    client = new Client()
    databases
    constructor(){
        this.client
            .setEndpoint(String(import.meta.env.VITE_APPWRITE_URL))
            .setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID))

        this.databases = new Databases(this.client)
    }

    async getProducts(){
        try{
            const products = await this.databases.listDocuments(
                String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
                String(import.meta.env.VITE_APPWRITE_COLLECTION_PRODUCT_ID)
            )
            
            return products
        }catch(e){
            console.error(e)
            throw e
        }
    }
}

const products = new Products()
export default products;