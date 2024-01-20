import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { shadows } from "@/assets/constants/styles";
import { useGlobalContext } from "@/hooks/use-global-context";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  const { user, setIsSidebarOpen } = useGlobalContext();
  return (
    <nav
      className={cn(
        "flex items-center justify-between px-5 md:px-20 py-4 bg-muted w-screen z-50",
        shadows.sm
      )}
    >
      <Menu
        onClick={() => setIsSidebarOpen((prev) => !prev)}
        className="w-6 h-6 m-4 text-gray-700 cursor-pointer md:hidden"
      />
      <Link to="/">
        <img src="logo.png" alt="" className="aspect-square h-8 md:h-14 hidden md:block" />
      </Link>

      <span
        className="text-lg md:text-3xl font-bold text-gray-700"
        style={{ fontFamily: "'Xanh Mono', monospace" }}
      >
        HAMRO AAWAJ
      </span>
      <div className="flex items-center gap-4">
        {!user?._id ? (
          <Link to="/login">
            <Button variant="default" className="px-6">
              Login
            </Button>
          </Link>
        ) : (
          <Link to="/profile">
            <img
              src={user.profileImg}
              className="aspect-square  w-8 md:w-10 rounded-full origin-center object-cover"
            />
          </Link>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
