import { useRef, useState } from "react";
import { useFormController, useFormInput } from "@razzib/react-kit";
import { trashIcon, uploadIcon } from "../../assets/icons/icons";

export default function ImagePickerComponent({
  onImageChange,
  label,
  color,
  name,
}) {
  const [images, setImage] = useState([]);
  const [preview, setPreview] = useState([]);
  const [error, setError] = useState("");
  const [value, onChange] = useFormInput(name);

  const changeImage = (e) => {
    const files = e.target.files;
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      validationImage(file);
    }
  };

  const validationImage = (file) => {
    const imagetypeValidation =
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png" ||
      file.type === "image/gif" ||
      file.type === "image/svg+xml" ||
      file.type === "image/jpf" ||
      file.type === "image/mp4";
    if (imagetypeValidation) {
      setError("");
      onChange(file);
      setImage([...images, file]);
      onImageChange(file); //return image value to the caller
      setPreview([...preview, URL.createObjectURL(file)]);
    } else {
      if (imagetypeValidation) setError("File size is too big.");
      else setError("Invalid file type. Use PNG, JPG, JPEG, Svg format only.");
    }
  };

  const deleteImage = (index) => {
    const oldImages = images;
    const oldPreview = preview;
    oldImages.splice(index, 1);
    oldPreview.splice(index, 1);
    const newImages = [...oldImages];
    const newPreview = [...oldPreview];
    setImage(newImages);
    setPreview(newPreview);
    onChange("");
    // onImageChange([]);
  };

  const hiddenFileInput = useRef(null);
  const handleClick = (e) => {
    e.preventDefault();
    hiddenFileInput.current.click();
  };
  return (
    <div className="mt-3">
      <label className="text-sm font-bold text-gray-700">{label}</label>
      <div>
        <PreviewImage preview={preview} deleteImage={deleteImage} />
      </div>
      <div className="mt-3">
        <UploadButton
          images={images}
          handleClick={handleClick}
          hiddenFileInput={hiddenFileInput}
          changeImage={changeImage}
          color={color}
        />
      </div>
      {error && (
        <label
          htmlFor="error"
          className="bg-gray-200 p-3 rounded-md  flex mt-2 text-red-500 font-bold"
        >
          {error}
        </label>
      )}
    </div>
  );
}

const PreviewImage = ({ preview, deleteImage }) => {
  return (
    preview.length > 0 &&
    preview.map((item, index) => {
      return (
        <>
          <button
            className="absolute bg-red-800 p-2 rounded  mt-2 ml-1"
            onClick={() => deleteImage(index)}
          >
            {trashIcon}
          </button>
          <img src={item} className="w-100 preview" alt="" />
        </>
      );
    })
  );
};

const UploadButton = ({
  images,
  handleClick,
  hiddenFileInput,
  changeImage,
  color,
}) => {
  return (
    <>
      {images.length < 1 && (
        <button
          onClick={(e) => handleClick(e)}
          className={`${
            color ? color : "bg-purple-800"
          } justify-center hover:bg-indigo-dark text-white font-bold py-2 px-4 w-full inline-flex items-center`}
        >
          {uploadIcon}
          <span className="ml-2">Upload Image</span>
        </button>
      )}
      <input
        type="file"
        multiple={true}
        id="file"
        name="file"
        className="hidden"
        ref={hiddenFileInput}
        onChange={changeImage}
      />
    </>
  );
};
