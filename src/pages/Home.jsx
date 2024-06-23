import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { CiCloud } from "react-icons/ci";
import { FaMemory } from "react-icons/fa6";
import { GoCpu } from "react-icons/go";
import { FaFloppyDisk } from "react-icons/fa6";
import { AiOutlineReload } from "react-icons/ai";
import LongCard from "../components/LongCard";
import { Bars } from "react-loader-spinner";
import getUsersServer from "../pterodactyl/functions/getUsersServer.js";
import { useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import deleteAPI from "../pterodactyl/functions/deleteAPI.js";
import { InfinitySpin } from "react-loader-spinner";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, Modal, Typography, Box } from "@mui/material";
import ConfirmModal from "../components/ConfirmModal.jsx";
import { set } from "react-hook-form";
import userdata from "../services/userData.appwrite.js";
import { BackgroundGradient } from "../components/BackgroundGradient";
import { Spotlight } from "../components/Spotlight.tsx";
import AdComponent from "../components/AdComponent"
import TestAdSenseComponent from "../components/TestAdComponent"
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "../components/RevealCard.tsx";

function Home() {
  const userId = useSelector((state) => state.user.userId);
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

  const [currentServerId, setCurrentServerId] = useState(null);

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [confirm, setConfirm] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [res, setRes] = useState([]);
  const email = useSelector((state) => state.user.userData?.email);

  useEffect(() => {
    (async () => {
      console.log("loading", isLoading);
      console.log("This email: ", email);
      const response = await getUsersServer(email);
      console.log("This res1: ", response);
      setRes(response);
      console.log("The user id: ", userId);
      getServerLimits();
      setIsLoading(false);
      console.log("loading", isLoading);
    })();
  }, [email, isLoading]); // Added email as a dependency

  let totalMemory = 0;
  let totalCPU = 0;
  let totalDisk = 0;

  if (res[0]) {
    console.log("This res2: ", res[0]);
    console.log("This number of server: ", res.length);

    totalMemory = res[0].reduce(
      (sum, server) => sum + server.attributes.limits.memory,
      0
    );
    console.log("Total Memory: ", totalMemory);
    totalCPU = res[0].reduce(
      (sum, server) => sum + server.attributes.limits.cpu,
      0
    );
    console.log("Total CPU: ", totalCPU);
    totalDisk = res[0].reduce(
      (sum, server) => sum + server.attributes.limits.disk,
      0
    );
    console.log("Total Disk: ", totalDisk);
  }
  const [key, setKey] = useState(Math.random());
  useEffect(() => {
    console.log("Server rerendered,", key);
  }, [key]);

  async function handleServerOpen(id) {
    const serverId = id;
    const openedServer = res[0].find(
      (server) => server.attributes.id === serverId
    );
    console.log("Opened server: ", openedServer.attributes.identifier);
    window.open(
      `https://panel.how2mc.xyz/server/${openedServer.attributes.identifier}`,
      "_blank"
    );
  }
  async function serverDelete() {
    setOpen(false);
    const id = currentServerId;
    console.log("Delete server with id: ", id);

    const [deleteResponse, deleteError] = await deleteAPI.delete(
      `${import.meta.env.VITE_PTERODACTYL_URL}/servers/${id}`
    );
    if (deleteError) {
      console.error("Error deleting server: ", deleteError);
    }
    console.log("Server deleted: ", deleteResponse);
    setKey(Math.random());
    console.log("Server rerendered,", key);
    const response = await getUsersServer(email);
    console.log("This res1: ", response);
    setRes(response);
    setCurrentServerId(null);
  }
  async function handleDeleteServer(id) {
    setCurrentServerId(id);
    console.log("Delete server with id: ", id);
    handleOpen();
  }
  const [loadingServer, setLoadingServer] = useState(false);
  async function reloadServer() {
    setLoadingServer(true);
    console.log("Reloading servers");

    const [response, error] = await getUsersServer(email);
    setLoadingServer(false);
  }
  const navigate = useNavigate();
  async function handleEditServer(id) {
    console.log("Edit server with id: ", id);
    const serverInfo = res[0].find((server) => server.attributes.id === id);
    console.log("Server info: ", serverInfo);

    navigate(`/edit-server/${id}`);
  }

  return isLoading ? (
    <div className="flex overflow-hidden flex-row justify-center items-center h-full">
      <Bars
        className=""
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  ) : (
    <div
      key={key}
      className="flex flex-col overflow-y-auto bg-transparent text-neutral-50 rounded-sm  bg-dot-white/[0.2] relative   mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
    >
      <div className="px-2 py-2 h-[300px] ">
        {(
          <div className="">
            <div className="flex items-center justify-center bg-[#0E0E10] rounded-2xl ">
              <TextRevealCard
                text="Welcome to GSM"
                revealText="Wish you the best of luck"
                className=" justify-center items-center"
              >
                <TextRevealCardTitle>
                  Wandering for best game server hardwares ?
                </TextRevealCardTitle>
                <TextRevealCardDescription>
                  Your wait is over. We provide you the best hardwares for your
                  servers.
                </TextRevealCardDescription>
              </TextRevealCard>
            </div>
          </div>
        ) || <Skeleton height={180} width={1920} />}
      </div>
      <Spotlight
        className="-top-40 left-28 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="mx-2 my-0.5 border border-neutral-600 h-10 bg-neutral-800 rounded-lg px-2 py-1 ">
        <div className="bg-neutral-800 py-0.5">
          Upgrade to premium now! Use code How25 for 25% off premium services.
          Do not miss out!
        </div>
      </div>
      {/* <AdComponent />*/}
      {/* <TestAdSenseComponent /> */}
      <div className="">
        <div className="flex flex-row gap-2 w-[1600px]  ">
          <Card
            label="Servers"
            current={res[0] ? res[0].length : 0}
            max={limits.serverAmount}
            children={<CiCloud fontSize="30px" />}
          />
          <Card
            label="Memory"
            current={totalMemory}
            max={limits.memory}
            children={<FaMemory fontSize="30px" />}
            text={"MB"}
          />
          <Card
            label="CPU"
            current={totalCPU}
            max={limits.cpu}
            children={<GoCpu fontSize="30px" />}
            text={"%"}
          />
          <Card
            label="Disk"
            current={totalDisk}
            max={limits.disk}
            children={<FaFloppyDisk fontSize="30px" />}
            text={"MB"}
          />
        </div>
      </div>

      <div className="flex flex-row gap-2 items-center font-bold text-xl ml-2 mt-0  ">
        Your Servers
        <AiOutlineReload
          onClick={reloadServer}
          className="translate-y-0.5 cursor-pointer"
        />
      </div>
      <div className="ml-2 mt-1 shadow-neutral-200 broder-b border-neutral-200 flex flex-row gap-2">
        {loadingServer ? (
          <div className="flex flex-col  justify-center items-center  w-[345px]">
            <InfinitySpin
              visible={true}
              width="200"
              color="#4fa94d"
              ariaLabel="infinity-spin-loading"
            />
            <div className="font-bold text-xl">Reloading servers...</div>
          </div>
        ) : res[0] && res[0].length >= 1 ? (
          res[0].map((server) => (
            <BackgroundGradient className="w-auto h-auto">
              <LongCard
                onEdit={handleEditServer}
                className="shadow-sm sgadow-neutral-200 "
                img="https://i0.wp.com/news.onepercentclub.io/wp-content/uploads/2024/03/lars-kienle-IlxX7xnbRF8-unsplash.jpg?resize=1024%2C575&ssl=1"
                name={server.attributes.name}
                key={server.attributes.id}
                id={server.attributes.id}
                description="All in One"
                price="Free"
                country={server.attributes.node}
                city="New York"
                cpu={server.attributes.limits.cpu}
                ram={server.attributes.limits.memory}
                disk={server.attributes.limits.disk}
                databases={server.attributes.feature_limits.databases}
                ports={server.attributes.feature_limits.allocations}
                backups={server.attributes.feature_limits.backups}
                onClick={() => console.log(server.attributes.id)}
                onDelete={handleDeleteServer}
                onOpen={handleServerOpen}
              />
            </BackgroundGradient>
          ))
        ) : (
          <div className="w-full  ml-auto mr-auto mt-4 flex flex-col items-center">
            <img
              src="https://dash.slicehosting.tech/images/empty.svg"
              className="w-52"
            />
            <h1 className="text-black text-lg">
              You don't have any servers yet.
            </h1>
            <Link to="/create-server">
              <div className="mt-4  ">
                <Button
                  className="decoration bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded-md mt-5 hover:scale-105 transition shadow-md"
                  variant="contained"
                  color="primary"
                >
                  Create a server
                </Button>
              </div>
            </Link>
          </div>
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete the server?
          </Typography>

          <div className="flex flex-row gap-4 mt-2">
            <Button
              variant="contained"
              color="error"
              onClick={() => serverDelete()}
            >
              Yes
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              No
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
export default Home;
