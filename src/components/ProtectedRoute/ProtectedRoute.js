import React, { useEffect, useState } from "react";
import { Navigate,Outlet } from "react-router-dom";
import { ROUTES } from "../../routes";
import axios from "axios";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    axios
      .get("http://3.23.20.158:3075/auth-status", { withCredentials: true })
      .then((response) => {
        setIsAuthenticated(response.data.authenticated);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // or some loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.SIGNIN} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
