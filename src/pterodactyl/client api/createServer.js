const url = "https://panel.how2mc.xyz";
const api_key = "ptla_aap6jlHVZ8XT6EfIN9sRRwuUZ1QgUNcQz59oE2fDtpX";

async function createServer() {
  try {
    const response = await fetch(`${url}/api/application/servers`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${api_key}`,
      },
      body: JSON.stringify({
        name: "Building1",
        user: 1,
        egg: 3,
        docker_image: "quay.io/pterodactyl/core:java",
        startup: "java -Xms128M -Xmx128M -jar server.jar",
        environment: {
          PAPER_VERSION: "latest",
          BUILD_NUMBER: "latest",
          SERVER_JARFILE: "server.jar",
        },
        limits: {
          memory: 1728,
          swap: 0,
          disk: 4002,
          io: 500,
          cpu: 100,
        },
        feature_limits: {
          databases: 5,
          backups: 1,
          allocations: 1,
        },
        deploy: {
          locations: [1],
          dedicated_ip: false,
          port_range: [],
        },
        allocation: {
          default: 3,
          additional: [],
        },
      }),
    });

    if (!response.ok) {
      const text = await response.json();
      console.log(response.status, text.errors[0].meta);
      return;
    }

    console.log("Server created successfully");
    const json = await response.json();
    console.log(json);
  } catch (err) {
    console.error("Error is", err);
  }
}

createServer();