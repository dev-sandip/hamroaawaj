import { Menu } from "lucide-react";
import Navbar from "../shared/navbar/navbar";
import Side from "../shared/sidebar/Side";
import { ScrollArea } from "../ui/scroll-area";
import { useGlobalContext } from "@/hooks/use-global-context";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { setIsSidebarOpen } = useGlobalContext();
  return (
    <main className="flex flex-col justify-between h-screen bg-gray-50">
      <Navbar />
      <div className="flex h- overflow-hidden">
        <Side />
        <ScrollArea className="flex-1">{children}</ScrollArea>
      </div>
      {/* <Footer /> */}
    </main>
  );
};
export default RootLayout;
