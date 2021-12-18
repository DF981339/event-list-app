import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  TextField,
  Checkbox,
} from "@mui/material";
import { useSelector } from "react-redux";
import { DateTimePicker } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const Eventlist = () => {
  // user info
  const { token } = useSelector((state) => state.user);
  const [results, setResults] = useState([]);

  // show adding row
  const [newEvent, setNewEvent] = useState(false);

  // show edit, save, delete
  const [editClicked, setEditClicked] = useState(false);

  // new event info
  const [fromDateAndTime, setFromDateAndTime] = useState(new Date());
  const [toDateAndTime, setToDateAndTime] = useState(new Date());
  const [content, setContent] = useState("");
  const [checked, setChecked] = useState(false);

  // set auth header
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    getEvents();
  }, [newEvent, editClicked]);

  const getEvents = async () => {
    let res = await axios.get("http://localhost:4000/api/event/");

    if (res.status === 200) {
      setResults(res.data.result);
    }
  };

  const handleAddEvent = () => {
    setNewEvent(true);
  };

  const handleFromDateAndTime = (newValue) => {
    setFromDateAndTime(newValue);
  };

  const handleToDateAndTime = (newValue) => {
    setToDateAndTime(newValue);
  };

  const handleContent = (event) => {
    setContent(event.target.value);
  };

  const handleChecked = (event) => {
    setChecked(event.target.checked);
  };

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
    }
  };

  const addEvent = async () => {
    const requestBody = {
      from: fromDateAndTime,
      to: toDateAndTime,
      content: content,
      isCompleted: checked,
    };

    let res = await axios.post("http://localhost:4000/api/event/", requestBody);

    if (res.status === 201) {
      setNewEvent(false);

      // reset
      setFromDateAndTime(new Date());
      setToDateAndTime(new Date());
      setContent("");
      setChecked(false);
    }
  };

  return (
    <EventListBody>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {/* add event button row */}
            <TableRow>
              <TableCell>
                <Button variant="contained" onClick={handleAddEvent}>
                  ADD EVENT
                </Button>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>

            {/* table header row */}
            <TableRow>
              <TableCell className="table-header-text">From</TableCell>
              <TableCell className="table-header-text">To</TableCell>
              <TableCell className="table-header-text">Content</TableCell>
              <TableCell className="table-header-text">Status</TableCell>
              <TableCell className="table-header-text">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {/* when adding new event */}
            {newEvent ? (
              <TableRow>
                {/* from date and time picker */}
                <TableCell component="th" scope="row">
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
                <TableCell>
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
                <TableCell>
                  <TextField
                    color="grey"
                    type="text"
                    label="Content"
                    value={content}
                    onChange={handleContent}
                    required
                    focused
                  />
                </TableCell>

                {/* checked box */}
                <TableCell>
                  <Checkbox onChange={handleChecked} />
                </TableCell>
                <TableCell>
                  <Button variant="contained" onClick={addEvent}>
                    SAVE
                  </Button>
                </TableCell>
              </TableRow>
            ) : null}

            {/* render event list */}
            {results.map(({ _id, from, to, content, isCompleted }) => (
              <TableRow
                key={_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
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
                        onClick={() => handleDelete(_id)}
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </EventListBody>
  );
};

export default Eventlist;

const EventListBody = styled.main`
  padding: 100px;
  background-color: rgb(233, 237, 241);
  height: 100vh;

  .table-header-text {
    font-size: 16px;
    font-weight: 600;
  }
`;
