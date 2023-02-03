import { Box, Link } from "@chakra-ui/react";
import { memo, useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthForm } from "@/components/auth";
import { useTypeDispatch } from "@/hooks/redux";
import { loginAction } from "@/store/slices/auth/actions";

const LoginPage = memo(() => {
  const dispatch = useTypeDispatch();

  const login = useCallback(
    (email: string, password: string) => {
      dispatch(loginAction({ email, password }));
    },
    [dispatch]
  );

  return (
    <AuthForm title="Login" action={login}>
      <Box mt={4} textAlign="center">
        Or{" "}
        <Link color="teal.500" to="/signup" as={RouterLink}>
          sign up
        </Link>{" "}
        for free
      </Box>
    </AuthForm>
  );
});

export default LoginPage;
