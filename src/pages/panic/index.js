import React, { useContext, useEffect, useState } from "react";
import {
  FilterIcon,
  SortAscIcon,
  SortDescIcon,
} from "../../assets/icons/icons.js";
import PageHeading from "../../components/header/pageHeading.js";
import TableComponent from "../../components/tables/index.js";
import CurrentStatus from "../../components/stats/CurrentStatus.js";
import PanicTable from "./PanicTable.js";
import { allHelplines, allPanicsData } from "../../api";
import { AppContext } from "../../context/app.context.js";

function Panic() {
  const [sort, setSort] = useState(false);
  const { token } = useContext(AppContext);
  const [panicData, setPanicData] = useState([]);

  const fetchPanicData = async () => {
    const data = await allPanicsData({ token: token });
    console.log(data);
    if (data.code === "311") {
      setPanicData([]);
    } else if (data.code === "200") {
      setPanicData(data.panic_data);
    } else {
      setPanicData(panicData);
    }
  };

  const users = [
    { name: "all", count: "600" },
    { name: "panic users", count: "50" },
    { name: "in progress", count: "43" },
    { name: "pending", count: "64" },
    { name: "helped", count: "500" },
  ];

  useEffect(() => {
    async function myFunction() {
      await fetchPanicData();
    }
    myFunction();
  }, []);

  /* useEffect(async () => {
    await fetchPanicData();
  }, []); */

  return (
    <>
      <div className="flex flex-wrap mx-5 my-5 bg-white xl:mx-6">
        {users.map((item, index) => {
          return (
            <div key={index} className="p-3">
              <CurrentStatus name={item.name} count={item.count} />
            </div>
          );
        })}
      </div>
      <div className="mx-5 border rounded-md">
        <div className="flex justify-between mx-5 py-5">
          <PageHeading title="panic users" />
          <div className="flex text-gray-700">
            <div
              className="flex mx-2 items-center cursor-pointer"
              onClick={() => setSort(!sort)}
            >
              {sort ? SortAscIcon : SortDescIcon}
              <div className="ml-1 text-xs md:text-sm lg:text-md">Sort</div>
            </div>
            <div className="flex mx-2 items-center cursor-pointer">
              {FilterIcon}{" "}
              <div className="ml-1 text-xs md:text-sm lg:text-md">Filter</div>
            </div>
          </div>
        </div>
        {panicData.length > 0 ? (
          <>
            <TableComponent
              thead={[
                "Name",
                "Contact Location",
                "Panic Time",
                "Response Status",
                "Status",
              ]}
            >
              {/* <PanicTable tableData={tableData} /> */}
            </TableComponent>
          </>
        ) : (
          <div className="text-center py-24">
            <p>There arent any panic data</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Panic;
