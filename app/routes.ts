import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("new", "routes/newTask.tsx"),
  route("home/:id", "routes/task.tsx"),
] satisfies RouteConfig;
