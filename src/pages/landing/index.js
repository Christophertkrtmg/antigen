import { useRouter } from "@razzib/react-kit";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { allDashboardData, allUsersData, AUTH_API } from "../../api";
import { AppContext } from "../../context/app.context";
import RecentUserSection from "./recentUsers";
import RecentUsers from "./recentUsers";
import TopStatusCards from "./topStatusCards";

function DashboardLanding() {
  const [latestUser, setLatestUsers] = useState([]);
  const { token, checkSession } = useContext(AppContext);
  const router = useRouter();
  const [users, setUsers] = useState({
    healthy: "",
    unhealthy: "",
    covid_prediction: "",
    total: "",
    panic: "",
  });

  const getDashboardData = async () => {
    const tok = localStorage.getItem("ggdashtok");
    allUsersData({ token: token }).then((response) => {
      localStorage.setItem("ggdashtok", token);
      if (response.code === "200") {
        setLatestUsers(response.latestusers);
        setUsers({
          healthy: response.users[0].healthy,
          unhealthy: response.users[0].unhealthy,
          covid_prediction: response.users[0].covid_prediction,
          total: response.users[0].total,
          panic: response.totalpanic,
        });
      } else if (response.code === "403") {
        localStorage.removeItem("ggdashtok");
        localStorage.removeItem("ggdashuser");
      }
    });
  };

  useEffect(async () => {
    await getDashboardData();
  }, []);

  return (
    <main className="mb-5">
      <TopStatusCards users={users} />
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 mt-14 lg:space-x-5 md:space-x-3 ">
        <RecentUserSection latestUser={latestUser} />
        <div className="col-span-2 p-5 border mt-2 lg:mt-0 md:mt-0">
          <span className="font-bold text-xl p-2">Top Status</span>
        </div>
      </section>
    </main>
  );
}

export default DashboardLanding;
