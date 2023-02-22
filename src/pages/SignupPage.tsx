import { Box, Link } from "@chakra-ui/react";
import { memo, useCallback } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthForm } from "@/components/auth";
import { useTypeDispatch } from "@/hooks/redux";
import { signUpAction } from "@/store/slices/auth/actions";

const SignupPage = memo(() => {
  const dispatch = useTypeDispatch();

  const signUp = useCallback(
    (email: string, password: string) => {
      dispatch(signUpAction({ email, password }));
    },
    [dispatch]
  );

  return (
    <AuthForm title="Sign Up" action={signUp}>
      <Box mt={4} textAlign="center">
        Or{" "}
        <Link color="teal.500" to="/login" as={RouterLink}>
          log in
        </Link>{" "}
        with an existing account
      </Box>
    </AuthForm>
  );
});

export default SignupPage;
