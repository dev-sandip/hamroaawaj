import { RxDashboard } from "react-icons/rx";
import { IoHomeOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { GoAlert } from "react-icons/go";
import { AiOutlineLogout } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RxAvatar } from "react-icons/rx";
import { useGlobalContext } from "@/hooks/use-global-context";
import AuthHandler from "@/handlers/auth-handler";
import toast from "react-hot-toast";
import { UserType } from "@/types/user.types";
import { motion } from "framer-motion";
import { shadows } from "@/assets/constants/styles";
import { CiCircleInfo } from "react-icons/ci";
import { GoGraph } from "react-icons/go";
import { VscFeedback } from "react-icons/vsc";

export default function Side() {
  const { user, setUser } = useGlobalContext();
  const navItems = [
    {
      label: "Home",
      href: "/",
      Icon: IoHomeOutline,
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      Icon: RxDashboard,
    },
    {
      label: "Profile",
      href: "/profile",
      Icon: RxAvatar,
    },
    {
      label: "About",
      href: "/about",
      Icon: CiCircleInfo,
    },
    {
      label: "Contributors",
      href: "/top-contributors",
      Icon: GoGraph,
    },
    {
      label: "Report",
      href: "/report",
      Icon: CiCirclePlus,
    },
    {
      label: "Emergency",
      href: "/emergency",
      Icon: GoAlert,
    },
    {
      label: "Feedback",
      href: "/feedback",
      Icon: VscFeedback,
    },
  ];
  const { pathname } = useLocation();

  const handleLogout = async () => {
    const res = await AuthHandler.logout();
    if (res.success) {
      toast.success("Logout Successful");
      setUser({} as UserType);
    } else {
      toast.error("Logout Failed, Try Again");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -1000 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(shadows.smm)}
    >
      <aside className="flex-1 relative w-64 h-[calc(100vh-80px)] flex-col flex overflow-y-auto border-r bg-muted px-6 py-8">
        <div className="mt-6 flex flex-1 flex-col justify-between flex-grow">
          <nav className="-mx-3 space-y-6  flex flex-col justify-between flex-grow">
            <div className="space-y-3 flex-grow">
              {navItems.map((item, index) => {
                if (
                  !(user?.isAdmin || user?.isMod) &&
                  item.href === "/dashboard"
                ) {
                  return null;
                }
                return (
                  <Link
                    key={index}
                    className={cn(
                      "transform items-center rounded-lg px-3 py-2 text-muted-foreground transition-colors duration-300 hover:text-foreground hover:text-gray-700 flex gap-4 justify-start",
                      item.href === "/emergency" && "text-destructive",
                      item.href === pathname
                        ? "underline underline-offset-2"
                        : ""
                    )}
                    to={item.href}
                  >
                    <item.Icon className="text-2xl" />
                    <span className="mx-2 text-lg font-medium">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
            {user?._id ? (
              <Button
                onClick={handleLogout}
                variant="secondary"
                className="w-full justify-start bg-slate-200 "
              >
                <AiOutlineLogout className="text-2xl" />
                <span className="mx-2 text-lg font-medium">Logout</span>
              </Button>
            ) : (
              <Link to="/login" className="w-full justify-start ">
                <Button
                  variant="secondary"
                  className="w-full justify-center bg-slate-200 "
                >
                  Login
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </aside>
    </motion.div>
  );
}
