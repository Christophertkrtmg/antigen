import React, { useContext, useState } from "react";
import MainHeader from "../header/header";
import Sidebar from "../sidebar/sidebar";
import { ModalProvider } from "@razzib/react-kit";
import { AppContext } from "../../context/app.context";

function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { mode } = useContext(AppContext);
  const className = {
    main: "flex-1 px-6 overflow-x-hidden overflow-y-auto bg-white",
    blurBg: `fixed z-20 inset-0 bg-black opacity-50 transition-opacity ${
      sidebarOpen ? "sm:block lg:hidden" : "hidden "
    }`,
  };

  const openCloseSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <ModalProvider>
      <div className={mode && "dark"}>
        <div className="flex h-screen dark:bg-red">
          <div onClick={openCloseSidebar} className={className.blurBg}></div>
          <Sidebar sidebarOpen={sidebarOpen} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <MainHeader onClick={openCloseSidebar} sidebarOpen={sidebarOpen} />
            <main className={className.main}>{children}</main>
          </div>
        </div>
      </div>
    </ModalProvider>
  );
}

export default MainLayout;
