import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { TextField, Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import "./filterComponent.scss";

const FilterComponent = ({ receptions, setReceptions, setOpenFilter }) => {
  const [dateForFilter, setDateForFilter] = useState({
    firstDateForStart: "",
    secondDateForEnd: "",
  });

  const { firstDateForStart, secondDateForEnd } = dateForFilter;

  const handleChange = (e, inputName) => {
    setDateForFilter({ ...dateForFilter, [inputName]: e });
  };

  const resetState = () => {
    oriiginalOrderReseption();
    setOpenFilter(0);
  };

  const oriiginalOrderReseption = () => {
    axios
      .get("http://localhost:5000/getAllRecords", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setReceptions(res.data.data);
      });
  };

  const filterApointments = () => {
    const start = firstDateForStart
      ? new Date(firstDateForStart.split("-"))
      : "";
    const end = secondDateForEnd ? new Date(secondDateForEnd.split("-")) : "";
    if (!start && !end) return setReceptions([...receptions]);
    receptions = receptions.filter((item) => {
      const temp = item.newDate.split(".");
      [temp[0], temp[1]] = [temp[1], temp[0]];
      const elem = new Date(temp.join("-"));
      if (start && !end) return elem.getTime() >= start.getTime();
      else if (!start && end) return elem.getTime() <= end.getTime();
      else
        return (
          elem.getTime() >= start.getTime() && elem.getTime() <= end.getTime()
        );
    });
    return setReceptions([...receptions]);
  };

  return (
    <div className="filter-container">
      <label className="filter-text">с:</label>
      <TextField
        className="input-filter"
        type="date"
        value={firstDateForStart}
        name="firstDateForStart"
        onChange={(e) => handleChange(e.target.value, e.target.name)}
      />

      <label className="filter-text">по:</label>
      <TextField
        className="input-filter"
        type="date"
        name="secondDateForEnd"
        value={secondDateForEnd}
        onChange={(e) => handleChange(e.target.value, e.target.name)}
      />
      <Button
        className="filter-button"
        type="submit"
        variant="contained"
        onClick={() => filterApointments()}
      >
        Фильтровать
      </Button>
      <DeleteOutlineIcon
        className="filter-null"
        onClick={() => (setOpenFilter(1), resetState())}
      />
    </div>
  );
};

export default FilterComponent;
