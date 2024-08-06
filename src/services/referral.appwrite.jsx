import { Client, Databases } from "appwrite";

export class referralClass{
    client = new Client()
    database
    constructor(){
        this.client
            .setEndpoint(String(import.meta.env.VITE_APPWRITE_URL))
            .setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID))
        this.database = new Databases(this.client)
    }

    async createReferralDocument(userId){
        try {
            const userReferralRespnse = await this.database.createDocument(
                String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
                String(import.meta.env.VITE_APPWRITE_COLLECTION_REFERRAL_ID),
                userId,
                {
                    referralCode: userId,
                    
                }
            )
            return [userReferralRespnse, null]
        } catch (error) {
            console.error(error.message)
            return [null, error]
        }
    }

    async getReferralDocument(userId){
        try {
            const userReferralResponse = await this.database.getDocument(
                String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
                String(import.meta.env.VITE_APPWRITE_COLLECTION_REFERRAL_ID),
                userId
            )
            return [userReferralResponse, null]
        } catch (error) {
            console.error(error.message)
            return [null, error]
        }
    }

    async updateReferralDocument(userId, data){
        try {
            const userResponse =  await this.database.updateDocument(
                String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
                String(import.meta.env.VITE_APPWRITE_COLLECTION_REFERRAL_ID),
                userId,
                data
            )
            return [userResponse, null]
        } catch (error) {
            console.error(error.message)
            return [null, error]
        }
    }
    
    async getReferralDocumentByReferralCode(referralCode){
        try {
            const userReferralResponse = await this.database.listDocuments(
                String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
                String(import.meta.env.VITE_APPWRITE_COLLECTION_REFERRAL_ID),
                1,
                0,
                `referralCode=${referralCode}`
            )
            return [userReferralResponse, null]
        } catch (error) {
            console.error(error.message)
            return [null, error]
        }
    }

    async deleteReferralDocument(userId){
        try {
            const userResponse = await this.database.deleteDocument(
                String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
                String(import.meta.env.VITE_APPWRITE_COLLECTION_REFERRAL_ID),
                userId
            )
            return [userResponse, null]
        } catch (error) {
            console.error(error.message)
            return [null, error]
        }
    }

    async removeReferredUser(referringUserId, deletedUserId) {
        try {
            // Get the referral document of the referring user
            const [referralDoc, error] = await this.getReferralDocument(referringUserId);
            if (error) {
                throw error;
            }
    
            // Filter out the deleted user from the referredUsers array
            const updatedReferredUsers = referralDoc.referredUsers.filter(userId => userId !== deletedUserId);
    
            // Update the referring user's referral document with the new referredUsers array
            const [updateResponse, updateError] = await this.updateReferralDocument(referringUserId, { referredUsers: updatedReferredUsers });
            if (updateError) {
                throw updateError;
            }
    
            return [updateResponse, null];
        } catch (error) {
            console.error(error.message);
            return [null, error];
        }
    }
}

const referral = new referralClass()
export default referral;