import React, { useContext, useEffect, useState } from "react";
import { allUsersData } from "../../api";
import { AppContext } from "../../context/app.context.js";
import TableComponent from "../../components/tables/index.js";
import PageHeading from "../../components/header/pageHeading.js";
import UserTable from "./userTable.js";
import MenuComponent from "../../components/menu/MenuComponent.js";

function Users() {
  const { token } = useContext(AppContext);
  const [userdata, setUsers] = useState([]);
  const [userCounts, SetUserCounts] = useState({});
  const [totalVaccinated, setTotalVaccinated] = useState("");

  const fetchUsersData = async () => {
    const data = await allUsersData({ token: token });
    console.log(data);
    if (data.code === "200") {
      setUsers(data.latestusers);
      SetUserCounts(data.users[0]);
      setTotalVaccinated(data.totalvaccinated);
    }
  };

  useEffect(() => {
    async function myFunction() {
      await fetchUsersData();
    }
    myFunction();
  }, []);

  const users = [
    { name: "healthy", count: `${userCounts.healthy}`, bg: "bg-green-500" },
    {
      name: "unhealthy",
      count: `${userCounts.unhealthy}`,
      bg: "bg-yellow-500",
    },
    {
      name: "covid prediction",
      count: `${userCounts.covid_prediction}`,
      bg: "bg-red-500",
    },
    // { name: "panic", count: `${userCounts.panic}`, bg: "bg-purple-500" },
    { name: "users", count: `${userCounts.total}` },
    { name: "total vaccinated", count: totalVaccinated },
  ];

  const [choose, setChoose] = useState("users");

  const handleAllFilter = (event) => {
    const searchWord = event.target.value;
    const newFilter = userdata.filter((user) => {
      return user.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      fetchUsersData();
    } else {
      setUsers(newFilter);
    }
  };

  const handleBackDelete = (event) => {
    var key = event.keyCode || event.charCode;
    if (key === 8 || key === 46) return fetchUsersData();
  };

  const handleChoose = (getchoose) => {
    switch (getchoose) {
      case "healthy":
        let healthy = userdata.filter(
          (filterData) => filterData.recent_health[0].status.default === 0
        );
        return <UserTable tableData={healthy} />;

      case "unhealthy":
        let unhealthy = userdata.filter(
          (filterData) => filterData.recent_health[0].status.default === 1
        );
        return <UserTable tableData={unhealthy} />;

      case "covid prediction":
        let detected = userdata.filter(
          (filterData) => filterData.recent_health[0].status.default === 2
        );
        return <UserTable tableData={detected} />;

      default:
        return <UserTable tableData={userdata} />;
    }
  };

  return (
    <main className="mb-14">
      <MenuComponent setChoose={setChoose} menuItem={users} />

      <section className="mx-5 rounded-md">
        <div className="flex justify-between mx-5 py-5">
          <PageHeading title="Users" />
          <div className="flex text-gray-700">
            <input
              type="text"
              placeholder="search user"
              className="outline-none bg-black text-white rounded-md px-4 cursor-pointer"
              onChange={handleAllFilter}
              onKeyDown={handleBackDelete}
            />
          </div>
        </div>
        <TableComponent
          thead={[
            "Name",
            "Contact Location",
            "Vaccination Status",
            "Detected Date",
            "Status",
          ]}
        >
          {handleChoose(choose)}
        </TableComponent>
      </section>
    </main>
  );
}

export default Users;
