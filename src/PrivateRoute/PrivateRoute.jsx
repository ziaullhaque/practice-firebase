import React, { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate, useLocation } from "react-router";
import { FadeLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  const location = useLocation();
  console.log(location)

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <FadeLoader color="#31917d" />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/signin" state={location.pathname}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
