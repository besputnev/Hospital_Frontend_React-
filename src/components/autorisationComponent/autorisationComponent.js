import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import logo from "../../icons/Vector.svg";
import image from "../../icons/image.svg";
import "./autorisationComponent.scss";

const AutorisationFormComponent = () => {
  const history = useHistory();
  const regExLogin = /(\w+).{6}/;
  const regExPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$/;
  const [open, setOpen] = useState({ stateSnackbar: false, message: "" });
  const { stateSnackbar, message } = open;

  const checkPass = "Check password";
  const checkLogin = "Check login";

  const booleanLoginFunction = () => {
    setOpen({
      stateSnackbar: true,
      message: checkLogin,
    });
  };

  const booleanPasswordFunction = () => {
    setOpen({
      stateSnackbar: true,
      message: checkPass,
    });
  };

  const errorAutorisation = () => {
    setOpen({
      stateSnackbar: true,
      message: "user autorisation error, this login or password is uncorrect",
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const mainPage = () => {
    history.push("/main");
  };

  const getDataForms = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formLogin = formData.get("Login").trim();
    const formPassword = formData.get("password");

    if (regExLogin.test(formLogin)) {
      if (regExPassword.test(formPassword)) {
        try {
          await axios
            .post("http://localhost:5000/loginUser", {
              username: formLogin,
              password: formPassword,
            })
            .then((res) => {
              localStorage.setItem("token", res.data.token);
              mainPage();
            });
        } catch (error) {
          errorAutorisation();
        }
      } else {
        booleanPasswordFunction();
      }
    } else {
      booleanLoginFunction();
    }
  };

  return (
    <div>
      <header>
        <img alt="" src={logo} />
        <h1 className="header-text">Войти в систему </h1>
      </header>
      <div className="body">
        <div className="image-conainer">
          <img alt="" src={image} />
        </div>
        <div className="container-for-autorisation">
          <div className="autorisation-conainer">
            <h1>Войти в систему </h1>
            <div className="form-container">
              <form onSubmit={getDataForms}>
                <label>Login: </label>
                <input type="text" placeholder="Login" name="Login" />
                <label>Password: </label>
                <input type="password" placeholder="Password" name="password" />
                <div className="button-and-text-conainer">
                  <button>Войти</button>
                  <Link to="/registration" className="link-text">
                    Зарегистрироваться
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={stateSnackbar}
        autoHideDuration={3000}
        onClose={() => handleClose()}
        message={message}
      />
    </div>
  );
};

export default AutorisationFormComponent;
