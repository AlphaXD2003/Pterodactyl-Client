import React, { useEffect, useState } from 'react'
import apiCall from '../pterodactyl/functions/getAPI'
import { useNavigate, useParams } from 'react-router-dom'
import { MagnifyingGlass } from 'react-loader-spinner'
import { useSelector } from 'react-redux'
import getUsersServer from '../pterodactyl/functions/getUsersServer'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import patchAPI from '../pterodactyl/functions/patchAPI'
import userdata from '../services/userData.appwrite'
 function EditServer() {
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


    const {id} = useParams()
   

    const [server, setServer]  = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)


    const usersEmail = user.email
    

    const [usersServer, setUsersServer] = useState(null)

    //input state
    const [cpu, setCpu] = useState(0)
    const [memory, setMemory] = useState(0)
    const [diskSpace, setDiskSpace] = useState(0)
    const [databases, setDatabases] = useState(0)
    const [allocations, setAllocations] = useState(0)
    const [backups, setBackups] = useState(0)
    
    const userId = useSelector((state) => state.user.userId)
    async function getServer(){
        setError(null)
        const [serverInfo, serverError] = await apiCall.get(`${import.meta.env.VITE_PTERODACTYL_URL}/servers/${id}`)
        if(serverError){
            console.error("Error getting server: ", serverError)
            setError(serverError)
        }
        if(!serverInfo){
            console.error("Server not found")
            setError(new Error("Server not found"))
        }
        console.log("Server: ", serverInfo.data.attributes)
        if(serverInfo.data.attributes.user !== userId ){
            navigate('/')
        }
        setServer(serverInfo.data.attributes)
       
        setLoading(false)
    }
    //get users total resources
    const [totalCPU, setTotalCPU] = useState(0)
    const [totalMemory, setTotalMemory] = useState(0)
    const [totalDisk, setTotalDisk] = useState(0)
    const [totalDatabases, setTotalDatabases] = useState(0)
    const [totalAllocations, setTotalAllocations] = useState(0)
    const [totalBackups, setTotalBackups] = useState(0)

    //error while update
    const [updateError, setUpdateError] = useState(null)
    async function getUsersTotalResources(){
        
        const totalCPU = usersServer.reduce((sum, server) => sum + server.attributes.limits.cpu, 0)
        const totalMemory = usersServer.reduce((sum, server) => sum + server.attributes.limits.memory, 0)
        const totalDisk = usersServer.reduce((sum, server) => sum + server.attributes.limits.disk, 0)
        const totalDatabases = usersServer.reduce((sum, server) => sum + server.attributes.feature_limits.databases, 0)
        const totalAllocations = usersServer.reduce((sum, server) => sum + server.attributes.feature_limits.allocations, 0)
        const totalBackups = usersServer.reduce((sum, server) => sum + server.attributes.feature_limits.backups, 0)

        console.log("Total CPU: ", totalCPU)
        console.log("Total Memory: ", totalMemory)
        console.log("Total Disk: ", totalDisk)
        console.log("Total Databases: ", totalDatabases)
        console.log("Total Allocations: ", totalAllocations)
        console.log("Total Backups: ", totalBackups)
        setTotalCPU(totalCPU - server.limits.cpu)
        setTotalMemory(totalMemory - server.limits.memory)
        setTotalDisk(totalDisk - server.limits.disk)
        setTotalDatabases(totalDatabases - server.feature_limits.databases)
        setTotalAllocations(totalAllocations - server.feature_limits.allocations)
        setTotalBackups(totalBackups - server.feature_limits.backups)
    }
    //get users current resources
    const [currentCPU, setCurrentCPU] = useState(0)
    const [currentMemory, setCurrentMemory] = useState(0)
    const [currentDisk, setCurrentDisk] = useState(0)
    const [currentDatabases, setCurrentDatabases] = useState(0)
    const [currentAllocations, setCurrentAllocations] = useState(0)
    const [currentBackups, setCurrentBackups] = useState(0)

    async function getUsersCurrentResources(){
        const currentCPU = server.limits.cpu
        const currentMemory = server.limits.memory
        const currentDisk = server.limits.disk
        const currentDatabases = server.feature_limits.databases
        const currentAllocations = server.feature_limits.allocations
        const currentBackups = server.feature_limits.backups
        
        setCurrentCPU(currentCPU)
        setCurrentMemory(currentMemory)
        setCurrentDisk(currentDisk)
        setCurrentDatabases(currentDatabases)
        setCurrentAllocations(currentAllocations)
        setCurrentBackups(currentBackups)

        console.log("Current CPU: ", currentCPU)
        console.log("Current Memory: ", currentMemory)
        console.log("Current Disk: ", currentDisk)
        console.log("Current Databases: ", currentDatabases)
        console.log("Current Allocations: ", currentAllocations)
        console.log("Current Backups: ", currentBackups)

        
    }
    useEffect(() => {
        getServer()
        getServerLimits()

       
        console.log("User: ", user)
        ;(async () =>{
            const [uServer, uServerError] = await getUsersServer(usersEmail)
            if(uServerError){
                console.error("Error getting user's server: ", uServerError)
                return
            }
            if(!uServer){
                console.error("User's server not found")
                return
            }
            console.log("User's server: ", uServer)
            
            setUsersServer(uServer)
            console.log("Users Server: ", usersServer)
           
               
        })()

        
        
    }, [])
    

    useEffect(() => {
      if(server ){
        getUsersCurrentResources()
        getRemainingResources()
      }
      if(server && usersServer){
        getUsersTotalResources()
        
      }
    }, [server, limits, usersServer, totalCPU, totalMemory, totalDisk, totalDatabases, totalAllocations, totalBackups])



  

    useEffect(() => {
        console.log('CPU: ', cpu)
        console.log('Memory: ', memory)
        console.log('Disk: ', diskSpace)    
        console.log('Databases: ', databases)
        console.log('Allocations: ', allocations)
        console.log('Backups: ', backups)

    }, [cpu, memory, diskSpace, databases, allocations, backups])
    // Current resources useeffect
    useEffect(() => {
        console.log('Current CPU: ', currentCPU)
        console.log('Current Memory: ', currentMemory)
        console.log('Current Disk: ', currentDisk)
        console.log('Current Databases: ', currentDatabases)
        console.log('Current Allocations: ', currentAllocations)
        console.log('Current Backups: ', currentBackups)
    }, [currentCPU, currentMemory, currentDisk, currentDatabases, currentAllocations, currentBackups])


    //remainign resources
    const [remainingCPU, setRemainingCPU] = useState(0)
    const [remainingMemory, setRemainingMemory] = useState(0)
    const [remainingDisk, setRemainingDisk] = useState(0)
    const [remainingDatabases, setRemainingDatabases] = useState(0)
    const [remainingAllocations, setRemainingAllocations] = useState(0)
    const [remainingBackups, setRemainingBackups] = useState(0)
    
    async function getRemainingResources(){
        const remainingCPU = limits.cpu - (server.limits.cpu + totalCPU)
        const remainingMemory = limits.memory - (server.limits.memory + totalMemory)
        const remainingDisk = limits.disk - (server.limits.disk + totalDisk)
        const remainingDatabases = limits.database - (server.feature_limits.databases + totalDatabases)
        const remainingAllocations =   limits.allocation - (server.feature_limits.allocations + totalAllocations)
        const remainingBackups = limits.backup - (server.feature_limits.backups + totalBackups)

        setRemainingCPU(remainingCPU)
        setRemainingMemory(remainingMemory)
        setRemainingDisk(remainingDisk)
        setRemainingDatabases(remainingDatabases)
        setRemainingAllocations(remainingAllocations)
        setRemainingBackups(remainingBackups)

        console.log("Remaining CPU: ", remainingCPU)
        console.log("Remaining Memory: ", remainingMemory)
        console.log("Remaining Disk: ", remainingDisk)
        console.log("Remaining Databases: ", remainingDatabases)
        console.log("Remaining Allocations: ", remainingAllocations)
        console.log("Remaining Backups: ", remainingBackups)
    }

    
    const navigate = useNavigate()
    async function handleUpdateServer(){
        const bodyData = {
            allocation: server.allocation,
            memory: currentMemory,
            swap: server.limits.swap,
            disk: currentDisk,
            io: server.limits.io,
            cpu: currentCPU,
            threads: server.limits.threads,
            feature_limits: {
                databases: currentDatabases,
                allocations: currentAllocations,
                backups: currentBackups
            }
        }
        if((totalCPU + currentCPU) > limits.cpu || (totalMemory + currentMemory) > limits.memory || (totalDisk + currentDisk) > limits.disk || (totalDatabases + currentDatabases) > limits.database || (totalAllocations + currentAllocations) > limits.allocation || (totalBackups + currentBackups) > limits.backup ){
            console.error("User has exceeded the resource limits")
            setUpdateError('User has exceeded the resource limits')
            return
        }
        if(currentCPU < 30 || currentMemory < 512 || currentDisk < 2000){
            console.error("Minimum resources not met")
            setUpdateError('Minimum resources not met')
            return
        }
        const [updateResponse, updateError] = await patchAPI.patch(`${import.meta.env.VITE_PTERODACTYL_URL}/servers/${id}/build`, bodyData)
        if(updateError){
            console.error("Error updating server: ", updateError)
            setUpdateError(updateError.message)
            return
        }
        console.log("Server updated: ", updateResponse)
        if(updateResponse){
            navigate('/')
        }
    }
  return (
    loading ? <div className='flex flex-row justify-center items-center h-screen'> <MagnifyingGlass /></div> 
    : 
    <div className='flex flex-col ml-2 mt-2'>
        <div>
            <h1 className='text-2xl font-bold'>Edit Server</h1>
        </div>
       {/*Remaining Resources */}
        <div>
            <h2 className='text-xl font-semibold text-white'>Remaining Resources</h2>
            <div className='flex flex-row gap-6 mt-2 text-xl font-semibold cursor-pointer hover:bg-neutral-400 hover:text-neutral-900 hover:font-extrabold bg-neutral-300 w-[500px] justify-between h-[150px] items-center rounded-lg shadow-md shadow-black'>
                <div className='flex flex-col ml-4'>
                    <div>CPU: {remainingCPU} %</div>
                    <div>Memory: {remainingMemory} MB</div>
                    <div>Disk: {remainingDisk} MB</div>
                </div>
                <div className='flex flex-col pr-4'>
                    <div>Databases: {remainingDatabases}</div>
                    <div>Allocated Ports: {remainingAllocations} </div>
                    <div>Backups: {remainingBackups} </div>
                </div>
            </div>
        </div>
        {/*Current Resources}

        {/*Server Edit TextBOx */}
        <div className="flex flex-row mt-4">
        <div className="flex flex-col w-[600px] mr-2 ">
          <TextField
            value={currentCPU}
            type="number"
            onChange={(event) => setCurrentCPU(parseInt(event.target.value))}
            htmlFor="CPU"
            id="outlined-basic"
            label="CPU (%)"
            variant="outlined"
            color="secondary"
            className="mt-2 w-[600px] bg-neutral-200 rounded-lg text-neutral-800 active:border-neutral-500  focus:border-neutral-500 "
          />
          <TextField
            value={currentMemory}
            type="number"
            onChange={(event) => setCurrentMemory(parseInt(event.target.value))}
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
            value={currentDisk}
            onChange={(event) => setCurrentDisk(parseInt(event.target.value))}
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
            value={currentAllocations}
            onChange={(event) => setCurrentAllocations(parseInt(event.target.value))}
            htmlFor="Ports"
            id="outlined-basic"
            label="Additional Ports"
            variant="outlined"
            color="primary"
            className="mt-2 w-[600px] bg-neutral-200 rounded-lg text-neutral-800 active:border-neutral-500  focus:border-neutral-500 "
          />
          <TextField
            type="number"
            value={currentBackups}
            onChange={(event) => setCurrentBackups(parseInt(event.target.value))}
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
            value={currentDatabases}
            onChange={(event) => setCurrentBackups(parseInt(event.target.value))}
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
      <div className='mt-4 ml-auto mr-auto'>
      <Button 
      onClick={handleUpdateServer}
        variant='contained'
      >
      Update Server
    </Button>
      </div>
    <div className='mt-4 ml-auto mr-auto'>
        {
            updateError && <div className='text-red-500'>{updateError}</div>
        }
    </div>
    
    </div>
  )
}

export default EditServer