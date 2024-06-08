import { Navbar as NextNavbar, NavbarBrand, NavbarContent, NavbarItem, Link} from "@nextui-org/react";
import { useNavigate, useLocation } from 'react-router-dom';


export default function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <NextNavbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">SurferBot</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem isActive={location.pathname === "/status"}>
            <Link color="foreground" onClick={() => navigate("status")}>
              Status
            </Link>
          </NavbarItem>
          <NavbarItem isActive={location.pathname === "/proxy"} >
            <Link color="foreground" onClick={() => navigate("proxy")}>
              Proxy
            </Link>
          </NavbarItem>
          <NavbarItem isActive={location.pathname === "/switch"}>
            <Link color="foreground" onClick={() => navigate("switch")}>
              Switch
            </Link>
          </NavbarItem >
          <NavbarItem isActive={location.pathname === "/executor"}>
            <Link color="foreground" onClick={() => navigate("executor")}>
              Executor
            </Link>
          </NavbarItem>
        </NavbarContent>

      </NextNavbar>
      <div className="mt-2"></div>
    </>
  );
}
