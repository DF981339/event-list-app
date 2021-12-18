import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  Button,
  TextField,
  Checkbox,
} from "@mui/material";
import { DateTimePicker } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import axios from "axios";

const Event = ({ id, from, to, content, isCompleted, updateParent }) => {
  // show edit, save, delete
  const [editClicked, setEditClicked] = useState(false);
  const { token } = useSelector((state) => state.user);

  // edit event info
  const [fromDateAndTime, setFromDateAndTime] = useState(from);
  const [toDateAndTime, setToDateAndTime] = useState(to);
  const [editContent, setEditContent] = useState(content);
  const [checked, setChecked] = useState(isCompleted);

  // set auth header
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleFromDateAndTime = (newValue) => {
    setFromDateAndTime(newValue);
  };

  const handleToDateAndTime = (newValue) => {
    setToDateAndTime(newValue);
  };

  const handleContent = (event) => {
    setEditContent(event.target.value);
  };

  const handleChecked = (event) => {
    setChecked(event.target.checked);
  };

  const startEdit = () => {
    setEditClicked(true);
  };

  const handleDelete = (id) => {
    deleteEvent(id);
    updateParent();
    setEditClicked(false);
  };

  const deleteEvent = async (id) => {
    let res = await axios.delete(`http://localhost:4000/api/event/${id}`);

    if (res.status === 200) {
      console.log("deleted");
    } else {
      console.log("something wrong when deleting");
    }
  };

  const handleEdit = (id) => {
    editEvent(id);
    updateParent();
    setEditClicked(false);
  };

  const editEvent = async (id) => {
    const requestBody = {
      from: fromDateAndTime,
      to: toDateAndTime,
      content: editContent,
      isCompleted: checked,
    };

    let res = await axios.put(
      `http://localhost:4000/api/event/${id}`,
      requestBody
    );

    if (res.status === 200) {
      console.log("updated");
    } else {
      console.log("something wrong when updating");
    }
  };

  return editClicked ? (
    <TableRow>
      {/* from date and time picker */}
      <TableCell component="th" scope="row" sx={{ fontSize: "16px" }}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="From"
            value={fromDateAndTime}
            onChange={handleFromDateAndTime}
          />
        </LocalizationProvider>
      </TableCell>

      {/* to date and time picker */}
      <TableCell sx={{ fontSize: "16px" }}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="To"
            value={toDateAndTime}
            onChange={handleToDateAndTime}
          />
        </LocalizationProvider>
      </TableCell>

      {/* content input */}
      <TableCell sx={{ fontSize: "16px" }}>
        <TextField
          color="grey"
          type="text"
          label="Content"
          value={editContent}
          onChange={handleContent}
          required
          focused
        />
      </TableCell>

      {/* checked box */}
      <TableCell sx={{ fontSize: "16px" }}>
        <Checkbox checked={checked} onChange={handleChecked} />
      </TableCell>

      {/* actions */}
      <TableCell sx={{ textAlign: "center" }}>
        <Button variant="contained" onClick={() => handleEdit(id)}>
          SAVE
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(id)}
        >
          DELETE
        </Button>
      </TableCell>
    </TableRow>
  ) : (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row" sx={{ fontSize: "16px" }}>
        {dayjs(from).format("MM/DD/YYYY, hh:mm:ss A")}
      </TableCell>
      <TableCell sx={{ fontSize: "16px" }}>
        {dayjs(to).format("MM/DD/YYYY, hh:mm:ss A")}
      </TableCell>
      <TableCell sx={{ fontSize: "16px" }}>{content}</TableCell>
      <TableCell sx={{ fontSize: "16px" }}>
        {isCompleted ? "Completed" : "Pending"}
      </TableCell>
      <TableCell sx={{ textAlign: "center" }}>
        <Button variant="contained" onClick={startEdit}>
          EDIT
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Event;
