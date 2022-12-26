import { BrowserRouter } from "react-router-dom";
import AuthorizedRoutes from "./routes/AuthorizedRoutes";
import UnauthorizedRoutes from "./routes/UnauthorizedRoutes";
import useError from "./hooks/http/useError";
import { Suspense, useEffect, useRef } from "react";
import SpinnerLg from "./components/generic/SpinnerLg";
import authSelector from "./store/selectors/auth";
import useTypeSelector from "./hooks/redux/useTypeSelector";
import server from "./server";
import authSlice from "./store/slices/auth";
import useTypeDispatch from "./hooks/redux/useTypeDispatch";
import { Unsubscribe } from "firebase/auth";
import { Progress } from "@chakra-ui/react";
import NavBar from "./components/generic/NavBar";
import genericSelector from "./store/selectors/generic";

const App = () =>
{
  const { userData, isLoading: isSessionLoading } = useTypeSelector(authSelector);
  const { isLoading } = useTypeSelector(genericSelector);

  const { setUserData } = authSlice.actions;
  const d = useTypeDispatch();

  const unsubRef = useRef<Unsubscribe | null>(null);

  useError();

  useEffect(() =>
  {
    unsubRef.current = server.auth.ref.onAuthStateChanged(user =>
    {
      d(setUserData(user));
    });
    return () =>
    {
      unsubRef.current?.();
    };
  }, [d, setUserData]);

  if (isSessionLoading) return <SpinnerLg />;
  return (
    <>
      {isLoading && <Progress zIndex={1} pos="fixed" inset={0} top="unset" isIndeterminate />}
      <BrowserRouter>
        <NavBar />
        <Suspense fallback={<SpinnerLg />}>
          {userData ? <AuthorizedRoutes /> : <UnauthorizedRoutes />}
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;