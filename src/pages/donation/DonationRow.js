import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";

function DonationRow({
  name,
  email,
  amount,
  photo,
  verify,
  props,
  setAddDonationAmount,
}) {
  const [openPhoto, setOpenPhoto] = useState(false);
  const [photoVerify, setPhotoVerify] = useState(false);
  const [finalDialog, setFinalDialog] = useState(false);
  const [textButton, setTextButton] = useState(false);

  const handlePhotoClick = () => {
    setOpenPhoto(true);
  };

  const closePhoto = () => {
    setOpenPhoto(false);
    setPhotoVerify(false);
  };

  const confirmPhoto = () => {
    setOpenPhoto(false);
    setPhotoVerify(true);
  };

  const handleFinalDialog = () => {
    setFinalDialog(true);
  };

  const closeFinalDialog = () => {
    setFinalDialog(false);
  };

  const confirmFinalVerify = () => {
    setTextButton(true);
    setFinalDialog(false);
    let finalCollected = parseInt(parseInt(amount) + parseInt(props.collected));
    setAddDonationAmount(finalCollected);
  };

  return (
    <tr className="text-gray-700 dark:bg-red border-b-2 border-gray-100">
      <td className={className.td}>
        <div className="flex flex-col">
          <div className={className.topPrimary}>{name}</div>
        </div>
      </td>
      <td className={className.td}>
        <div className="flex flex-col">
          <div className={className.botSecondary}>{email}</div>
        </div>
      </td>
      <td className={className.td}>
        <div className="flex flex-col">
          <div className={className.topPrimary}>{amount}</div>
        </div>
      </td>

      <td className={className.td}>
        <div className="flex flex-col">
          <div className={className.topPrimary} onClick={handlePhotoClick}>
            <img className="h-20 w-14 cursor-pointer" src={photo} alt="" />
          </div>
        </div>
      </td>
      <td className={className.td}>
        <div className="flex flex-col">
          <div className={className.topPrimary}>
            {photoVerify ? (
              textButton ? (
                "Verified"
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  onClick={handleFinalDialog}
                >
                  Final Verify
                </Button>
              )
            ) : (
              "Unverified"
            )}
          </div>
        </div>
      </td>
      <Dialog
        open={openPhoto}
        onClose={closePhoto}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <img className="h-96 w-80" src={photo} alt="" />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={closePhoto}
          >
            Cancel Action
          </Button>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={confirmPhoto}
          >
            Confirm photo
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={finalDialog}
        onClose={closeFinalDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>
          Are you sure you want to verify this photo? This is a irreversible
          process. After confirmation, the amount will be added.
        </DialogTitle>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={closeFinalDialog}
          >
            No! Let me think again
          </Button>
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={confirmFinalVerify}
          >
            Yes verify
          </Button>
        </DialogActions>
      </Dialog>
    </tr>
  );
}

export default DonationRow;

const className = {
  td: "p-4 dark:border-dark-5 justify-center items-center ",
  avatar:
    "h-10 w-10 rounded-full flex justify-center items-center border object-cover",
  image: "h-40 w-40 rounded-full flex justify-center items-center object-cover",
  topPrimary: "text-sm font-semibold flex justify-center",
  botSecondary: "text-xs text-gray-400",
};
