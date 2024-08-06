import { Client, Databases, ID, Storage } from "appwrite";

export class fileService {
  client = new Client();
  databases;
  bucket ;

  constructor() {
    this.client
      .setEndpoint(String(import.meta.env.VITE_APPWRITE_URL))
      .setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID));

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        String(import.meta.env.VITE_APPWRITE_BUCKET_AVATAR_ID),
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Error while uploading file", error.message);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      return  await this.bucket.deleteFile(
        String(import.meta.env.VITE_APPWRITE_BUCKET_AVATAR_ID),
        fileId
      );
    } catch (error) {
      console.log("Error while deleting file", error.message);
      throw error;
    }
  }

   getFilePreview(fileId) {
    try {
      return  this.bucket.getFilePreview(
        String(import.meta.env.VITE_APPWRITE_BUCKET_AVATAR_ID),
        fileId
      );
    } catch (error) {
      console.log("Error while getting file preview", error.message);
      throw error;
    }
  }

  async downloadFile(fileId) {
    try {
      return await this.bucket.getFileDownload(
        String(import.meta.env.VITE_APPWRITE_BUCKET_AVATAR_ID),
        fileId
      );
    } catch (error) {
      console.log("Error while downloading file", error.message);
      throw error;
    }
  }
}

const avatarFileServiceInstance = new fileService();
export default avatarFileServiceInstance;
