import axios from "axios";

class API {
  async delete(url) {
    if (!url) {
      console.error("URL is not defined");
      return [undefined, new Error("URL is not defined")];
    }
    let response = undefined;
    let error = undefined;
    console.log("Running deleteAPI");
    try {
      console.log(url);
      response = await axios.delete(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_PTERODACTYL_API_KEY}`,
        },
      });
      
    } catch (err) {
      error = err;
      console.log(error);
    }
    return [response, error];
  }
}
const deleteAPI = new API();
export default deleteAPI;
