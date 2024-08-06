import { Client, Account, ID } from "appwrite";

export class authService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(String(import.meta.env.VITE_APPWRITE_URL))
      .setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID));

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      return userAccount;
    } catch (error) {
      console.log("Error while creating a user account", error.message);
      throw error;
    }
  }
  async login({ email, password }) {
    try {
        console.log(email, password)
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Error while logging in", error.message);
      throw error;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Error while logging out", error.message);
      throw error;
    }
  }
  async getAccount() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Error while getting account", error.message);
      throw error;
    }
  }
  async getUser(userId) {
    try {
      return await this.account.get(userId);
    } catch (error) {
      console.log("Error while getting user", error.message);
      throw error;
    }
  }
  async deleteAccount(id) {
    try {
      return await this.account.deleteIdentity(id)
    } catch (error) {
      console.log("Error while deleting account", error.message);
      throw error;
    }
  }
  
  
}

const userAuthService = new authService();
export default userAuthService;
