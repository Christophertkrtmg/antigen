import React from "react";
import CustomModal from "../../components/modals/modal";
import { useModal } from "@razzib/react-kit";
import CurrentStatus from "../../components/stats/CurrentStatus";
import PageHeading from "../../components/header/pageHeading";
import { AddIcon } from "../../assets/icons/icons";
import AddDashUserForm from "./dashUserForm";
import TableComponent from "../../components/tables";

// const users = [{ name: "total users", count: "10" }];

function DashUsers() {
  const { show, hide } = useModal(AddHelpLineModal);

  return (
    <>
      <div className="flex flex-wrap mx-5 my-5 bg-white justify-between xl:mx-6">
        {/* {users.map((item, index) => {
          return (
            <CurrentStatus key={index} name={item.name} count={item.count} />
          );
        })} */}
      </div>
      <div className="mx-5 border rounded-md">
        <div className="flex justify-between mx-5 py-5">
          <PageHeading title="Dashboad users" />
          <div className="flex text-gray-700">
            <div className="flex mx-2 items-center cursor-pointer text-red-700">
              {AddIcon}{" "}
              <div className="ml-1" onClick={() => show({ hide })}>
                Add Dashboad users
              </div>
            </div>
          </div>
        </div>
        <TableComponent
          thead={["Sn", "Name", "Email", "User Type", "Actions"]}
        ></TableComponent>
      </div>
    </>
  );
}

const AddHelpLineModal = ({ hide }) => {
  return (
    <CustomModal title="Add Dashboard Users" hide={hide}>
      <AddDashUserForm hide={hide} />
    </CustomModal>
  );
};
export default DashUsers;
