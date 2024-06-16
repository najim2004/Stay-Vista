import React from "react";
import PropTypes from "prop-types";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import { Navigate } from "react-router-dom";

const HostRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isLoading] = useRole();
  if (loading || isLoading) return <LoadingSpinner />;
  if (role === "host") return children;
  return <Navigate to={"/dashboard"} />;
};

HostRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HostRoute;
