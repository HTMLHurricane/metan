import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "@/pages/login";
import NotFound from "@/pages/not-found";
import PageLoader from "@/components/PageLoader";
import { AnimatePresence } from "framer-motion";
import { Suspense } from "react";
import { privateRoutes } from "./privateRoutes";
import useAuthStore from "@/store/auth/slice";
import { Verify } from "@/pages/login/Verify";

const Router: React.FC = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait" initial={false}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth_verify" element={<Verify />} />
          {isLoggedIn && (
            <Route path="/">
              {privateRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<ProtectedRoute>{route.element}</ProtectedRoute>}
                />
              ))}
            </Route>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

export { Router };
