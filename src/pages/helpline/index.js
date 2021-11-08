import React, { useContext, useEffect, useState } from "react";
import { AddIcon } from "../../assets/icons/icons";
import PageHeading from "../../components/header/pageHeading";
import CustomModal from "../../components/modals/modal";
import { useModal } from "@razzib/react-kit";
import AddHelpLineForm from "./helplineForm";
import { allHelplines } from "../../api";
import { AppContext } from "../../context/app.context";
import TableComponent from "../../components/tables";
import HelplineTable from "./helplineTable";
import MenuComponent from "../../components/menu/MenuComponent";

function HelpLineMain() {
  const { token } = useContext(AppContext);
  const [helplines, setHelpLines] = useState([]);

  const getHelpLineData = async () => {
    const data = await allHelplines({ token: token });
    if (data.code === "200") {
      setHelpLines(data.helplines);
    }
  };

  const { show, hide } = useModal(AddHelpLineModal);

  useEffect(() => {
    async function myFunction() {
      await getHelpLineData();
    }
    myFunction();
  }, []);

  /* useEffect(async () => {
    await getHelpLineData();
  }, []); */

  const users = [{ name: "total", count: helplines.length }];

  const [choose, setChoose] = useState("");

  return (
    <>
      <MenuComponent setChoose={setChoose} menuItem={users} />
      <div className="mx-5 border rounded-md">
        <HelplineHeading
          show={show}
          hide={hide}
          getHelpLineData={getHelpLineData}
        />
        <TableComponent
          thead={[
            "Name English",
            "Name English",
            "Contact",
            "Location",
            "Logo",
            "Status",
            "HelpType",
            "Action",
          ]}
        >
          <HelplineTable
            tableData={helplines}
            getHelpLineData={getHelpLineData}
          />
        </TableComponent>
      </div>
    </>
  );
}

const HelplineHeading = ({ show, hide, getHelpLineData }) => {
  return (
    <div className="flex justify-between mx-5 py-5">
      <PageHeading title="HelpLine users" />
      <div className="flex text-gray-700">
        <div className="flex mx-2 items-center cursor-pointer text-red-700">
          {AddIcon}{" "}
          <div className="ml-1" onClick={() => show({ hide, getHelpLineData })}>
            Add Helplines
          </div>
        </div>
      </div>
    </div>
  );
};

const AddHelpLineModal = ({ hide, getHelpLineData }) => {
  return (
    <CustomModal title="Add HelpLine" hide={hide}>
      <AddHelpLineForm hide={hide} getHelpLineData={getHelpLineData} />
    </CustomModal>
  );
};

export default HelpLineMain;
