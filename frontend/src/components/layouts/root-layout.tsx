// import Footer from "../shared/footer/footer";
import Navbar from "../shared/navbar/navbar";
import Side from "../shared/sidebar/Side";
import { ScrollArea } from "../ui/scroll-area";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col justify-between h-screen">
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
