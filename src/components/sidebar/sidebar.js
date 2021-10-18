import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../context/app.context";
import ButtonComponent from "../buttons/button";
import GGLogo from "../../assets/images/GG_ANTIGEN_NAV.png";

/* Material Icons */
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SettingsIcon from "@mui/icons-material/Settings";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

function Sidebar({ sidebarOpen }) {
  const { logout } = useContext(AppContext);
  const location = useLocation();
  const pathName = location.pathname;

  const navItems = [
    { title: "Dashboard", link: "/dashboard/main", icon: <DashboardIcon /> },
    { title: "Users", link: "/dashboard/users", icon: <PeopleIcon /> },
    {
      title: "Panic Response",
      link: "/dashboard/panic",
      icon: <AccessibilityIcon />,
    },
    {
      title: "Helpline Contacts",
      link: "/dashboard/helpline",
      icon: <ConnectWithoutContactIcon />,
    },
    {
      title: "Blood Data",
      link: "/dashboard/bloodData",
      icon: <ImportContactsIcon />,
    },
    {
      title: "Photos & Videos",
      link: "/dashboard/photoVideo",
      icon: <MovieCreationIcon />,
    },
    {
      title: "Register Users",
      link: "/dashboard/dashUser",
      icon: <VerifiedUserIcon />,
    },
  ];

  const navSettings = [
    { title: "Settings", link: "/dashboard/main", icon: <SettingsIcon /> },
    {
      title: "Question & Survey",
      link: "/dashboard/Qns",
      icon: <QuestionAnswerIcon />,
    },
  ];

  const className = {
    main: `${
      sidebarOpen ? "translate-x-0 ease-out" : "-translate-x-full ease-in"
    } fixed z-30 inset-y-0 left-0 w-56 h-full transition duration-300 transform bg-green-700 lg:translate-x-0 lg:static lg:inset-0`,
    link: "flex items-center mt-3 py-1 px-6 text-sm hover:bg-gray-200 hover:text-black bg-opacity-25 text-gray-100",
    titleContainer: "flex items-center justify-center mt-4",
    logout: "absolute bottom-0 w-full p-2",
  };

  const Title = () => (
    <div className={className.titleContainer}>
      <img src={GGLogo} alt="" className="w-5/6" />
    </div>
  );

  return (
    <div className={className.main}>
      <div>
        <Link to="/dashboard/main">
          <Title />
        </Link>
      </div>

      <nav className="mt-8">
        {navItems.map((item, index) => {
          return (
            <Link
              key={index}
              className={`${className.link} ${
                pathName === item.link
                  ? "bg-black border-opacity-5"
                  : "bg-transparent"
              }`}
              to={item.link}
            >
              {item.icon}
              <span className="mx-3 text-sm">{item.title}</span>
            </Link>
          );
        })}
      </nav>
      <nav className="mt-4 border-t border-gray-600">
        {navSettings.map((item, index) => {
          return (
            <Link
              key={index}
              className={`${className.link} ${
                pathName === item.link
                  ? "bg-black border-opacity-5"
                  : "bg-transparent"
              }`}
              to={item.link}
            >
              {item.icon}
              <span className="mx-3 text-sm">{item.title}</span>
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-0 w-full">
        <ButtonComponent title="Logout" color="bg-red-500" onClick={logout} />
      </div>
    </div>
  );
}

export default Sidebar;
