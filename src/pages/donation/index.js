import React, { useState } from "react";
import DonationCard from "./DonationCard";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

function Donation() {
  const [openDonation, setOpenDonation] = useState(false); //To open new donation card create material dialog box state

  const [newTitle, setNewTitle] = useState();
  const [newDescription, setNewDescription] = useState();
  const [newTargetGoal, setNewTargetGoal] = useState();
  const [newBankName, setNewBankName] = useState();
  const [newBankAccount, setNewBankAccount] = useState();
  const [newLogo, setNewLogo] = useState("");
  const [addDonationAmount, setAddDonationAmount] = useState(0);

  //Open dialog box where new donation form is opened to create a new donation card
  const handleAddDonation = () => {
    setOpenDonation(true);
  };

  //Close new donation card form
  const closeDonation = () => {
    setOpenDonation(false);
  };

  //Add new donation card
  const confirmAddDonation = () => {
    setOpenDonation(false);
    const data = {
      logo: newLogo,
      title: newTitle,
      description: newDescription,
      targetGoal: newTargetGoal,
      collected: addDonationAmount,
      bankName: newBankName,
      newBankAccount: newBankAccount,
    };

    donationList.push(data);
  };

  return (
    <div className="p-2">
      <div className="flex flex-wrap justify-center">
        {donationList.map((eachDonation) => (
          <DonationCard
            props={eachDonation}
            key={eachDonation.id}
            setAddDonationAmount={setAddDonationAmount}
          />
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <div
          className="cursor-pointer outline-none border-none rounded-lg bg-blue-500 text-white px-4 py-2 hover:bg-green-500"
          onClick={handleAddDonation}
        >
          Add New Donation
        </div>
      </div>
      <Dialog
        open={openDonation}
        onClose={closeDonation}
        aria-labelledby="form-dialog-addDonation"
      >
        <DialogContent>
          <div className={className.inputBox}>
            <label className={className.inputLabel}>Donation Title</label>
            <input
              className={className.inputField}
              type="text"
              name="donation_title"
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div className={className.inputBox}>
            <label className={className.inputLabel}>Donation Description</label>
            <input
              className={className.inputField}
              type="text"
              name="donation_description"
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          <div className={className.inputBox}>
            <label className={className.inputLabel}>Donation Target</label>
            <input
              className={className.inputField}
              type="number"
              name="donation_target"
              placeholder="Enter goal amount (Number)"
              onChange={(e) => setNewTargetGoal(e.target.value)}
            />
          </div>
          <div className={className.inputBox}>
            <label className={className.inputLabel}>Logo Url</label>
            <input
              className={className.inputField}
              type="text"
              name="donation_description"
              placeholder="logo url"
              onChange={(e) => setNewLogo(e.target.value)}
            />
          </div>

          <div className={className.inputBox}>
            <label className={className.inputLabel}>Bank Name</label>
            <input
              className={className.inputField}
              type="text"
              name="donation_bankName"
              onChange={(e) => setNewBankName(e.target.value)}
            />
          </div>
          <div className={className.inputBox}>
            <label className={className.inputLabel}>Bank Account Number</label>
            <input
              className={className.inputField}
              type="number"
              name="donation_bankAccountNumber"
              onChange={(e) => setNewBankAccount(e.target.value)}
            />
          </div>
          <div className="flex justify-center mt-5">
            <div
              className="cursor-pointer outline-none border-none rounded-lg bg-blue-500 text-white px-4 py-2 hover:bg-green-500"
              onClick={confirmAddDonation}
            >
              Add
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Donation;

const className = {
  inputBox: "my-2 content-center",
  inputLabel: "text-sm font-bold text-gray-700 tracking-wide",
  inputField:
    "w-full  content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500",
};

//Dummy data array
const donationList = [
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ3LF8LvX6rVhvBAr_jnh7W7TCJVdAecf7Fw&usqp=CAU",
    title: "Donation for langtang",
    description: "Lorem ipsum ladsadnajdn asdj ad",
    id: 1,
    targetGoal: 50000,
    collected: 12000,
    bankName: "Nepal Bank LTD",
    bankAccount: 78945412354897,
  },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSygZMPOdHR5PdI5ep1PWCERYy59Lxsu6EBUg&usqp=CAU",
    title: "Donation for cause of music",
    description: "judnasjdknakjs akjsd akjs d akjsd akjs djka sdkjas dkaj ",
    id: 2,
    targetGoal: 20000,
    collected: 20000,
    bankName: "Prabhu Bank LTD",
    bankAccount: 78945121315464,
  },
  {
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST9Bj04UUgRET0JT4J8kZ3Lq60KlDUrrUAuA&usqp=CAU",
    title: "Donation title 3",
    description: "asudnaskjdn asd jaks dkja jka sdkja sdjk asdkj askj asda",
    id: 3,
    targetGoal: 30000,
    collected: 7000,
    bankName: "Nabil Bank LTD",
    bankAccount: 65484154841518,
  },
];
