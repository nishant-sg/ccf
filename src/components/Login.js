import axios from "axios";
import "./fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "./animate/animate.css";
import "./css/util.css";
import "./css/main.css";
import Logo from "./images/ZINE.png";
import React, { useState, useEffect } from "react";
import Tilt from "react-tilt";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import config from "../config.json";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  useEffect(() => {
    localStorage.clear();
  }, []);
  const PostData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${config.server}/signin/`, {
        email,
        password,
      });
      if (res.status === 200) { 
        const { token, user } = res.data;
        console.log("Successfully Signed in",res.data.user.role);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        if (res.data.user.role === "admin") {
          history.push("/admin")
        }else{
        history.push("/chat");}
      } else {
        console.log(res);
      }
    } catch (error) {
      if(error.response.status === 401) {
        alert("Wrong Password");
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
              className="Tiltlogin"
              options={{ max: 40 }}
              // style={{ height: 400, width: 440 }}
            >
              <div className="Tilt-inner">
                <img
                  width="300px"
                  height="350px"
                  src={Logo}
                  alt="img"
                  className="newheight"
                />
              </div>
            </Tilt>
          </div>

          <form className="login100-form validate-form" onSubmit={PostData}>
            <span className="login100-form-title">Login</span>

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
            <div className="container-login100-form-btn">
              <button type="submit">
                <a className="login100-form-btn">
                  <span className="colorit">LOGIN</span>
                </a>
              </button>
            </div>

            <div className="text-center p-t-100">
              <Link to="/signup" className="txt2">
                Create your Account
                <i className="fa m-l-5" aria-hidden="true"></i>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
