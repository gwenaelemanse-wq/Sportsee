import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/login.tsx"),
  route("", "components/appLayout.tsx", [
    route("dashboard", "routes/dashboard.tsx"),
    route("profile", "routes/profile.tsx"),
  ]),
  route("*", "routes/error.tsx"),
] satisfies RouteConfig;
