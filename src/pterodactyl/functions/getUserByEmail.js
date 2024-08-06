import apiCall from "./getAPI";
async function getUserByEmail(email){
    console.log('req email: ', email)
    const [userResponse, userError] = await apiCall.get("/api/application/users");
    if(userError){
        return [null, userError];
    }
    const users = userResponse;
    const user = users.data.data.find((u) => u.attributes.email === email);
    if(!user){
        return [null, new Error("User not found")];
    }
    return [user, null];
}
export default getUserByEmail;