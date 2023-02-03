import { AppRoutes } from "@/types";
import { lazy, memo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const LoginPage = lazy(() => import("@/pages/LoginPage"));
const SignUpPage = lazy(() => import("@/pages/SignUpPage"));

const AuthorizedRouter = memo(() => {
  return (
    <Routes>
      <Route path={AppRoutes.Login} element={<LoginPage />} />
      <Route path={AppRoutes.SignUp} element={<SignUpPage />} />
      <Route path={AppRoutes.Fallback} element={<Navigate to="/login" />} />
    </Routes>
  );
});

export default AuthorizedRouter;
