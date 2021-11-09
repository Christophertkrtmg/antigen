import React, { useContext, useEffect, useState } from "react";
import TableComponent from "../../components/tables/index.js";
import PanicTable from "./PanicTable.js";
import { allPanicsData } from "../../api";
import { AppContext } from "../../context/app.context.js";
import MenuComponent from "../../components/menu/MenuComponent.js";

function Panic() {
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
    { name: "all", count: "512" },
    { name: "pending", count: "64" },
    { name: "in progress", count: "43" },
    { name: "helped", count: "350" },
  ];

  useEffect(() => {
    async function myFunction() {
      await fetchPanicData();
    }
    myFunction();
  }, []);

  const [choose, setChoose] = useState(""); //State of choose option from menubar list

  //Function after user choose an option from menu bar
  const handleChoose = (getchoose) => {
    switch (getchoose) {
      case "pending":
        let responsePending = tableData.filter(
          (filterData) => filterData.response_status === "pending"
        );
        return responsePending.map((panicUser) => (
          <PanicTable
            id={panicUser.id}
            key={panicUser.id}
            name={panicUser.name}
            location={panicUser.location}
            coordinate_lat={panicUser.coordinate_lat}
            coordinate_long={panicUser.coordinate_long}
            phone={panicUser.phone}
            response_status={panicUser.response_status}
            status={panicUser.status}
            panic_date={panicUser.panic_date}
            emergency_phone={panicUser.emergency_phone}
          />
        ));

      case "in progress":
        let responseInProgress = tableData.filter(
          (filterData) => filterData.response_status === "in progress"
        );
        return responseInProgress.map((panicUser) => (
          <PanicTable
            id={panicUser.id}
            key={panicUser.id}
            name={panicUser.name}
            location={panicUser.location}
            coordinate_lat={panicUser.coordinate_lat}
            coordinate_long={panicUser.coordinate_long}
            phone={panicUser.phone}
            response_status={panicUser.response_status}
            status={panicUser.status}
            panic_date={panicUser.panic_date}
            emergency_phone={panicUser.emergency_phone}
          />
        ));

      case "helped":
        let responseHelped = tableData.filter(
          (filterData) => filterData.response_status === "helped"
        );
        return responseHelped.map((panicUser) => (
          <PanicTable
            id={panicUser.id}
            key={panicUser.id}
            name={panicUser.name}
            location={panicUser.location}
            coordinate_lat={panicUser.coordinate_lat}
            coordinate_long={panicUser.coordinate_long}
            phone={panicUser.phone}
            response_status={panicUser.response_status}
            status={panicUser.status}
            panic_date={panicUser.panic_date}
            emergency_phone={panicUser.emergency_phone}
          />
        ));

      default:
        return tableData.map((panicUser) => (
          <PanicTable
            id={panicUser.id}
            key={panicUser.id}
            name={panicUser.name}
            location={panicUser.location}
            coordinate_lat={panicUser.coordinate_lat}
            coordinate_long={panicUser.coordinate_long}
            phone={panicUser.phone}
            response_status={panicUser.response_status}
            status={panicUser.status}
            panic_date={panicUser.panic_date}
            emergency_phone={panicUser.emergency_phone}
          />
        ));
    }
  };

  return (
    <>
      {/*Menu Component is top menu bar component from where we choose different option and render the data */}
      <MenuComponent setChoose={setChoose} menuItem={users} />
      <TableComponent
        thead={[
          "Name",
          "Contact Location",
          "Parent/Guardian Phone",
          "Panic Time",
          "Response Status",
          "Status",
        ]}
      >
        {handleChoose(choose)}
      </TableComponent>
    </>
  );
}

export default Panic;

//A dummy data - panic data may be in this form
const tableData = [
  {
    id: 1,
    name: "Roshan Silwal",
    location: "chabahil",
    coordinate_lat: 27.718762628199112,
    coordinate_long: 85.34984609090209,
    phone: "9845454545",
    emergency_phone: "6546546541",
    response_status: "pending",
    status: "unhealthy",
    panic_date: "22 June 2021, 8:34 AM",
  },
  {
    id: 2,
    name: "Bigyan Yadav",
    location: "imadol",
    coordinate_lat: 27.649173641706266,
    coordinate_long: 85.34762060688774,
    phone: "6549871230",
    emergency_phone: "6546546541",
    response_status: "in progress",
    status: "unhealthy",
    panic_date: "2 June 2021, 11:34 AM",
  },
  {
    id: 3,
    name: "Anu Sharma",
    location: "bhaktapur",
    coordinate_lat: 27.670849303715322,
    coordinate_long: 85.4390348735776,
    phone: "1230456789",
    emergency_phone: "6546546541",
    response_status: "helped",
    status: "detected",
    panic_date: "12 August 2021, 3:00 PM",
  },
  {
    id: 4,
    name: "Pemba Gurung",
    location: "kalanki",
    coordinate_lat: 27.693347880167195,
    coordinate_long: 85.2786081949241,
    phone: "7412589632",
    emergency_phone: "6546546541",
    status: "healthy",
    response_status: "helped",
    panic_date: "12 August 2021, 3:00 PM",
  },
  {
    id: 5,
    name: "Bisheh Bal",
    location: "sunakothi",
    coordinate_lat: 27.630474574494766,
    coordinate_long: 85.3181666993053,
    phone: "9876541230",
    emergency_phone: "6546546541",
    status: "unhealthy",
    response_status: "helped",
    panic_date: "12 August 2021, 3:00 PM",
  },
  {
    id: 6,
    name: "Binay Joshi",
    location: "bhaktapur",
    coordinate_lat: 27.6714060247126,
    coordinate_long: 85.43792659565294,
    phone: "1456789001",
    emergency_phone: "6546546541",
    response_status: "in progress",
    status: "unhealthy",
    panic_date: "15 August 2021, 10:30 AM",
  },
];

/* 
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
            <PanicTable tableData={tableData} />
            </TableComponent>
          </>
        ) : (
          <div className="text-center py-24">
            <p>There arent any panic data</p>
          </div>
        )} 
*/
