import { Button, Flex, useColorMode, useMediaQuery } from "@chakra-ui/react";
import { FC, memo, useCallback } from "react";
import { BsMoonStars, BsSun } from "react-icons/bs";
import { useTypeDispatch, useTypeSelector } from "@/hooks/redux";
import { authSelector } from "@/store/selectors";
import { logoutAction } from "@/store/slices/auth/actions";
import { NavLink } from "@/components/generic";

const nextIcons = {
  light: <BsMoonStars />,
  dark: <BsSun />,
};

const NavBar: FC = memo(() => {
  const { userData } = useTypeSelector(authSelector);

  const { colorMode, toggleColorMode } = useColorMode();
  const [shouldAdapt] = useMediaQuery("(max-width: 768px)");

  const dispatch = useTypeDispatch();

  const logout = useCallback(() => dispatch(logoutAction()), [dispatch]);

  return (
    <Flex h={12} bg="" borderBottomWidth={3}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/paint">Paint</NavLink>
      <Flex flex={1} justify="flex-end" px={2} align="center" gap={2}>
        {userData ? (
          <>
            {!shouldAdapt && userData.email}
            <Button size="sm" onClick={logout}>
              Log out
            </Button>
          </>
        ) : (
          "Guest"
        )}
        <Button size="sm" onClick={toggleColorMode}>
          {nextIcons[colorMode]}
        </Button>
      </Flex>
    </Flex>
  );
});

export default NavBar;
