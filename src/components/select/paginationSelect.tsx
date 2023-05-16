import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./select.scss";
export default function BasicSelect({ page = 10, handleChange }: any) {
  return (
    <FormControl fullWidth>
      <Select
        id="demo-simple-select"
        value={page}
        onChange={handleChange}
        className="selectRowPerpage"
      >
        <MenuItem value={10} className="options">
          10 items per page
        </MenuItem>
        <MenuItem value={20} className="options">
          20 items per page
        </MenuItem>
        <MenuItem value={30} className="options">
          30 items per page
        </MenuItem>
      </Select>
    </FormControl>
  );
}
