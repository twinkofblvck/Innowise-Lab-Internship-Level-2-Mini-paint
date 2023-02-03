import { Link } from "@chakra-ui/react";
import { FC, memo } from "react";
import { Link as RouteLink, useLocation } from "react-router-dom";
import { INavLinkProps } from "@/components/generic";

const NavLink: FC<INavLinkProps> = memo(({ children, to }) => {
  const { pathname } = useLocation();

  return (
    <Link
      minW={20}
      textAlign="center"
      borderBottom={pathname === to ? "3px solid orange" : "none"}
      p={3}
      as={RouteLink}
      to={to}
    >
      {children}
    </Link>
  );
});

export default NavLink;
