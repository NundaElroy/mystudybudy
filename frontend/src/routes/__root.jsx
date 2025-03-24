import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "../App.css";

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />{/*this where the children are inserted  */}
      <TanStackRouterDevtools />
    </>
  ),
});
