import { Button, Flex, useColorMode, useMediaQuery } from "@chakra-ui/react";
import { FC, memo, useCallback } from "react";
import { BsMoonStars, BsSun } from "react-icons/bs";
import useTypeDispatch from "../../hooks/redux/useTypeDispatch";
import useTypeSelector from "../../hooks/redux/useTypeSelector";
import authSelector from "../../store/selectors/auth";
import logoutAction from "../../store/slices/auth/actions/logout";
import NavLink from "./NavLink";

const nextIcons =
{
  light: <BsMoonStars />,
  dark: <BsSun />
};

const NavBar: FC = memo(() =>
{
  const { userData } = useTypeSelector(authSelector);

  const { colorMode, toggleColorMode } = useColorMode();
  const [shouldAdapt] = useMediaQuery("(max-width: 768px)");

  const d = useTypeDispatch();

  const logout = useCallback(() => d(logoutAction()), [d]);

  return (
    <Flex h={12} bg="" borderBottomWidth={3}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/paint">Paint</NavLink>
      <Flex flex={1} justify="flex-end" px={2}  align="center" gap={2}>
        {userData ?
          <>
            {!shouldAdapt && userData.email}
            <Button size="sm" onClick={logout}>Log out</Button>
          </> :
          "Guest"}
        <Button size="sm" onClick={toggleColorMode}>{nextIcons[colorMode]}</Button>
      </Flex>
    </Flex>
  );
});

export default NavBar;