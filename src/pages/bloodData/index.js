import React, { useContext, useEffect, useState } from "react";
import { allBloodData } from "../../api";
import CurrentStatus from "../../components/stats/CurrentStatus";
import { AppContext } from "../../context/app.context";
import BloodSection from "./BloodSection";

function BloodData() {
  const [choose, setChoose] = useState("");
  const { token } = useContext(AppContext);
  const [userBloodData, setUserBloodData] = useState([]);
  const [bloodCounts, SetBloodCounts] = useState({
    apos: "",
    aneg: "",
    abpos: "",
    abneg: "",
    bpos: "",
    bneg: "",
    opos: "",
    oneg: "",
    unverified: "",
    totalverifiedUser: "",
  });
  const [totalVerified, setTotalVerified] = useState();

  const fetchBloodData = async () => {
    const data = await allBloodData({ token: token });
    if (data.code === "311") {
    } else if (data.code === "200") {
      SetBloodCounts({
        a: data.userblood_data[0].A,
        ab: data.userblood_data[0].AB,
        abneg: data.userblood_data[0].ABneg,
        abpos: data.userblood_data[0].ABpos,
        aneg: data.userblood_data[0].Aneg,
        apos: data.userblood_data[0].Apos,
        b: data.userblood_data[0].B,
        bpos: data.userblood_data[0].Bpos,
        bneg: data.userblood_data[0].Bneg,
        o: data.userblood_data[0].O,
        oneg: data.userblood_data[0].Oneg,
        opos: data.userblood_data[0].Opos,
        unverified: data.userblood_data[0].unverified,
        totalverifiedUser: data.totalverifiedUser,
      });
      setUserBloodData(data.allusers);
      setTotalVerified(data.totalverfiedusers);
    }
  };

  console.log(userBloodData);

  useEffect(() => {
    async function fetchFunction() {
      await fetchBloodData();
    }
    fetchFunction();
  }, []);

  const bloodData = [
    { name: "A+", count: bloodCounts.apos },
    { name: "A-", count: bloodCounts.aneg },
    { name: "B+", count: bloodCounts.bpos },
    { name: "B-", count: bloodCounts.bneg },
    { name: "AB+", count: bloodCounts.abpos },
    { name: "AB-", count: bloodCounts.abneg },
    { name: "O+", count: bloodCounts.opos },
    { name: "O-", count: bloodCounts.oneg },
    { name: "Unverified", count: bloodCounts.unverified },
    { name: "Total Verified", count: totalVerified },
  ];

  const handleSwitchBlood = (getchoose) => {
    switch (getchoose) {
      case "A+":
        let bloodApos = userBloodData.filter(
          (filterData) => filterData.blood_type === "A+"
        );
        return <BloodSection tableData={bloodApos} title="Blood Data A+" />;

      case "A-":
        let bloodAneg = userBloodData.filter(
          (filterData) => filterData.blood_type === "A-"
        );
        return <BloodSection tableData={bloodAneg} title="Blood Data A-" />;

      case "B+":
        let bloodBpos = userBloodData.filter(
          (filterData) => filterData.blood_type === "B+"
        );
        return <BloodSection tableData={bloodBpos} title="Blood Data B+" />;

      case "B-":
        let bloodBneg = userBloodData.filter(
          (filterData) => filterData.blood_type === "B-"
        );
        return <BloodSection tableData={bloodBneg} title="Blood Data B-" />;

      case "AB+":
        let bloodABpos = userBloodData.filter(
          (filterData) => filterData.blood_type === "AB+"
        );
        return <BloodSection tableData={bloodABpos} title="Blood Data AB+" />;

      case "AB-":
        let bloodABneg = userBloodData.filter(
          (filterData) => filterData.blood_type === "AB-"
        );
        return <BloodSection tableData={bloodABneg} title="Blood Data AB-" />;

      case "O+":
        let bloodOpos = userBloodData.filter(
          (filterData) => filterData.blood_type === "O+"
        );
        return <BloodSection tableData={bloodOpos} title="Blood Data O+" />;

      case "O-":
        let bloodOneg = userBloodData.filter(
          (filterData) => filterData.blood_type === "O-"
        );
        return <BloodSection tableData={bloodOneg} title="Blood Data O-" />;

      default:
        return <BloodSection tableData={userBloodData} title="Blood Data" />;
    }
  };

  return (
    <main className="mb-14">
      <div className="flex flex-wrap mx-5 my-5 bg-white xl:mx-6">
        {bloodData.map((item, index) => {
          return (
            <div onClick={() => setChoose(item.name)} className="p-3">
              <CurrentStatus key={index} name={item.name} count={item.count} />
            </div>
          );
        })}
      </div>
      {handleSwitchBlood(choose)}
    </main>
  );
}
export default BloodData;
