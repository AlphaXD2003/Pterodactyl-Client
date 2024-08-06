import {Client, Databases} from 'appwrite'
export class Contact{
    client = new Client()
    databases;

    constructor(){
        this.client
            .setEndpoint(String(import.meta.env.VITE_APPWRITE_URL))
            .setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID))
        this.databases = new Databases(this.client)
    }

    async fetchAllCOntacts(){
        try {
            return await this.databases.listDocuments(
                String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
                String(import.meta.env.VITE_APPWRITE_COLLECTION_CONTACT_ID),
            )
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async deleteContact(cid){
        try {
            return await this.databases.deleteDocument(
                String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
                String(import.meta.env.VITE_APPWRITE_COLLECTION_CONTACT_ID),
                cid
            )
        } catch (error) {
            console.error(error)
            return null;
        }
    }

    async changeState(cid, boolValue ){
        try{
            return await this.databases.updateDocument(
                String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
                String(import.meta.env.VITE_APPWRITE_COLLECTION_CONTACT_ID),
                cid,
                {
                    accepted: boolValue
                }
            )
        }catch(error){
            console.error(error)
            return null;
        }
    }
}

const contactDetais =new Contact()
export default contactDetais;