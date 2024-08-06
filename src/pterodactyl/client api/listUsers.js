// const url = "https://panel.how2mc.xyz";
const url = "http://ptero-client.how2mc.xyz";
const api_key = "ptla_aap6jlHVZ8XT6EfIN9sRRwuUZ1QgUNcQz59oE2fDtpX";
console.log(url);
fetch(`${url}/api/application/users`, {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${api_key}`,
  },
})
  .then((res) => res.json())
  .then((json) => {
    json.data.forEach((v) => {
      console.log(" User: ", v.attributes);
    });

    console.log(typeof json.data);
  })
  .catch((err) => console.error(err));
