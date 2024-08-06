const url = "https://panel.how2mc.xyz";
const api_key = "ptla_aap6jlHVZ8XT6EfIN9sRRwuUZ1QgUNcQz59oE2fDtpX";
fetch(`${url}/api/application/servers`, {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${api_key}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data.data);
    console.log(data.data[0].attributes.limits);
  })
  .catch((err) => console.error(err));
