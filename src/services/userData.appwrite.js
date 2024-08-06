import {  Client, Databases, } from "appwrite";
import userAccountService  from "./user.appwrite";
export class userData{
    client = new Client();
    
    database;
    constructor(){
        this.client
            .setEndpoint(String(import.meta.env.VITE_APPWRITE_URL))
            .setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID))
        
       
        this.database = new Databases(this.client);
    }
    async uploadUserData(){
        try{
            const userAccount = await userAccountService.getAccount();
            const userId = userAccount.$id;
            const user_name = userAccount.name;
            const referral_code = userAccount.$id;
            const coins = '0';
            const email = userAccount.email || '';
            const userRank = '0';
            const avatar = ''

            const userData =  await this.database.createDocument(
                String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
                String(import.meta.env.VITE_APPWRITE_COLLECTION_USER_ID),
                userId,
                {
                    userId,
                    user_name,
                    referral_code,
                    coins,
                    email,
                    rank: userRank,
                    avatar
                }
            )
            return [userData, null]

        }catch(error){
            console.log("Error while uploading user data", error.message);
            throw error;
            return [null, error]
        }
    }

    async  updateDocument(userId, data){
        try{
            console.log("Updating user data", userId, data);
            return await this.database.updateDocument(
                String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
                String(import.meta.env.VITE_APPWRITE_COLLECTION_USER_ID),
                userId,
                data
            )
        }catch(error){
            console.log("Error while updating user data", error.message);
            throw error;
        }

    }

    async getUserData(userId){
        try{
            return await this.database.getDocument(
                String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
                String(import.meta.env.VITE_APPWRITE_COLLECTION_USER_ID),
                userId
            )
        }catch(error){
            console.log("Error while getting user data", error.message);
            throw error;
        }
    }

    async deleteDocument(userId){   
        try{
            return await this.database.deleteDocument(
                String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
                String(import.meta.env.VITE_APPWRITE_COLLECTION_USER_ID),
                userId
            )
        }catch(error){
            console.log("Error while deleting user data", error.message);
            throw error;
        }
    }
    
}

const userdata = new userData();
export default userdata;