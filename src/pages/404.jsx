import React from "react";
import { Link } from "react-router-dom";
import { GoCpu } from "react-icons/go";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <GoCpu className="text-6xl text-red-500" />
      <h1 className="mt-3 text-5xl font-bold">404</h1>
      <p className="mt-3 text-lg">Page not found</p>
      <Link to="/" className="mt-6 text-blue-500 hover:underline">
        Go back home
      </Link>
    </div>
  );
};

export default NotFoundPage;
