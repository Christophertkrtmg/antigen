import React from "react";
import { useFormInput } from "@razzib/react-kit";

export default function SwitchComponent({ name, label,  }) {
  const [value, onChange] = useFormInput(name);
  console.log(name, "name");
  const toogleSwitch = () => onChange(!value);

  return (
    <div className="flex w-full mb-12">
      <label htmlFor={name} className="flex items-center cursor-pointer pr-3">
        <div className="relative">
          <input
            type="checkbox"
            id={name}
            className="sr-only"
            checked={value}
            onChange={toogleSwitch}
          />
          <div
            className={`block ${
              value ? "bg-green-300" : "bg-red-600"
            } w-14 h-8 rounded-full`}
          ></div>
          <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
        </div>
      </label>
      {label}
    </div>
  );
}
