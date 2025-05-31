import React from "react";
import { createRootRoute, Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import "../App.css";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AuthState } from "../AuthState";

interface MyRouterContext {
  auth: AuthState
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () =>  (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
  },
);



