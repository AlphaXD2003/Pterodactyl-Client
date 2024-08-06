import { Client, Databases, ID } from "appwrite";

export class Announcement {
  client = new Client();
  databases;
  constructor() {
    this.client
      .setEndpoint(String(import.meta.env.VITE_APPWRITE_URL))
      .setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID));
    this.databases = new Databases(this.client);
  }

  async newAnnouncement(data) {
    try {
      return await this.databases.createDocument(
        String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
        String(import.meta.env.VITE_APPWRITE_ANNOUNCEMET_ID),
        ID.unique(),
        {
            content: data,
        }
      );
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async fetchAllAnnouncements() {
    try {
      return await this.databases.listDocuments(
        String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
        String(import.meta.env.VITE_APPWRITE_ANNOUNCEMET_ID)
      );
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async deleteAnnouncement(id){
    try {
        return await this.databases.deleteDocument(
            String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
            String(import.meta.env.VITE_APPWRITE_ANNOUNCEMET_ID),
            id
        )
    } catch (error) {
        console.log(error.message);
        throw error;
    }
  }
}

const announcementDetails = new Announcement()
export default announcementDetails;