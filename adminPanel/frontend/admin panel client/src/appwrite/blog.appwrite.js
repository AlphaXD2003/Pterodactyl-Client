import { Client, Databases, Query } from "appwrite";

export class BlogDetails {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(String(import.meta.env.VITE_APPWRITE_URL))
      .setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID));

    this.databases = new Databases(this.client);
  }

  async createBlog({ status, content, featuredImage, title, userId, slug }) {
    try {
      return [
        await this.databases.createDocument(
          String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
          String(import.meta.env.VITE_APPWRITE_COLLECTION_BLOG_ID),
          slug,
          { status, content, featuredImage, title, userId }
        ),
        null,
      ];
    } catch (error) {
      return [null, error];
    }
  }

  async getBlogDetails(blogId) {
    try {
      console.log("Blog id is: ", blogId);
      return [
        await this.databases.getDocument(
          String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
          String(import.meta.env.VITE_APPWRITE_COLLECTION_BLOG_ID),
          blogId
        ),
        null,
      ];
    } catch (error) {
      return [null, error];
    }
  }

  async getAllBlogs() {
    try {
      return [
        await this.databases.listDocuments(
          String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
          String(import.meta.env.VITE_APPWRITE_COLLECTION_BLOG_ID)
        ),
        null,
      ];
    } catch (error) {
      return [null, error];
    }
  }

  async getActiveBlogs(queries = [Query.equal("status", "active")]) {
    try {
      return [
        await this.databases.listDocuments(
          String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
          String(import.meta.env.VITE_APPWRITE_COLLECTION_BLOG_ID),
          queries
        ),
        null,
      ];
    } catch (error) {
      return [null, error];
    }
  }

  async updateBlog(blogId, { title, content, featuredImage, status }) {
    try {
      return [
        await this.databases.updateDocument(
          String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
          String(import.meta.env.VITE_APPWRITE_COLLECTION_BLOG_ID),
          blogId,
          { title, content, featuredImage, status }
        ),
        null,
      ];
    } catch (error) {
      return [null, error];
    }
  }

  async deleteBlog(blogId) {
    try {
      return [
        await this.databases.deleteDocument(
          String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
          String(import.meta.env.VITE_APPWRITE_COLLECTION_BLOG_ID),

          blogId
        ),
        null,
      ];
    } catch (error) {
      return [null, error];
    }
  }
}

const blogDetails = new BlogDetails();
export default blogDetails;
