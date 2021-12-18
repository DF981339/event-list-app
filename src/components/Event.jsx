import React, { useState } from "react";
import { TableRow, TableCell, Button } from "@mui/material";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import axios from "axios";

const Event = ({ id, from, to, content, isCompleted }) => {
  // show edit, save, delete
  const [editClicked, setEditClicked] = useState(false);
  const { token } = useSelector((state) => state.user);

  // set auth header
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleEdit = () => {
    setEditClicked(true);
  };

  const handleDelete = (id) => {
    deleteEvent(id);
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

  return (
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
        {editClicked ? (
          <>
            <Button variant="contained">SAVE</Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(id)}
            >
              DELETE
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={handleEdit}>
            EDIT
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default Event;
