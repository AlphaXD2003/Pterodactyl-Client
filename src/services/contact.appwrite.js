import { Client, Databases } from "appwrite"

export class Contact{
    client = new Client()
    databases
    constructor(){
        this.client
            .setEndpoint(String(import.meta.env.VITE_APPWRITE_URL)) // Your API Endpoint
            .setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID)) // Your project ID

        this.databases = new Databases(this.client)
    }
    async createContact(userid ,email, message){
       try {
        const res =  this.databases.createDocument(
            String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
            String(import.meta.env.VITE_APPWRITE_COLLECTION_CONTACT_ID),
            userid,
            {
            userId : userid,
            email,
            content : message
        })
        return [res, null]
       } catch (error) {
              console.error("Error creating contact: ", error)
              return [null, error]
       }
    }

    async getContact(){
        try {
            return this.databases.listDocuments(String(import.meta.env.VITE_APPWRITE_COLLECTION_CONTACT_ID))
        } catch (error) {
            console.error("Error getting contact: ", error)
            throw error
        }
    }

    async deleteContact(id){
        try {
            return this.databases.deleteDocument(String(import.meta.env.VITE_APPWRITE_COLLECTION_CONTACT_ID), id)
        } catch (error) {
            console.error("Error deleting contact: ", error)
            throw error
        }
    }

    async getContactById(id){
        try {
            return [ await this.databases.getDocument(
                String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
                String(import.meta.env.VITE_APPWRITE_COLLECTION_CONTACT_ID), 
                id), null]
        } catch (error) {
            console.error("Error getting contact by ID: ", error)
            return [null, error]
        }
    }

    async updateContact(id, email, message){
        try {
            return this.databases.updateDocument(String(import.meta.env.VITE_APPWRITE_COLLECTION_CONTACT_ID), id, {
                email,
                message
            })
        } catch (error) {
            console.error("Error updating contact: ", error)
            throw error
        }
    }

}

const contact = new Contact()
export default contact;