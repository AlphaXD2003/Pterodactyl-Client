import { Client, Databases, ID } from "appwrite";

export class Vouchers {
  client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
    this.database = new Databases(this.client);
  }

  async createVoucher(coins, use, expiry) {
    try {
      return await this.database.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_VOUCHER_ID,
        ID.unique(),
        {
          coins,
          use,
          expiry,
        }
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllVouchers() {
    try {
      return await this.database.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_VOUCHER_ID
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getVoucher(voucherId) {
    try {
      return await this.database.getDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_VOUCHER_ID,
        voucherId
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateVoucher(voucherId, data) {
    try {
      return await this.database.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_VOUCHER_ID,
        voucherId,
        {
          ...data,
        }
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async deleteVoucher(voucherId) {
    try {
      return await this.database.deleteDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_VOUCHER_ID,
        voucherId
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
const voucherObj = new Vouchers();
export default voucherObj;
