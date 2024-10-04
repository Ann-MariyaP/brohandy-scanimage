import React,{useState,useEffect} from "react";
import axios from "axios";
import "./sign_in.scss";
import Logo from "../../assets/googleicon/googleIcon.png";
import { BsThreeDotsVertical } from "react-icons/bs";
// import { ROUTES } from "../../routes/index";
// import { NavLink } from "react-router-dom";
import {  useNavigate } from "react-router-dom";
import {Form,Button} from "react-bootstrap";
import InputPassword from "../../components/Input_field/input_pswd";

export default function SignIn() {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(null);
 const navigate = useNavigate();
  //  https://backend.helpingflock.com
   const handleLogin = () => {
     axios
       .post("http://localhost:5000/login", {
         username,
         password,
       })
       .then(function (response) {
         console.log("login data:", response);
         if (response.data.message === "Login successful") {
           console.log("Login successful");
           // localStorage.setItem("message", response.data.token);
           navigate("/scan_page");
         }
       })
       .catch(function (error) {
         console.log(error);
         setError("Login failed. Please check your username and password.");
       });
   };


  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };


  return (
    <>
      <div
        className="d-flex justify-content-end"
        style={{ position: "absolute", top: "50px" }}
      >
        <BsThreeDotsVertical
          style={{
            fontSize: "19px",
            color: "#000000",
            marginRight: "12px",
          }}
        />
      </div>
      <div className="container-fluid signin-page">
        <div className="col ash_rectangle"></div>
        <div className="d-flex signin_heading justify-content-start">
          Let's sign in
        </div>
        <Form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          <div className="mt-2">
            <Form.Group>
              <Form.Label className="input_label">Phone Number*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input_field"
              />
            </Form.Group>
          </div>
          <div>
            <InputPassword
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/*  */}
          </div>
          {/* <!-- checkbutton and forgot password -->  */}
          <div className="justify-content-between d-flex">
            <div className="mt-1">
              {" "}
              <div className="form-check checkbox1">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="remember"
                  value="remember"
                  style={{ border: "1px solid #5B5555", boxShadow: "none" }}
                />
                <label className="form-check-label">Remember me</label>
              </div>
            </div>

            <a href="#" className="forgotpwd mt-1">
              Forgot password?
            </a>
          </div>
          <div>
            {/* <NavLink to={ROUTES.SCAN_PAGE}> */}
            <Button className="signin_btn" type="submit">
              Sign In
            </Button>
            {/* </NavLink> */}
          </div>
        </Form>
        <div className="mt-2">
          <button
            type="button"
            className="btn  signin_google_btn"
          >
            {/* <FcGoogle /> */}
            <img
              src={Logo}
              alt="Logo"
              style={{
                width: "15.36px",
                height: "15.36px",
                marginRight: "8px",
              }}
            />
            Sign in with google
          </button>{" "}
        </div>
        <div className="mt-2 signin_google_btn justify-content-center d-flex">
          Don't have an account?{" "}
          <a href="#" style={{ textDecoration: "none", color: "#2D96D1",marginLeft:"4px" }}>
            Sign up
          </a>
        </div>
      </div>
    </>
  );
}
