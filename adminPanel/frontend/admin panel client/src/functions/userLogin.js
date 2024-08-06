import { userAuthService } from "../appwrite";

const userLogin  = async({email, password}) => {
    console.log(email, password)
    const loginResponse = await userAuthService.login({email, password});
    return loginResponse;
}

export default userLogin;