import { userDetails } from "../appwrite";


const getUserInfo = async (userId) => {
    
        const [response, error] = await userDetails.getUserDetails(userId)
        
        return [response, error];
   
}

export default getUserInfo;