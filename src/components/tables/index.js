import React from "react";

function TableComponent({ thead, children }) {
  const className = {
    table: "table w-full p-1 bg-white shadow-sm rounded-lg overflow-auto",
    heading:
      "px-2 py-1 text-gray-800 mb-1 shadow border-black text-xs md:text-sm lg:text-sm capitalize font-semibold",
    td: "p-1 dark:border-dark-5 text-center",
  };

  return (
    <div className="overflow-auto border rounded">
      <table className={className.table}>
        <thead>
          <tr>
            {thead.map((item, index) => {
              return (
                <th
                  className={`${className.heading} ${
                    index === 0 ? "" : "border-l-2 "
                  }`}
                  key={index}
                >
                  {item}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

const TableRow = () => {
  return <></>;
};

export default TableComponent;
