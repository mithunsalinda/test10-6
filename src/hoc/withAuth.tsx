import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const ComponentWithAuth = (props: P) => {
    const isAuthenticated = false;
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/login", { replace: true });
      }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return null;

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
