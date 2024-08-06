import React, { useEffect, useState } from "react";
import { orders as orderDetails } from "../appwrite";
import OrderCard from "../components/Order/OrderCard";
import { ThreeCircles } from "react-loader-spinner";
const AllOrders = () => {
  const [orders, setorders] = useState([]);
  const fetchAllOrders = async () => {
    const [res, err] = await orderDetails.getAllOrders();
    if (res) setorders(res.documents);
    console.log(res);
  };
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchAllOrders();
    setLoading(false);
  }, []);

  return loading ? (
    <div className="flex flex-row justify-center items-center w-full h-full">
      <div className="m-auto">
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </div>
  ) : (
    <div className="m-2">
      <div className="font-bold text-3xl underline">All Orders&nbsp;</div>
      <div className="mt-6">
        {orders &&
          orders.map((order, index) => (
            <div key={order.$id}>
              <OrderCard
                index={index}
                $id={order.$id}
                buyerId={order.buyerId}
                success={order.success}
                total={order.total}
                amount={order.amount}
                productId={order.productId}
                $updatedAt={order.$updatedAt}
                orderId={order.orderId}
                setCount={setCount}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllOrders;
