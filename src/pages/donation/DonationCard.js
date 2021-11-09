//Donation card

import React, { useState } from "react";
import NumberFormat from "react-number-format";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DonationBox from "./DonationBox";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

function DonationCard({ props, setAddDonationAmount }) {
  const [openDonation, setOpenDonation] = useState(false); //To open fullscreen donation box state

  //Open donation box full screen dialog box
  const handleOpenDonation = () => {
    setOpenDonation(true);
  };

  //Close fullscreen donation dialog box
  const closeDonation = () => {
    setOpenDonation(false);
  };

  return (
    <>
      <div
        className="h-80 w-60 p-2 flex flex-col items-center rounded-xl shadow-2xl justify-between m-5 cursor-pointer relative"
        onClick={handleOpenDonation}
      >
        <div className="absolute right-1 top-1">
          {props.targetGoal === props.collected ? (
            <DoneAllIcon />
          ) : (
            <DonutLargeIcon />
          )}
        </div>
        <img className="w-40 h-40 object-cover" src={props.logo} alt="" />
        <div className="my-1 font-serif capitalize">{props.title}</div>
        <div className="text-xs px-1">{props.description}</div>
        <div className="text-sm my-1 text-blue-900 font-bold">
          <NumberFormat
            value={props.targetGoal}
            prefix="Target Rs: "
            suffix=" /-"
            thousandsGroupStyle="lakh"
            thousandSeparator
          />
        </div>
      </div>
      <Dialog
        fullScreen
        open={openDonation}
        onClose={closeDonation}
        aria-labelledby="form-dialog-addDonation"
      >
        <DialogContent>
          <DonationBox
            props={props}
            closeDonation={closeDonation}
            setAddDonationAmount={setAddDonationAmount}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DonationCard;
