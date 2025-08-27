import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
} from "@tanstack/react-router";
import AppLayout from "../modules/layout/AppLayout";

const rootRoute = createRootRoute();

const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app", // 路由标识（无 path），用于承载布局
  component: AppLayout, // 记得在 AppLayout 里用 <Outlet />
});

const dashboardRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/",
  component: lazyRouteComponent(() => import("../pages/dashboard")),
});

const usersRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/users",
  component: lazyRouteComponent(() => import("../pages/users")),
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: lazyRouteComponent(() => import("../pages/register/register")),
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([
    appRoute.addChildren([dashboardRoute, usersRoute]),
    registerRoute,
  ]),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
