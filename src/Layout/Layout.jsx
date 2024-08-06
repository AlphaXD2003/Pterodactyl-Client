import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Shared/Header";
import Sidebar from "../Shared/Sidebar";
import Footer from "../Shared/Footer";
import { WavyBackground } from "../components/WavyBackground.tsx";
import {Meteors} from "../components/Meteors.tsx"
import Protected from "../Protected/Protected.jsx";
function Layout() {
  return (
    <WavyBackground >
      <div className="flex flex-row h-screen w-screen overflow-hidden bg-transparent">
        <Sidebar />
        <div className="flex flex-col w-screen overflow-auto">

          <Header />
      
          <div className="flex-1">
            <Outlet /> 
          </div>
          <Footer />
        </div>
      </div>
      
    </WavyBackground>
  );
}

export default Layout;
