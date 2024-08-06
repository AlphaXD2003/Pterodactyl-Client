import { Client, Databases } from "appwrite";

export class User{
    client = new Client()
    databases;
    constructor(){
        this.client
            .setEndpoint(String(import.meta.env.VITE_APPWRITE_URL))
            .setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID))
        this.databases = new Databases(this.client)

    }
    
    async getUserDetails(userId){
        try {
            return [ await this.databases.getDocument(
                String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
                String(import.meta.env.VITE_APPWRITE_COLLECTION_USER_ID),
                userId
            ), null]
        } catch (error) {
            return [null, error]
        }
    }
}

const userDetails = new User();

export default userDetails;