import React, { useState } from "react";

function DonationCompleted() {
  const [files, setFiles] = useState([]);

  const handleChange = (event) => {
    setFiles((files) => [...event.target.files, ...files]);
  };

  return (
    <>
      <div className="flex items-center justify-center my-2">
        <div className="flex mr-2 font-bold font-serif">
          Upload Report (image/gif)
        </div>
        <div className="flex justify-center">
          <div className="cursor-pointer outline-none border-none rounded-lg bg-green-500 text-white px-4 py-2 hover:text-black">
            <input
              type="file"
              multiple
              accept="image/*, video/*"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="px-5 font-serif font-bold text-xl">Reports</div>
      <div className="p-5 h-full flex flex-wrap justify-center shadow-inner">
        {files.map((item, index) => (
          <img
            className="h-60 w-60 object-cover p-2 m-2 cursor-pointer"
            src={URL.createObjectURL(item)}
            alt=""
          />
        ))}
      </div>
    </>
  );
}

export default DonationCompleted;
