import React, { useState } from "react";
import TableComponent from "../../components/tables";
import { SortAscIcon, SortDescIcon } from "../../assets/icons/icons.js";
import PageHeading from "../../components/header/pageHeading";
import BloodTable from "./BloodTable";

function BloodSection({ tableData, title }) {
  const [sort, setSort] = useState(true);

  const handleDonation = (sort) => {
    switch (sort) {
      case true:
        let donationTrue = tableData.filter(
          (user) => user.blood_dontation_status === true
        );
        return <BloodTable tableData={donationTrue} />;

      case false:
        let donationFalse = tableData.filter(
          (user) => user.blood_dontation_status === false
        );
        return <BloodTable tableData={donationFalse} />;

      default:
        return <BloodTable tableData={tableData} />;
    }
  };

  return (
    <div className="mx-5 border rounded-md">
      <div className="flex justify-between mx-5 py-5">
        <PageHeading title={title} />
      </div>
      <TableComponent
        thead={[
          "Name",
          "Contact Location",
          `Blood Type`,
          <div className="flex justify-center">
            Donation Status
            <div
              className="flex ml-2 items-center cursor-pointer"
              onClick={() => setSort(!sort)}
            >
              {sort ? SortAscIcon : SortDescIcon}
            </div>
          </div>,
          "Is Plasma Donor",
        ]}
      >
        {handleDonation(sort)}
      </TableComponent>
    </div>
  );
}

export default BloodSection;
