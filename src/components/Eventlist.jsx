import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
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
import { useSelector, useDispatch } from "react-redux";
import { DateTimePicker } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Event from "./Event";
import { setCurrMessage } from "../redux/messageSlice";

const Eventlist = () => {
  // message
  const dispatch = useDispatch();
  const { msg } = useSelector((state) => state.message);

  // user info
  const { token } = useSelector((state) => state.user);
  const [results, setResults] = useState([]);

  // for rerender purpose
  const [val, setVal] = useState(false);

  // show adding row
  const [newEvent, setNewEvent] = useState(false);

  // new event info
  const [fromDateAndTime, setFromDateAndTime] = useState(new Date());
  const [toDateAndTime, setToDateAndTime] = useState(new Date());
  const [content, setContent] = useState("");
  const [checked, setChecked] = useState(false);

  // set auth header
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // rerender
  useEffect(() => {
    getEvents();
  }, [newEvent, val]);

  // clear message after 3 second
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(
        setCurrMessage({
          msg: "",
          type: "",
        })
      );
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [msg]);

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

  const addEvent = async () => {
    const requestBody = {
      from: fromDateAndTime,
      to: toDateAndTime,
      content: content,
      isCompleted: checked,
    };

    try {
      let res = await axios.post(
        "http://localhost:4000/api/event/",
        requestBody
      );

      if (res.status === 201) {
        dispatch(
          setCurrMessage({
            msg: res.data.message,
            type: "success",
          })
        );
        setNewEvent(false);

        // reset
        setFromDateAndTime(new Date());
        setToDateAndTime(new Date());
        setContent("");
        setChecked(false);
      }
    } catch (err) {
      if (err.response.status === 400) {
        dispatch(
          setCurrMessage({
            msg: err.response.data.message,
            type: "error",
          })
        );
      }
    }
  };

  const handleRerender = () => {
    setVal(!val);
  };

  return (
    <EventListBody>
      <TableContainer sx={{ maxHeight: "100%" }} component={Paper}>
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
              <TableCell
                sx={{ textAlign: "center" }}
                className="table-header-text"
              >
                Actions
              </TableCell>
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

                {/* actions */}
                <TableCell sx={{ textAlign: "center" }}>
                  <Button variant="contained" onClick={addEvent}>
                    SAVE
                  </Button>
                </TableCell>
              </TableRow>
            ) : null}

            {/* render event list */}
            {results.map(({ _id, from, to, content, isCompleted }) => (
              <Event
                key={_id}
                id={_id}
                from={from}
                to={to}
                content={content}
                isCompleted={isCompleted}
                updateParent={handleRerender}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </EventListBody>
  );
};

export default Eventlist;

const EventListBody = styled.main`
  padding: 150px;
  background-color: rgb(233, 237, 241);
  height: 100vh;

  .table-header-text {
    font-size: 16px;
    font-weight: 600;
  }
`;
