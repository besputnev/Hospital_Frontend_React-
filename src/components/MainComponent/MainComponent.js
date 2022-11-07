import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import { Select, MenuItem, TextField, FormControl } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TableComponent from "./TableComponent/TableComponent";
import FilterComponent from "../filterComponent/FilterComponent";
import SortAppointmentsComponent from "../SortComponent/SortComponent";
import logo from "../../icons/Vector.svg";
import "./MainComponent.scss";

const MainComponent = () => {
  const [receptions, setReceptions] = useState([]);
  const [openFilter, setOpenFilter] = useState(0);
  const history = useHistory();

  const validateForToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/registration");
    }
  };

  validateForToken();

  const [data, setData] = useState({
    namePatient: "",
    doctorName: "",
    newDate: new Date(),
    complaints: "",
  });

  const doctorNames = [
    {
      value: "Ricova Irina Ivanovna",
    },
    {
      value: "Ten Alexandr Dmitrievich",
    },
    {
      value: "Shunko Eva Andrevna",
    },
  ];

  const { namePatient, doctorName, newDate, complaints } = data;

  const handleChange = (inputName, value) => {
    setData({
      ...data,
      [inputName]: value,
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/getAllRecords", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setReceptions(res.data.data);
      });
  }, [setReceptions]);

  const addNewReception = async () => {
    data.newDate = moment(data.newDate).format("DD.MM.YYYY");

    try {
      await axios
        .post("http://localhost:5000/createRecord", data, {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          receptions.push(res.data.data);
          setReceptions([...receptions]);
          setData({
            namePatient: "",
            doctorName: "",
            newDate: new Date(),
            complaints: "",
          });
        });
    } catch (error) {
      return error;
    }
  };

  const mainPage = () => {
    localStorage.clear();
    history.push("/registration");
  };

  const openFilterFunc = () => {
    setOpenFilter(1);
  };

  return (
    <div>
      <div>
        <header>
          <img alt="" src={logo} />
          <h1 className="header-text">Приёмы </h1>
          <button onClick={() => mainPage()}>Выход</button>
        </header>
      </div>
      <div className="text-and-input-container">
        <div className="input-container">
          <div className="text-input-patient-name-container">
            <div className="text">Имя:</div>
            <TextField
              className="name-patient"
              required
              value={namePatient || ""}
              id="outlined-required"
              name="namePatient"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </div>

          <div className="text-input-doctor-container">
            <div className="text">Врач:</div>
            <FormControl className="name-doctor">
              <Select
                className="name-doctor"
                value={doctorName || ""}
                name="doctorName"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              >
                {doctorNames.map((item, index) => (
                  <MenuItem
                    key={`item-${index}`}
                    value={item.value}
                    className="test"
                  >
                    {item.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="text-input-date-container">
            <div className="text">Дата:</div>
            <LocalizationProvider
              className="date-input"
              dateAdapter={AdapterDateFns}
            >
              <DesktopDatePicker
                className="date-input"
                inputFormat={"dd/MM/yyyy"}
                name="date"
                value={newDate || new Date()}
                onChange={(e) => handleChange("newDate", e)}
                renderInput={(params) => (
                  <TextField className="date-file" {...params} />
                )}
              />
            </LocalizationProvider>
          </div>

          <div className="text-input-complaints-container">
            <div className="text">Жалобы:</div>
            <div className="one-line-button-and-input">
              <TextField
                className="one-complaints-input"
                required
                value={complaints || ""}
                id="outlined-required"
                name="complaints"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
              <button
                disabled={
                  !(namePatient && newDate && complaints && doctorNames)
                }
                className="add-information"
                onClick={() => {
                  addNewReception();
                }}
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="main-div-for-sort-component">
        <SortAppointmentsComponent
          receptions={receptions}
          setReceptions={setReceptions}
        />
        {!openFilter ? (
          <div className="filter-state">
            Добавить фильтр по дате:
            <AddCircleOutlineIcon
              className="size-icon"
              onClick={() => openFilterFunc()}
            />
          </div>
        ) : (
          <div className="main-div-for-filter-component">
            <FilterComponent
              receptions={receptions}
              setReceptions={setReceptions}
              setOpenFilter={setOpenFilter}
            />
          </div>
        )}
      </div>

      <div className="table-container">
        <TableComponent
          receptions={receptions}
          setReceptions={setReceptions}
          data={data}
          setData={setData}
        />
      </div>
    </div>
  );
};

export default MainComponent;
