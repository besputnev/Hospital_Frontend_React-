import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Box, Button, Typography, Modal } from "@mui/material";
import "./deleteComponent.scss";

const DeleteComponent = ({
  stateModalWindowDelete,
  idTask,
  closeModalWindows,
  setReceptions,
}) => {
  const history = useHistory();

  const deleteFunction = async () => {
    await axios
      .delete(`http://localhost:5000/deleteRecord?_id=${idTask}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        closeModalWindows();
        setReceptions(res.data.data);
      });
  };

  const validateForToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      history.push("/registration");
    }
  };

  validateForToken();

  return (
    <div>
      <Modal
        open={stateModalWindowDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-window-delete">
          <div className="modal-window-head">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Удалить приём
            </Typography>
          </div>
          <div className="modal-window-body">
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Вы действительно хотите удалить приём?
            </Typography>
          </div>
          <div className="button-container-modal-window">
            <Button
              className="cancel-button"
              onClick={() => closeModalWindows()}
            >
              Cancel
            </Button>
            <Button
              className="save-button"
              onClick={() => deleteFunction()}
              autoFocus
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteComponent;
