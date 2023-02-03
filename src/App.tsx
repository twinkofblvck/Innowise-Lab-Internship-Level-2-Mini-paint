import authSlice from "@/store/slices/auth";
import { genericSelector, authSelector } from "@/store/selectors";
import { BrowserRouter } from "react-router-dom";
import { AuthorizedRoutes, UnauthorizedRoutes } from "@/routes";
import { useTypeSelector, useTypeDispatch } from "@/hooks/redux";
import { useError } from "@/hooks/http";
import { SpinnerLg, NavBar } from "@/components/generic";
import { server } from "@/server";
import { Unsubscribe } from "firebase/auth";
import { Suspense, useEffect, useRef } from "react";
import { Progress } from "@chakra-ui/react";

const App = () => {
  const { userData, isLoading: isSessionLoading } = useTypeSelector(authSelector);
  const { isLoading } = useTypeSelector(genericSelector);

  const { setUserData } = authSlice.actions;
  const dispatch = useTypeDispatch();

  const unsubRef = useRef<Unsubscribe | null>(null);

  useError();

  useEffect(() => {
    unsubRef.current = server.auth.ref.onAuthStateChanged((user) => {
      dispatch(setUserData(user));
    });

    return () => {
      unsubRef.current?.();
    };
  }, [dispatch, setUserData]);

  return isSessionLoading ? (
    <SpinnerLg />
  ) : (
    <>
      {isLoading && <Progress zIndex={1} pos="fixed" inset={0} top="unset" isIndeterminate />}
      <BrowserRouter>
        <NavBar />
        <Suspense fallback={<SpinnerLg />}>{userData ? <AuthorizedRoutes /> : <UnauthorizedRoutes />}</Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
