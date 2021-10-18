import React from "react";

export default function ButtonComponent({
  title,
  onClick,
  rounded,
  color,
  styles,
  size,
  textColor,
  hoverColor,
}) {
  const className = {
    btn: `w-full flex justify-center text-sm 
    ${textColor ? textColor : "text-gray-100 hover:text-white"}  ${
      hoverColor
        ? `hover:${hoverColor} hover:text-white`
        : " hover:bg-indigo-600 hover:text-white"
    }
    tracking-wide font-semibold text-center
    focus:outline-none focus:shadow-outline
     shadow-lg cursor-pointer 
     ${size ? size : "p-3"} 
     transition ease-in duration-300 ${rounded && rounded} 
     ${color ? color : "bg-indigo-500"}`,
  };
  return (
    <button onClick={onClick} className={styles ? styles : className.btn}>
      <div className="text-center">{title}</div>
    </button>
  );
}
