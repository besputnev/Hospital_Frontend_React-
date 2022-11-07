import React, { useState } from "react";
import {
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from "@mui/material";
import EditComponent from "../../EditComponent/EditComponent";
import DeleteComponent from "../../DeleteComponent/DeleteComponent";
import editImage from "../../../icons/edit.svg";
import deleteImage from "../../../icons/delete.svg";
import "./tableComponent.scss";

const TableComponent = ({ receptions, setReceptions }) => {
  const headTable = ["Имя", "Врач", "Дата", "Жалобы"];
  const [openModalWindows, setOpenModalWindows] = useState({
    stateModalWindowDelete: false,
    stateModalWindowEdit: false,
  });

  const [visitation, setVisitation] = useState(-1);

  const deleteFunction = (index) => {
    setOpenModalWindows({
      ...openModalWindows,
      stateModalWindowDelete: true,
    });
    setVisitation(index);
  };

  const editFunction = (index) => {
    setOpenModalWindows({
      ...openModalWindows,
      stateModalWindowEdit: true,
    });
    setVisitation(index);
  };

  const closeModalWindows = () => {
    setOpenModalWindows(false);
    setVisitation(-1);
  };

  const { stateModalWindowDelete, stateModalWindowEdit } = openModalWindows;

  return (
    <div className="all-reception-container">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="table-head">
            <TableRow>
              {headTable.map((element, index) => (
                <TableCell key={`key-${index}`} align="center">
                  {element}
                </TableCell>
              ))}
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody className="table-row">
            {receptions.map((datas, index) => (
              <TableRow key={index} className="table-row">
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  className="table-row"
                >
                  {datas.namePatient}
                </TableCell>
                <TableCell align="center" className="table-row">
                  {datas.doctorName}{" "}
                </TableCell>
                <TableCell align="center" className="table-row">
                  {datas.newDate}
                </TableCell>
                <TableCell align="center" className="table-row">
                  {datas.complaints}
                </TableCell>
                <TableCell align="center" className="table-row">
                  <img
                    className="image-for-table"
                    alt=""
                    src={deleteImage}
                    onClick={() => deleteFunction(index)}
                  />
                </TableCell>
                <TableCell className="edit-table" align="center">
                  <img
                    className="image-for-table"
                    alt=""
                    src={editImage}
                    onClick={() => editFunction(index)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {stateModalWindowDelete && (
        <DeleteComponent
          stateModalWindowDelete={stateModalWindowDelete}
          idTask={receptions[visitation]._id}
          closeModalWindows={closeModalWindows}
          setReceptions={setReceptions}
        />
      )}
      {stateModalWindowEdit && (
        <EditComponent
          oneTask={receptions[visitation]}
          closeModalWindows={closeModalWindows}
          setReceptions={setReceptions}
        />
      )}
    </div>
  );
};

export default TableComponent;
