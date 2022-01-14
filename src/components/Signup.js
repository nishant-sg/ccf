import "./fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./animate/animate.css";
import "./css/util.css";
import "./css/main.css";
import React, { useState } from "react";
import Logo from "./images/robo.webp";
import { Link } from "react-router-dom";
import Tilt from "react-tilt";
import { useHistory } from "react-router";
import axios from "axios"; 
import config from "../config.json";
// import M from "materialize-css";

const Signup = () => {
  const history = useHistory();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  let result;
  // const getDomainOfInterest = (selected) => {
  //   console.log(selected.map((a) => a.label));
  //   result = selected.map((a) => a.label);
  // };
  const PostData = async (e) => {
    e.preventDefault();
    // regex for testing email is left
    const regex = RegExp(/^[\w\.]+@(?:mnit|iiitkota).ac.in$/);
    if (!regex.test(email)) {
      // M.toast({ html: "Invalid email. Use College email id", classes: "#c62828 red darken-3 toast-container", displayLength: "5000"});
      alert("Invalid email. Use College email id");
      return;
    }
    if (fullName.length < 3) {
      // M.toast({ html: "Do no use nick names and enter Full Name", classes: "#c62828 red darken-3" });
      alert("Do no use nick names and enter Full Name");
      return;
    }
    if (password.length < 6) {
      // M.toast({ html: "Password Must be grater than 6 characters", classes: "#c62828 red darken-3" });
      alert("Password Must be grater than or equal 6 characters");
      return;
    }
    if (rollNumber.length === 0) {
      // M.toast({ html: "Enter valid college Id", classes: "#c62828 red darken-3" });
      alert("Enter valid college Id");
      return;
    }
    console.log(result);
    try {
      const res = await axios.post(`${config.server}/signup/`, {
        fullName,
        email,
        password,
        rollNumber,
      });
      if (res.status === 200) {
        // change this to original after testing
        // const roomIds = [
        //   "5ffc310d5bfdb84beba3ffa9",
        //   "5ffc31195bfdb84beba3ffaa",
        // ];
        const roomIds = [
          "60e9373ace5ecd0015a74b07",
          "60e93b17ce5ecd0015a74b1e",
        ];
        roomIds.map(async (roomId) => {
          const _res = await axios.post(`${config.server}/joinroom/`, {
            roomId,
            userId: res.data.data._id,
            userName: res.data.data.fullName,
          });
          if (_res.status === 200) {
            console.log(res.data.message, _res.data.message);
          } else {
            console.log(res);
          }
        });
        console.log(res);
        history.push("/");
      } else {
        console.log(res);
      }
    } catch (error) {
      if (error.response.status === 403 || error.response.status === 422) {
        alert(error.response.data.message);
      } else {
        console.log(error.response);
      }
    }
  };
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <Tilt
              className="Tiltsignup"
              options={{ max: 40 }}
              // style={{ height: 250, width: 400 }}
            >
              <div className="Tilt-inner">
                <img src={Logo} alt="img" className="robo" />
              </div>
            </Tilt>

            <p>
              <br />
              <div className="welcome">
                Welcome to<br></br> Zine Communication Channel
              </div>
            </p>
          </div>

          <form className="login100-form validate-form" onSubmit={PostData}>
            <span className="login100-form-title">Sign Up</span>
            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="text"
                name="firstName"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-address-book" aria-hidden="true"></i>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                className="input100"
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="pass"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="text"
                name="rollNumber"
                placeholder="CollegeID"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-info" aria-hidden="true"></i>
              </span>
            </div>

            <br />

            <div className="container-login100-form-btn">
              {/* <Link to="/chat" className="login100-form-btn">
                Sign Up
              </Link> */}
              <button type="submit">
                <a className="login100-form-btn">
                  <span className="colorit">SIGN UP</span>
                </a>
              </button>
            </div>

            <div className="text-center p-t-56">
              <Link to="/" className="txt2">
                Login
                <i className="fa m-l-5" aria-hidden="true"></i>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
