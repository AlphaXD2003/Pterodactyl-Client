import { orders } from "../appwrite";

const getRecentOrders = async () => {
  try {
    const [response, error] = await orders.getAllOrders();

    if (error) {
      console.log("Error while getting recent order lists.\n", error);
      return [null, error];
    }

    const totalresponses = response.total;
    const responseDocuments = response.documents; // responseDocuments is array of objects

    if (totalresponses === 0) {
      return console.log(
        "No records were found while getting the lists of the orders."
      );
    }

    responseDocuments.sort(
      (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)
    );

    let finalResponse = responseDocuments.slice(0, 10);

    return [finalResponse, null];
  } catch (error) {
    console.log("Error while getting recent order lists.\n", error);
    return [null , error]
  }
};


export default getRecentOrders;