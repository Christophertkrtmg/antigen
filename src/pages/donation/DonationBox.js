import React, { useContext, useState } from "react";
import { AppContext } from "../../context/app.context";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import NumberFormat from "react-number-format";
import TableComponent from "../../components/tables";
import DonationRow from "./DonationRow";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CancelIcon from "@mui/icons-material/Cancel";
import DonationCompleted from "./DonationCompleted";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 25,
  borderRadius: 50,

  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.primary[theme.palette.mode === "light" ? 400 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 50,
    backgroundColor: theme.palette.mode === "light" ? "#2839bd" : "#000",
  },
}));

function DonationBox({
  props,
  closeDonation,

  setAddDonationAmount,
}) {
  /* const { collected, goalValue, setCollected, setGoalValue } =
    useContext(AppContext); */
  const [upDownVerify, setUpDownVerify] = useState(false);

  const progressBar = parseInt((props.collected / props.targetGoal) * 100);

  console.log(props);

  const handleChoose = (upDownVerify) => {
    switch (upDownVerify) {
      case true:
        let verifiedAmount = donationData.filter(
          (filterData) => filterData.verify === true
        );
        return verifiedAmount.map((userData) => (
          <DonationRow
            id={userData.id}
            key={userData.id}
            name={userData.name}
            email={userData.email}
            amount={userData.amount}
            photo={userData.photo}
            verify={userData.verify}
            props={props}
            setAddDonationAmount={setAddDonationAmount}
          />
        ));

      case false:
        let unverifiedAmount = donationData.filter(
          (filterData) => filterData.verify === false
        );
        return unverifiedAmount.map((userData) => (
          <DonationRow
            id={userData.id}
            key={userData.id}
            name={userData.name}
            email={userData.email}
            amount={userData.amount}
            photo={userData.photo}
            verify={userData.verify}
            props={props}
            setAddDonationAmount={setAddDonationAmount}
          />
        ));

      default:
        break;
    }
  };

  return (
    <div className="p-2 mb-5 flex flex-col rounded-lg shadow-lg">
      <div className="h-60 w-full flex">
        <div className="w-1/5 flex flex-col p-2">
          <img className="h-4/5 w-full" src={props.logo} alt="" />
          <div className="flex h-1/5 items-center justify-center bg-gray-700 text-gray-100">
            Donation Goal
          </div>
        </div>
        <div className="w-4/5 flex flex-col px-4 py-1">
          <div className="flex h-3/4 justify-between">
            <div className=" flex flex-col">
              <div className="font-medium  ml-2 text-2xl">{props.title}</div>
              <div className="italic text-sm ml-5 mt-1 tracking-wide max-w-md">
                {props.description}
              </div>
              <div className="flex flex-col mt-4 px-4 bg-red-200 rounded-sm">
                <div className="flex justify-between">
                  <div className="font-bold">Bank Name: </div>
                  <div className="ml-1">{props.bankName}</div>
                </div>
                <div className="flex justify-between">
                  <div className="font-bold">Bank Account Number: </div>
                  <div className="ml-1">{props.bankAccount}</div>
                </div>
              </div>
            </div>
            <div className="cursor-pointer">
              <CancelIcon fontSize="large" onClick={closeDonation} />
            </div>
          </div>

          <div className="h-1/4 flex flex-col justify-around">
            <div className="ml-1 flex justify-between text-sm font-serif italic">
              <NumberFormat
                thousandSeparator
                displayType="text"
                thousandsGroupStyle="lakh"
                prefix="Target (Rs): "
                suffix=" /-"
                value={props.targetGoal}
              />
              <NumberFormat
                displayType="text"
                thousandSeparator
                thousandsGroupStyle="lakh"
                prefix="Collected: Rs: "
                suffix=" /-"
                value={props.collected}
              />
              <div className="flex items-center">
                Status:{" "}
                {props.collected === props.targetGoal ? (
                  <div className="flex items-center ml-1">
                    Completed <DoneAllIcon />
                  </div>
                ) : (
                  <div className="flex items-center ml-1">
                    In progress <DonutLargeIcon />
                  </div>
                )}
              </div>
            </div>
            <Box sx={{ width: "100%", marginLeft: "4px" }}>
              <BorderLinearProgress variant="determinate" value={progressBar} />
            </Box>
          </div>
        </div>
      </div>
      {props.targetGoal === props.collected ? (
        <DonationCompleted />
      ) : (
        <TableComponent
          thead={[
            "Name",
            "Email",
            "Donated Amount (Rs)",
            "Photo Proof",
            <div
              className="cursor-pointer flex justify-center"
              onClick={() => setUpDownVerify(!upDownVerify)}
            >
              {upDownVerify ? (
                <div className="flex items-center">
                  Verified <ArrowDropUpIcon />
                </div>
              ) : (
                <div className="flex items-center">
                  UnVerified
                  <ArrowDropDownIcon />
                </div>
              )}
            </div>,
          ]}
        >
          {handleChoose(upDownVerify)}
        </TableComponent>
      )}
    </div>
  );
}

export default DonationBox;

const donationData = [
  {
    id: 1,
    name: "Laxman Sharma",
    email: "laxmanSharma.21@gmail.com",
    amount: 400,
    photo:
      "https://stripe-images.s3.us-west-1.amazonaws.com/works-with/d8c93029ffdc225755404e85eb4a41d4ef13468c",
    verify: false,
  },
  {
    id: 2,
    name: "Bishal Shrestha",
    email: "halcyonbishal@gmail.com",
    amount: 1500,
    photo:
      "https://s3.amazonaws.com/kb-media.populi.co/process_donation_payment.png",
    verify: false,
  },
];
