import { RxDashboard } from "react-icons/rx";
import { IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
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
      label: "Report",
      href: "/report",
      Icon: CiCirclePlus,
    },
    {
      label: "Emergency",
      href: "/emergency",
      Icon: GoAlert,
    },
  ];

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
    <div>
      <aside className="flex h-[calc(100vh-72px)] w-64 flex-col overflow-y-auto border-r bg-white px-5 py-8">
        <div className="mt-6 flex flex-1 flex-col justify-between">
          <nav className="-mx-3 space-y-6  flex flex-col justify-between">
            <div className="space-y-3 ">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  className={cn(
                    "transform items-center rounded-lg px-3 py-2 text-muted-foreground transition-colors duration-300 hover:text-foreground hover:text-gray-700 flex gap-4 justify-start",
                    item.href === "/emergency" && "text-destructive"
                  )}
                  to={item.href}
                >
                  <item.Icon className="text-2xl" />
                  <span className="mx-2 text-lg font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
            {user && (
              <Button
                onClick={handleLogout}
                variant="secondary"
                className="w-full justify-start"
              >
                <AiOutlineLogout className="text-2xl" />
                <span className="mx-2 text-lg font-medium">Logout</span>
              </Button>
            )}
          </nav>
        </div>
      </aside>
    </div>
  );
}
