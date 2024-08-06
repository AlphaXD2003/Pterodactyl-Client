import axios from "axios";

class API {
  async post(url, bodyData, token) {
    if (!url) {
      console.error("URL is not defined");
      return [undefined, new Error("URL is not defined")];
    }
    let response = undefined;
    let error = undefined;
    console.log("Running getAPI");
    try {
      console.log(url);
      console.log('Body data : ',bodyData)
      response = await axios.post(url,  bodyData, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_PTERODACTYL_API_KEY}`,
          },
      });
      console.log("Response is  ", response);
    } catch (err) {
      error = err;
      console.log(error);
    }
    return [response, error];
  }
}
const postApi = new API();
export default postApi;
