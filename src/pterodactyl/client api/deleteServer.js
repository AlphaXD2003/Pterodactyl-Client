const url = "https://panel.how2mc.xyz";
const api_key = "ptla_aap6jlHVZ8XT6EfIN9sRRwuUZ1QgUNcQz59oE2fDtpX";

fetch(`${url}/api/application/servers/23`, {
  method: "DELETE",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${api_key}`,
  },
})
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
