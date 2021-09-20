import React from "react";
import { Route, Redirect } from "react-router-dom";
import { FooterPage } from "./components/Footer"
import { Header } from "./components/Header"

export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated()) {
          return (
          <div>
          <Header/>
          <Component {...props} />
          <div style={{position:'relative',bottom:0, width:'100%'}}>
                <FooterPage />
            </div>
          </div>
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
