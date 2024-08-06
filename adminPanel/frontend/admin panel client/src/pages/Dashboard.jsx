import React, { useEffect } from "react";
import { Charts, DashboardCards, Graph, RecentOrder } from "../components";
import { DashboardContent } from "../contstants";
import { Button } from "@mui/material";
import { getOrderDetail, getRecentOrders } from "../functions";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const Dashboard = () => {
  const [recentOrders, setRecentOrders] = React.useState(null)

  useEffect(() => {
    const fetchRecentOrders = async () => {
      const [response, error] = await getRecentOrders();
      
      if (!error) setRecentOrders(response);
    };
    fetchRecentOrders();
  }, []);
  return (
    <div className=" bg-neutral-100 m-3 p-2">
      <div className="font-bold  text-black text-2xl">Dashboard</div>

      <div className="flex flex-row">
        {DashboardContent &&
          DashboardContent.map((card, index) => (
            <DashboardCards
              text1={card.text1}
              currentvalue={card.currentvalue}
              percentage={card.percentage}
              gap={card.gap}
              className={card.className}
              key={card.text1}
            />
          ))}
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between w-[800px]">
            <div>Unique Visitors</div>
            <div>
              <Button className="active:border-blue-500 focus:bg-blue-500 focus:text-white">
                Month
              </Button>
              <Button className="active:border-blue-500 focus:bg-blue-500 focus:text-white">
                Week
              </Button>
            </div>
          </div>
          <div className="bg-white px-auto  mt-4">
            <Graph />
          </div>
        </div>

        <div className="mt-1 ml-10">
          <div>Income Overview</div>
          <div className="mt-4 bg-white py-3 px-4 w-[720px] mr-4 cursor-pointer">
            <div> The week Statistics</div>
            <div className="font-bold ">$562</div>
            <Charts />
          </div>
        </div>
      </div>

      <div className="mt-4">
        Recent orders
        <div className="bg-white w-[1500px] mt-3 rounded-lg mb-4 h-auto">
          <TableContainer component={Paper} >
            <Table >
            <TableHead>
              <TableRow>
                <TableCell >Order No.</TableCell>
                <TableCell >Product Name</TableCell>
                <TableCell>Buyer Id</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {recentOrders &&
              recentOrders.map((order, index) => (
                
                  <RecentOrder key={index} order={order} />
                
              ))}
            </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
