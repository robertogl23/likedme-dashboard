import React from "react";
import { Router } from "react-router-dom";
export default function ProtectedRouter({ children, ...rest }) {
  return (
    <Router
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
}
