import apiCall from "./getAPI.js";
async function getUsersServer(email) {
  const [usersResponse, usersError] = await apiCall.get(
    "/api/application/users"
  );
  if (usersError) {
    return [null, usersError];
  }
  console.log("Email: ", email);
  const users = usersResponse;
  console.log("Users: ", users);
  const user = users.data.data.find((u) => u.attributes.email === email);
  console.log("User: ", user);
  if (!user) {
    return [null, new Error("User not found")];
  }
  const userid = user.attributes.id;
  const [serverResponse, serverError] = await apiCall.get(
    "/api/application/servers"
  );
  console.log("Server Response: ", serverResponse.data.data);
  const server = serverResponse.data.data.filter(
    (s) => s.attributes.user === userid
  );
  console.log("Server: ", server);
  if (!server) {
    return [null, serverError];
  }
  return [server, null];
}
export default getUsersServer;
