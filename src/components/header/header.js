import React, { useContext } from "react";
import {
  MenuIcon,
  Usercircle,
  SearchIcon,
  NotificationIcon,
  darkIcon,
  lightIcon,
} from "../../assets/icons/icons";
import { AppContext } from "../../context/app.context";

function MainHeader({ onClick, pageTitle }) {
  const { mode, toogleMode, session } = useContext(AppContext);
  return (
    <header className={className.header}>
      <div className="flex">
        <button className={className.menu} onClick={() => onClick()}>
          {MenuIcon}
        </button>
        <span className={className.pageTitle}>{pageTitle}</span>
      </div>
      <div className="flex items-center">
        <div className={className.headerIcons}>
          <span className="pr-4 cursor-pointer" onClick={() => toogleMode()}>
            {mode ? darkIcon : lightIcon}
          </span>
          {SearchIcon}{" "}
          <div className="relative mx-5 flex">
            {NotificationIcon}
            <span className={className.notificationBadge} />
          </div>
        </div>
        <div className={className.userSession}>
          <p className={className.userName}>{session.user.name}</p>
          {Usercircle}
        </div>
      </div>
    </header>
  );
}

const className = {
  header:
    "flex justify-between items-center border-b shadow py-4  bg-white px-8 ",
  menu: "lg:hidden pointer-cursor",
  pageTitle: "font-bold text-lg pl-3",
  userSession: "flex items-center ml-4 text-gray-500",
  userName: "pr-3 uppercase font-semibold text-sm tracking-tighter",
  notificationBadge:
    "absolute left-3 bottom-3 font-serif bg-blue-700 text-white rounded-full h-2 w-2 flex items-center justify-center",
  headerIcons: "flex items-center text-gray-300 border-r-2 border-gray-300",
};

export default MainHeader;
