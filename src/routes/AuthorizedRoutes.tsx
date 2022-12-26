import { lazy, memo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const PaintPage = lazy(() =>import("../pages/PaintPage"));
const HomePage = lazy(() => import("../pages/HomePage"));

const AuthorizedRouter = memo(() =>
{
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/paint" element={<PaintPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
});

export default AuthorizedRouter;