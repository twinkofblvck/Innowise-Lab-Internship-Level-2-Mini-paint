import { Box, Link } from "@chakra-ui/react";
import { memo, useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import useTypeDispatch from "../hooks/redux/useTypeDispatch";
import signupAction from "../store/slices/auth/actions/signup";

const SignupPage = memo(() =>
{
  const d = useTypeDispatch();

  const signup = useCallback((email: string, password: string) =>
  {
    d(signupAction({ email, password }));
  }, [d]);

  return (
    <AuthForm title="Sign Up" action={signup}>
      <Box mt={4} textAlign="center">
        Or <Link color="teal.500" to="/login" as={RouterLink}>log in</Link> with an existing account
      </Box>
    </AuthForm>
  );
});

export default SignupPage;