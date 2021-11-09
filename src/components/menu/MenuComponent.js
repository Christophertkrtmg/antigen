//A material-UI menu component

import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function MenuComponent({ menuItem, setChoose }) {
  const [tabChoose, setTabChoose] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabChoose(newValue);
  };
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Tabs value={tabChoose} onChange={handleTabChange}>
        {menuItem.map((item, index) => {
          return (
            <Tab
              label={
                <div className="flex flex-col">
                  <div className="text-3xl font-serif">{item.count}</div>
                  <div>{item.name}</div>
                </div>
              }
              onClick={() => setChoose(item.name)}
            />
          );
        })}
      </Tabs>
    </Box>
  );
}

export default MenuComponent;
