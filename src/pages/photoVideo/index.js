import React, { useContext, useEffect, useState } from "react";
import { allPhotoVideos, baseUrl } from "../../api";

import { AppContext } from "../../context/app.context";
import TableComponent from "../../components/tables";
import PageHeading from "../../components/header/pageHeading";
import { AddIcon } from "../../assets/icons/icons";
import PhotoVideoTable from "./photoVideoTable";

import ButtonComponent from "../../components/buttons/button";

/*----Material UI imports---*/
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import ImagePickerComponent from "../../components/input/imageUploadComponent";
import { appendFormData } from "../../components/utils";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuComponent from "../../components/menu/MenuComponent";

function PhotoVideoMain() {
  const { token } = useContext(AppContext);
  const [allPhotoVideo, setAllPhotoVideos] = useState([]);
  const [counts, setCounts] = useState({
    home: "",
    awareness: "",
    help: "",
    fight: "",
  });

  const fetchPhotoVideoData = async () => {
    const data = await allPhotoVideos({ token: token, usertype: "dashboard" });
    console.log(data);
    if (data.code === "200") {
      setAllPhotoVideos(data.photovideoall);
      setCounts({
        home: data.photovideos[0].home,
        awareness: data.photovideos[0].awareness ?? 0,
        help: data.photovideos[0].help,
        fight: data.photovideos[0].fight,
      });
    }
  };

  useEffect(() => {
    async function myFunction() {
      await fetchPhotoVideoData();
    }
    myFunction();
  }, []);

  const users = [
    { name: "home", count: counts.home },
    { name: "awareness", count: counts.awareness },
    { name: "help", count: counts.help },
    { name: "fight", count: counts.fight },
  ];

  const [dialogOpen, setDialogOpen] = useState(false);

  const addPhotoVideo = () => {
    setDialogOpen(true);
  };

  const dialogClose = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async () => {
    const data = {
      token: token,
      heading_eng: headingEnglish,
      heading_nep: headingNepali,
      caption_eng: captionEnglish,
      caption_nep: captionNepali,
      category: category,
      photovideo: mainPhotoVideo,
    };

    var formData = appendFormData(data);

    const response = await axios.post(
      `${baseUrl}/dashboard/photovideo/registerphotovideo`,
      formData
    );

    if (response.data.code === 200) {
      console.log("data sent");
    }
    fetchPhotoVideoData();
    setDialogOpen(false);
  };

  const [headingEnglish, setHeadingEnglish] = useState("");
  const [headingNepali, setHeadingNepali] = useState("");
  const [captionEnglish, setCaptionEnglish] = useState("");
  const [captionNepali, setCaptionNepali] = useState("");
  const [category, setCategory] = useState("");
  const [mainPhotoVideo, setMainPhotoVideo] = useState([]);

  const [choose, setChoose] = useState("home");
  const handleChoose = (getchoose) => {
    switch (getchoose) {
      case "home":
        let home = allPhotoVideo.filter(
          (filterData) => filterData.category === "home"
        );
        return (
          <PhotoVideoTable
            tableData={home}
            fetchPhotoVideoData={fetchPhotoVideoData}
          />
        );

      case "awareness":
        let awareness = allPhotoVideo.filter(
          (filterData) => filterData.category === "awareness"
        );
        return (
          <PhotoVideoTable
            tableData={awareness}
            fetchPhotoVideoData={fetchPhotoVideoData}
          />
        );

      case "help":
        let help = allPhotoVideo.filter(
          (filterData) => filterData.category === "help"
        );
        return (
          <PhotoVideoTable
            tableData={help}
            fetchPhotoVideoData={fetchPhotoVideoData}
          />
        );

      case "fight":
        let fight = allPhotoVideo.filter(
          (filterData) => filterData.category === "fight"
        );
        return (
          <PhotoVideoTable
            tableData={fight}
            fetchPhotoVideoData={fetchPhotoVideoData}
          />
        );

      default:
        return (
          <PhotoVideoTable
            tableData={allPhotoVideo}
            fetchPhotoVideoData={fetchPhotoVideoData}
          />
        );
    }
  };

  return (
    <>
      <MenuComponent setChoose={setChoose} menuItem={users} />
      <div className="mx-5 border rounded-md">
        <div className="flex justify-between mx-5 py-5">
          <PageHeading title="Photo and Videos" />
          <div className="flex text-gray-700" onClick={addPhotoVideo}>
            <div className="flex mx-2 items-center cursor-pointer text-red-700">
              {AddIcon}
              <div className="ml-1">Add Photo/Video</div>
            </div>
          </div>
        </div>
        <TableComponent
          thead={[
            "Heading English",
            "Heading Nepali",
            "Caption English",
            "Caption Nepali",
            "Category",
            "Photo/Video",
            "Action",
          ]}
        >
          {handleChoose(choose)}
        </TableComponent>
        <Dialog
          open={dialogOpen}
          onClose={dialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" className="balance__title">
            Add photo Video
          </DialogTitle>
          <DialogContent>
            <div className={className.inputBox}>
              <label className={className.inputLabel}>Heading English</label>
              <input
                className={className.inputField}
                type="text"
                name="heading_eng"
                onChange={(e) => setHeadingEnglish(e.target.value)}
              />
            </div>
            <div className={className.inputBox}>
              <label className={className.inputLabel}>Heading Nepali</label>
              <input
                className={className.inputField}
                type="text"
                name="heading_nep"
                onChange={(e) => setHeadingNepali(e.target.value)}
              />
            </div>
            <div className={className.inputBox}>
              <label className={className.inputLabel}>Caption English</label>
              <input
                className={className.inputField}
                type="text"
                name="caption_eng"
                onChange={(e) => setCaptionEnglish(e.target.value)}
              />
            </div>
            <div className={className.inputBox}>
              <label className={className.inputLabel}>Caption Nepali</label>
              <input
                className={className.inputField}
                type="text"
                name="caption_nep"
                onChange={(e) => setCaptionNepali(e.target.value)}
              />
            </div>
            <div className={className.inputBox}>
              <div style={{ width: "400px" }}>
                <FormControl fullWidth>
                  <InputLabel id="survey-temp-scale-label">
                    Choose Category
                  </InputLabel>
                  <Select
                    defaultValue="home"
                    labelId="survey-temp-scale-label"
                    id="survey-temp-scale"
                    value={category}
                    label="Age"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <MenuItem value={"home"}>home</MenuItem>
                    <MenuItem value={"awareness"}>awareness</MenuItem>
                    <MenuItem value={"help"}>help</MenuItem>
                    <MenuItem value={"fight"}>fight</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <ImagePickerComponent
              label="Survey Image"
              color="bg-blue-800"
              onImageChange={setMainPhotoVideo}
            />

            <div className="mt-5">
              <ButtonComponent
                title="Submit"
                color="bg-green-500"
                onClick={handleSubmit}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

const className = {
  inputBox: "my-2 content-center",
  inputLabel: "text-sm font-bold text-gray-700 tracking-wide",
  inputField:
    "w-full  content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500",
};

/* const AddPhotoVideoModel = ({ hide }) => {
  return (
    <CustomModal title="Add Questions" hide={hide}>
      <AddQuestionForm />
    </CustomModal>
  );
};
 */
export default PhotoVideoMain;
