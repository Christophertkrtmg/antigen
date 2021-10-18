import React from "react";
import { useFormInput } from "@razzib/react-kit";

export function getElemText(e: React.ChangeEvent<Element>): string {
  return e.target.value;
}

export default function InputComponent({ name, label, type, placeholder }) {
  const [value, onChange] = useFormInput(name, getElemText);
  return (
    <div className="my-2  content-center">
      <label className="text-sm font-bold text-gray-700 tracking-wide">
        {label}
      </label>
      <input
        className="w-full  content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
