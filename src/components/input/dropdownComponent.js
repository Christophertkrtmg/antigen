import React, { useState } from "react";
import { useFormInput } from "@razzib/react-kit";
import ButtonComponent from "../buttons/button";

function DropdownComponent({ dropdownItems, name }) {
  const [show, setShow] = useState();
  const [value, onChange] = useFormInput(name);

  const handleDropdownChange = (item) => {
    onChange(item);
    setShow(false);
  };

  const toggleDropdown = () => {
    setShow(!show);
    console.log(show, "ok");
  };

  const userButtonTitle = () => {
    return (
      <div className="flex">
        <div className="pl-2">{value ? value : "user"}</div>
      </div>
    );
  };

  return (
    <div className="relative dark:bg-gray-800 flex justify-center items-center">
      <ButtonComponent
        title={userButtonTitle()}
        onClick={toggleDropdown}
        color="bg-gray-200"
        rounded="rounded-md"
        textColor="text-black"
      />
      {show && (
        <div className={className.dropdown}>
          <ul className={className.ul}>
            {dropdownItems.map((item, index) => {
              return (
                <li
                  className={className.li}
                  key={index}
                  onClick={() => handleDropdownChange(item)}
                >
                  <a className={className.ahref}>{item}</a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

const className = {
  dropdown:
    "absolute w-60 px-5 py-3 dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent mt-5 top-10",
  li: "font-medium cursor-pointer hover:bg-gray-200",
  ul: "space-y-3 dark:text-white",
  ahref:
    "flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700",
};

export default DropdownComponent;
