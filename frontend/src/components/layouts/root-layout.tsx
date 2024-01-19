// import Footer from "../shared/footer/footer";
import Navbar from "../shared/navbar/navbar";
import Side from "../shared/sidebar/Side";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col justify-between h-screen">
      <Navbar />
      <div className="flex">
        <Side />
        {children}
      </div>
      {/* <Footer /> */}
    </main>
  );
};
export default RootLayout;
