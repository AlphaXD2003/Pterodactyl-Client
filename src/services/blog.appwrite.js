import { Client, Databases, Storage, ID, Query } from "appwrite";

class blogServiceClass {
  client = new Client();
  bucket;
  databases;
  constructor() {
    this.client
      .setEndpoint(String(import.meta.env.VITE_APPWRITE_URL))
      .setProject(String(import.meta.env.VITE_APPWRITE_PROJECT_ID));
    this.bucket = new Storage(this.client);
    this.databases = new Databases(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
        String(import.meta.env.VITE_APPWRITE_BUCKET_BLOG_ID),
        slug,
        {
          title: title,
          slug: slug,
          content: content,
          featuredImage: featuredImage,
          status: status,
        }
      );
    } catch (error) {
      console.log("Error while creating post", error.message);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return this.databases.updateDocument(
        String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
        String(import.meta.env.VITE_APPWRITE_BUCKET_BLOG_ID),
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Error while updating post", error.message);
    }
  }

  async getActiveBlogs(queries = [Query.equal("status", "active")]) {
    try {
      const result = 
      await this.databases.listDocuments(
        String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
        String(import.meta.env.VITE_APPWRITE_COLLECTION_BLOG_ID),
        queries
      );
      return result;
    } catch (error) {
      return [null, error];
    }
  }
  async deletePost(slug) {
    try {
      return this.databases.deleteDocument(
        String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
        String(import.meta.env.VITE_APPWRITE_COLLECTION_BLOG_ID),
        slug
      );
    } catch (error) {
      console.log("Error while deleting post", error.message);
      throw error;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
        String(import.meta.env.VITE_APPWRITE_COLLECTION_BLOG_ID),
        queries
      );
    } catch (error) {
      console.log("Error while getting posts", error.message);
      throw error;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
        String(import.meta.env.VITE_APPWRITE_COLLECTION_BLOG_ID),
        slug
      );
    } catch (error) {
      console.log("Error while getting post", error.message);
      throw error;
    }
  }
}

const blogService = new blogServiceClass();
export default blogService;
