import { lazy, memo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const SignupPage = lazy(() => import("../pages/SignupPage"));

const AuthorizedRouter = memo(() =>
{
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
});

export default AuthorizedRouter;