import { Comments } from "@/pages/comments";
import Home from "@/pages/home";
import { AuthDetails } from "@/pages/login/AuthDetails";

export const privateRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: `/:id`,
    element: <Comments />,
  },
  {
    path: "/auth_detail",
    element: <AuthDetails />,
  },
];
