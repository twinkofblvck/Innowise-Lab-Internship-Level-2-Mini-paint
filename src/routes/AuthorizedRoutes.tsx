import { AppRoutes } from "@/types";
import { lazy, memo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const PaintPage = lazy(() => import("@/pages/PaintPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));

const AuthorizedRouter = memo(() => {
  return (
    <Routes>
      <Route path={AppRoutes.Home} element={<HomePage />} />
      <Route path={AppRoutes.Paint} element={<PaintPage />} />
      <Route path={AppRoutes.Fallback} element={<Navigate to="/" />} />
    </Routes>
  );
});

export default AuthorizedRouter;
