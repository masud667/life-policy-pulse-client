import { Outlet } from "react-router";
import Header from "../Components/Header";
import Footer from "../Components/Footer/Footer";

const RootLayout = () => {
  return (
    <div>
        <Header></Header>
      <main className="overflow-x-clip">
        <Outlet></Outlet>
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;