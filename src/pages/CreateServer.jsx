import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import FilledInput from "@mui/material/FilledInput";
import { Button } from "@mui/material";
import apiCall from "../pterodactyl/functions/getAPI";
import postAPI from "../pterodactyl/functions/postAPI";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";

import { ThreeDots } from "react-loader-spinner";
import  getuserserver from "../pterodactyl/functions/getUsersServer"
import userdata from "../services/userData.appwrite";
import { set } from "react-hook-form";
function LocationCard({
  img,
  Country,
  City,
  MaxSlots,
  CurrentSlot,
  Latency,
  onClick,
  text,
}) {
  return (
    <Button onClick={onClick}>
      <div className="w-[350px] h-[100px] bg-neutral-500 flex flex-row justify-between p-2 rounded-lg cursor-pointer hover:shadow hover:shadow-neutral-900 items-center mt-2">
        <img src={img} className="h-10 w-[40px]" />
        <div className="flex flex-col">
          <div className="text-xl text-neutral-900 font-bold">
            {Country},{City}
          </div>
          <div className="text-orange-400">
            Servers: {CurrentSlot}/{MaxSlots}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-neutral-900 font-semibold"> {Latency}</div>
          <div className="text-white"> {text}</div>
        </div>
      </div>
    </Button>
  );
}

function CreateServer() {
  const user = useSelector((state) => state.user.userData);
  //limits of the user
  const [limits, setLimits] = useState({
    serverAmount: 3,
    cpu: 120,
    memory: 6144,
    disk: 14336,
    backup: 3,
    allocation: 3,
    database: 3,
  });

  const getServerLimits = async () => {
    try {
      console.log("User limit of user id: ", user.$id);
      const limitResponse = await userdata.getUserData(user.$id);
      const limit = await JSON.parse(limitResponse.limits);
      console.log("USer limits: ", limit);
      setLimits(limit);
    } catch (error) {
      console.error(error);
    }
  };


  const [isLoading, setIsLoading] = useState(true);
  //navigate
  const navigate = useNavigate();
  const [totalMemory, setTotalMemory] = useState(0);
  const [totalCPU, setTotalCPU] = useState(0);
  const [totalDisk, setTotalDisk] = useState(0);
  const [totalPort, setTotalPort] = useState(0);
  const [totalBackup, setTotalBackup] = useState(0);
  const [totalDatabase, setTotalDatabase] = useState(0);

   // total server count
   const [totalServer, setTotalServer] = useState(0);
  //get users server info
  async function getUsersServer() {
    // const [response, error] = await apiCall.get(
    //   "https://panel.how2mc.xyz/api/application/servers"
    // );
    const [response, error] = await getuserserver(localStorage.email)
    
    if (error) {
      console.error("Error while getting users server", error);
      return;
    }
    if(response === null){
      return;
    }
    console.log(response)
    
    console.log('Users Server: ', response)
    
    setTotalServer(response.length);
    console.log("Total Server: ", totalServer);

    //get the total memory, cpu and disk
    const totalMemory = response.reduce((acc, server) => {
      return acc + server.attributes.limits.memory;
    }, 0);

    const totalCPU = response.reduce((acc, server) => {
      return acc + server.attributes.limits.cpu;
    }, 0);

    const totalDisk = response.reduce((acc, server) => {
      return acc + server.attributes.limits.disk;
    }, 0);

    // get total port, backup and database
    const totalPort = response.reduce((acc, server) => {
      return acc + server.attributes.feature_limits.allocations;
    }, 0);

    const totalBackup = response.reduce((acc, server) => {
      return acc + server.attributes.feature_limits.backups;
    }, 0);

    const totalDatabase = response.reduce((acc, server) => {
      return acc + server.attributes.feature_limits.databases;
    }, 0);

    console.log("Total Memory: ", totalMemory);
    console.log("Total CPU: ", totalCPU);
    console.log("Total Disk: ", totalDisk);
    console.log("Total Port: ", totalPort);
    console.log("Total Backup: ", totalBackup);
    console.log("Total Database: ", totalDatabase);

    // set value
    setCpu(limits.cpu - totalCPU);
    setMemory(limits.memory- totalMemory);
    setDiskSpace(limits.disk- totalDisk);
    setAdditionalPorts(limits.allocation - totalPort);
    setBackups(limits.backup - totalBackup);
    setDatabases(3 - totalDatabase);

    setTotalMemory(totalMemory);
    setTotalCPU(totalCPU);
    setTotalDisk(totalDisk);
    setTotalPort(totalPort);
    setTotalBackup(totalBackup);
    setTotalDatabase(totalDatabase);
  }
  async function handleLocationClick(locationId, nodes) {
    console.log("Selected Location ID is : ", locationId);
    console.log("All nodes ", nodes);
    const node = nodes.filter(
      (node) => node.attributes.location_id === locationId
    );
    console.log("Nodes under", locationId, " is : ", node);
    setNodesOfLocation(node);
    const lInfo = await apiCall.get(
      `/api/application/locations/${locationId}`
    );
    const locationInfo = lInfo[0].data.attributes;
    setLocationDetails(locationInfo);
    setLocationId(locationId);
  }
  async function handleNodeDetails(node) {
    setNodeId(node.attributes.id);
    console.log("Selected Node ID is: ", node.attributes.id);
    const nInfo = await apiCall.get(
      `/api/application/nodes/${node.attributes.id}`
    );
    console.log("Node Info: ", nInfo[0].data.attributes);
    setNodeDetails(nInfo[0].data.attributes);
  }

  // Location
  const [locations, setLocations] = useState([]);
  const [locationId, setLocationId] = useState(null);
  const [locationDetails, setLocationDetails] = useState([]);

  // Node
  const [nodes, setNodes] = useState([]);
  const [nodeId, setNodeId] = useState(null);
  const [nodeDeatils, setNodeDetails] = useState([]);

  // Nodes of Location
  const [nodesOfLocation, setNodesOfLocation] = useState([]);

  // Nests
  const [nests, setNests] = useState([{ attributes: { id: 1 } }]);
  const [nestId, setNestId] = useState(null);
  const [nestDetails, setNestDetails] = useState([]);

  // Egg
  const [eggs, setEggs] = useState([]);
  const [eggId, setEggId] = useState(null);
  const [eggDetails, setEggDetails] = useState([]);

  //  Button Check
  const [nestButtonSelect, setNestButtonSelect] = useState(
    nests[0].attributes.id
  );
  const [eggButtonSelect, setEggButtonSelect] = useState(null);
  const [locationButtonSelect, setLocationButtonSelect] = useState(null);

  // User Id
  const userId = useSelector((state) => state.user.userId);

  //server of users
  useEffect(() => {
    
    getUsersServer();
  }, [limits]);

  //Location Details
  useEffect(() => {
    console.log("Location Details: ", locationDetails);
  }, [locationDetails]);

  //Node Details
  useEffect(() => {
    console.log("Node Details: ", nodeDeatils);
  }, [nodeDeatils]);

  //resource
  const [serverName, setServerName] = useState("Your Server Name");
  const [cpu, setCpu] = useState(limits.cpu);
  const [memory, setMemory] = useState(limits);
  const [diskSpace, setDiskSpace] = useState(limits);
  const [additionalPorts, setAdditionalPorts] = useState(limits.allocation);
  const [backups, setBackups] = useState(limits.backup);
  const [databases, setDatabases] = useState(limits.database);

  // handle text change
  const handleDiskSpaceChange = (event) => {
    setDiskSpace(event.target.value);
  };

  async function getLocations() {
    const [locationResponse, loactionError] = await apiCall.get(
      "/api/application/locations"
    );
    if (loactionError) {
      console.error("Error while getting locations", loactionError);
      return;
    }
    const locations = locationResponse.data.data;
    console.log("Locations: ", locations);
    setLocations(locations);
  }

  async function getNodes() {
    const [nodeResponse, nodeError] = await apiCall.get(
      "/api/application/nodes"
    );
    if (nodeError) {
      console.error("Error while getting nodes", nodeError);
      return;
    }
    const nodes = nodeResponse.data.data;
    console.log("Nodes: ", nodes);
    setNodes(nodes);
  }

  async function getNests() {
    const [nestResponse, nestError] = await apiCall.get(
      "/api/application/nests"
    );
    if (nestError) {
      console.error("Error while getting nests", nestError);
      return;
    }
    console.log("Nests: ", nestResponse.data.data);
    setNests(nestResponse.data.data);
  }

  async function getEggs(nestId) {
    const [eggResponse, eggError] = await apiCall.get(
      `/api/application/nests/${nestId}/eggs`
    );
    if (eggError) {
      console.error("Error while getting eggs", eggError);
      return;
    }
    console.log(`Eggs of : ${nestId}`, eggResponse.data.data);
    setEggs(eggResponse.data.data);
  }

  const [errorMessage, setErrorMessage] = useState(null);

    // setTimeout

    useEffect(() => {
      getServerLimits()
      setTimeout(()=>{
        
        setIsLoading(false)
      }, 1250)
    }, [])


    const [errorOnServerCreate, setErrorOnServerCreate] = useState(null);
  async function handleSubmit() {
    console.log("Server Name: ", serverName);
    console.log("CPU: ", cpu);
    console.log("Memory: ", memory);
    console.log("Disk Space: ", diskSpace);
    console.log("Additional Ports: ", additionalPorts);
    console.log("Backups: ", backups);
    console.log("Databases: ", databases);
    console.log("Location ID: ", locationId);
    console.log("Node ID: ", nodeId);
    console.log("Nest ID: ", nestId);
    console.log("Egg ID: ", eggId);

    // add totals
   
    

    console.log("Total Memory1: ", totalMemory + memory);
    console.log("Total CPU:1 ", totalCPU + cpu);
    console.log("Total Disk:1 ", totalDisk + diskSpace);
    console.log("Total Port: 1", totalPort + additionalPorts);
    console.log("Total Backup: 1", totalBackup + backups);
    console.log("Total Database: 1", totalDatabase + databases) ;

    const newTotalMemory = totalMemory + memory;
    const newTotalCPU = totalCPU + cpu;
    const newTotalDisk = totalDisk + diskSpace;
    const newTotalPort = totalPort + additionalPorts;
    const newTotalBackup = totalBackup + backups;
    const newTotalDatabase = totalDatabase + databases;
    console.log('New total memory: ', newTotalMemory)
    //check total server
    if(totalServer > limits){
      alert("You have exceeded the server limit")
      return
    }

    // check if the user has enough resources
    if (newTotalCPU > limits.cpu) {
      setErrorMessage("You have exceeded the CPU limit");
      
      setCpu(cpu)
      return;
    }
    if(cpu < 30){
      alert("CPU should be greater than 50")
      return;
    }
    if (newTotalMemory > limits.memory) {
      setErrorMessage("You have exceeded the memory limit");
      
      setMemory(memory)
      return;
    }

    if(memory < 2048){
        alert("Memory should be greater than 2048")
        return;
    }

    if (newTotalDisk > 14336) {
      setErrorMessage("You have exceeded the disk space limit");
     
      setDiskSpace(totalDisk)
      return;
    }
    if(diskSpace < 4096){
      alert("Disk space should be greater than 4096")
      return
    }

    if (newTotalPort > limits.allocation) {
      setErrorMessage("You have exceeded the port limit");
     
      setAdditionalPorts(totalPort)
      return;
    }
    if (newTotalBackup > limits.backup) {
      setErrorMessage("You have exceeded the backup limit");
     
      setBackups(totalBackup)
      return;
    }
    if (newTotalDatabase > limits.database) {
      console.log('new total database1:' , newTotalDatabase)
      console.log('new total database2:' , limits.database)
      setErrorMessage("You have exceeded the database limit");
     
      setDatabases(totalDatabase)
      return;
    }



    //Egg details
    const [eggDetails, eggDetailsError] = await apiCall.get(
      `${import.meta.env.VITE_PTERODACTYL_URL}/nests/${nestId}/eggs/${eggId}?include=variables,nest,servers,config,script`
    );

    if (eggDetailsError) {
      console.error("Error while getting egg details", eggDetailsError);
      return;
    }

    console.log("Egg Details: ", eggDetails.data.attributes);
    const eggInfo = eggDetails.data.attributes;
    const docker_image = eggInfo.docker_image;
    const docker_images = eggInfo.docker_images;
    const startup = eggInfo.startup;
    const variables = eggInfo.relationships.variables.data;
    console.log("Variables: ", variables);

    const environment = variables.reduce((acc, variable) => {
      acc[variable.attributes.env_variable] = variable.attributes.default_value;
      return acc;
    }, {});

    console.log("Environment: ", environment);
    console.log("Startup: ", startup);

    console.log("Nodeeeee Id: ", nodeId);

    const body = {
      name: serverName,
      user: userId,
      egg: eggId,
      docker_image: docker_image,
      startup: startup,
      environment: environment,
      limits: {
        memory: memory,
        swap: 0,
        disk: diskSpace,
        io: 500,
        cpu: cpu,
      },
      feature_limits: {
        databases: databases,
        backups: backups,
        allocations: 1,
      },
      deploy: {
        locations: [locationId],
        dedicated_ip: false,
        port_range: [],
      },
      allocation: {
        default: nodeId,
        additional: [],
      },
    };

    console.log("Body: ", body);

    // send the request
    const [response, error] = await postAPI.post(
      `/api/application/servers`,
      body,
      import.meta.env.VITE_PTERODACTYL_API_KEY
    );
    if (error) {
      setErrorOnServerCreate(error);
      console.error("Error while creating server", error.message);
      return;
    }
    console.log("Server created successfully");
    console.log("Response: ", response);
    navigate("/");
  }
  useEffect(() => {
    console.log(locationId);
  }, [locationId]);

  useEffect(() => {
    console.log("Nest Id : ", nestId);
  }, [nestId]);

  useEffect(() => {
    console.log("Egg Id : ", eggId);
  }, [eggId]);
  useEffect(() => {
    getLocations();
    getNodes();
    getNests();
    getEggs(nests[0].attributes.id);
  }, []);

  useEffect(() => {
    console.log("Server Name: ", serverName);
    console.log("CPU: ", cpu);
    console.log("Memory: ", memory);
    console.log("Disk Space: ", diskSpace);
    console.log("Additional Ports: ", additionalPorts);
    console.log("Backups: ", backups);
    console.log("Databases: ", databases);
  }, [serverName, cpu, memory, diskSpace, additionalPorts, backups, databases]);

  useEffect(() =>{
    setMemory(limits.memory)
    setCpu(limits.cpu)
    setDiskSpace(limits.disk)
    setAdditionalPorts(limits.allocation)
    setBackups(limits.backup)
    setDatabases(limits.database)

  },[limits.allocation , limits.backup, limits.cpu, limits.database, limits.disk, limits.memory])

  
  return (
    isLoading ? (<div className="flex flex-row h-screen justify-center items-center"><ThreeDots
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      radius="9"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      /></div>) :(
    <div className="ml-2 mt-2 bg-[rgb(240,240,240)] flex flex-col flex-1 pb-4  pl-2 pt-1 ">
      <div>
        <h2 className="font-bold text-3xl">CreateServer</h2>
      </div>
      <div>
        <h3 className="mt-2 font-semibold text-xl">Details</h3>
      </div>
      <div className="mt-4">
        <TextField
          onChange={(event) => setServerName(event.target.value)}
          value={serverName}
          htmlFor="Server Name"
          id="outlined-basic"
          label="Server Name"
          variant="outlined"
          color="secondary"
          focused
          className="mt-2 w-[1400px] bg-neutral-200 rounded-lg text-neutral-800 active:border-neutral-500  focus:border-neutral-500 "
        />
      </div>
      <div>
        <h3 className="mt-2 font-semibold text-xl">Resources</h3>
      </div>
      <div className="flex flex-row mt-4">
        <div className="flex flex-col w-[600px] mr-2 ">
          <TextField
            value={cpu}
            type="number"
            onChange={(event) => setCpu(parseInt(event.target.value))}
            htmlFor="CPU"
            id="outlined-basic"
            label="CPU (%)"
            variant="outlined"
            color="primary"
            className="mt-2 w-[600px] bg-neutral-200 rounded-lg text-neutral-800 active:border-neutral-500  focus:border-neutral-500 "
          />
          <TextField
            value={memory}
            type="number"
            onChange={(event) => setMemory(parseInt(event.target.value))}
            htmlFor="Memory"
            style={{ marginTop: "10px" }}
            id="outlined-basic"
            label="Memory / RAM (MB)"
            variant="outlined"
            color="primary"
            className="mt-2 w-[600px] bg-neutral-200 rounded-lg text-neutral-800 active:border-neutral-500  focus:border-neutral-500 "
          />
          <TextField
            type="number"
            value={diskSpace}
            onChange={(event) => setDiskSpace(parseInt(event.target.value))}
            htmlFor="Disk Space"
            style={{ marginTop: "10px" }}
            id="outlined-basic"
            label="Disk Space (MB)"
            variant="outlined"
            color="primary"
            className="mt-2 w-[600px] bg-neutral-200 rounded-lg text-neutral-800 active:border-neutral-500  focus:border-neutral-500 "
          />
        </div>
        <div className="flex flex-col w-[600px] mr-2 ">
          <TextField
            type="number"
            value={additionalPorts}
            onChange={(event) => setAdditionalPorts(parseInt(event.target.value))}
            htmlFor="Ports"
            id="outlined-basic"
            label="Additional Ports"
            variant="outlined"
            color="primary"
            className="mt-2 w-[600px] bg-neutral-200 rounded-lg text-neutral-800 active:border-neutral-500  focus:border-neutral-500 "
          />
          <TextField
            type="number"
            value={backups}
            onChange={(event) => setBackups(parseInt(event.target.value))}
            htmlFor="Backups"
            style={{ marginTop: "10px" }}
            id="outlined-basic"
            label="Backups"
            variant="outlined"
            color="primary"
            className="mt-2 w-[600px] bg-neutral-200 rounded-lg text-neutral-800 active:border-neutral-500  focus:border-neutral-500 "
          />
          <TextField
            type="number"
            value={databases}
            onChange={(event) => setDatabases(parseInt(event.target.value))}
            htmlFor="Databases"
            style={{ marginTop: "10px" }}
            id="outlined-basic"
            label="Databases"      
            variant="outlined"
            color="primary"
            className="mt-2 w-[600px] bg-neutral-200 rounded-lg text-neutral-800 active:border-neutral-500  focus:border-neutral-500 "
          />
        </div>
      </div>
      <div>
        <h3 className="mt-6 font-semibold text-xl">Location</h3>
      </div>
      <div>
        <p className="text-neutral-600">
          Select the location according to the lowest latency and available
          slots. The latency is refreshed every 10 seconds.
        </p>
        <div className="flex flex-row">
          {locations &&
            locations.map((location) => {
              const [shortname, city] = location.attributes.long.split(" - ");
              return (
                <LocationCard
                  key={location.attributes.id}
                  img={`https://flagsapi.com/${shortname}/shiny/64.png`} // This is a placeholder, you should replace it with the real image
                  Country={location.attributes.short}
                  City={city}
                  MaxSlots={location.attributes.short}
                  CurrentSlot={location.attributes.short}
                  Latency={shortname === "IN" ? "Low" : "High"}
                  onClick={() => {
                    handleLocationClick(location.attributes.id, nodes);
                    setNodeId(null);
                    setLocationButtonSelect(null);
                  }}
                  text={shortname === "IN" ? "Premium" : "Free"}
                />
              );
            })}
        </div>
        {nodesOfLocation &&
          nodesOfLocation.map((node) => {
            return (
              <div className="ml-2">
                <Button
                  key={node.attributes.id}
                  variant="contained"
                  onClick={() => {
                    handleNodeDetails(node);
                    setLocationButtonSelect(node.attributes.id);
                  }}
                  style={
                    node.attributes.id === locationButtonSelect
                      ? { backgroundColor: "purple" }
                      : {}
                  }
                >
                  {node.attributes.name}
                </Button>
              </div>
            );
          })}
        <div className="font-bold text-xl mt-2 mb-1">Server software</div>
        <div className="pl-2 ml-2  flex flex-row mt-5">
          {nests &&
            nests.map((nest, i) => {
              return (
                <div className="mr-2 " key={i}>
                  <Button
                    variant="contained"
                    color="secondary"
                    key={nest.attributes.id}
                    onClick={() => {
                      getEggs(nest.attributes.id);
                      setNestId(nest.attributes.id);
                      setNestButtonSelect(nest.attributes.id);
                      setEggId(null);
                    }}
                    style={
                      nest.attributes.id === nestButtonSelect
                        ? { backgroundColor: "blue" }
                        : {}
                    }
                  >
                    {nest.attributes.name}
                  </Button>
                </div>
              );
            })}
        </div>
        <div className="pl-2 ml-2  flex flex-row mt-5">
          {eggs &&
            eggs.map((egg) => {
              return (
                <div className="mr-2 ">
                  <Button
                    variant="contained"
                    color="info"
                    key={egg.attributes.id}
                    onClick={() => {
                      setEggId(egg.attributes.id);
                      setEggButtonSelect(egg.attributes.id);
                    }}
                    style={
                      egg.attributes.id === eggButtonSelect
                        ? { backgroundColor: "red" }
                        : {}
                    }
                  >
                    {egg.attributes.name}
                  </Button>
                </div>
              );
            })}
        </div>

        <div className="flex flex-row">
          <div className="mt-4 ml-auto mr-auto ">
            <Button
              onClick={handleSubmit}
              className="mt-4 ml-2"
              variant="contained"
              color="success"
            >
              {" "}
              Create server
            </Button>
          </div>
        </div>
      </div>
      {errorMessage && (
        <div className="error ml-auto mr-auto text-red-700">{errorMessage}</div>
      )}
      {
        errorOnServerCreate && (
          <div className="error ml-auto mr-auto text-red-700">{errorOnServerCreate && errorOnServerCreate.message === 'Request failed with status code 422' ? 'Node is Full' : 'Something went wrong while creating a server'}</div>
        )
      }
    </div>
    )
    );
}

export default CreateServer;
