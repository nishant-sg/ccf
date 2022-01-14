import "../../components/css/admin.css";
import React from "react";
import { useState, useLayoutEffect } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { useHistory } from "react-router";
import axios from "axios";
import config from "../../config.json";
import EditDatabase from "./editdatabase";

function Admin() {
  const [isauthorized, setIsAuthorized] = useState(false);
  const [name,setName] = useState("user");
  const navigate = useHistory();
  const token = localStorage.getItem("token") || null;
  const user = JSON.parse(localStorage.getItem("user"));

  const checkIsValidUser = async () => {
    console.log(`${config.server}/admin`);

    const res = await axios.post(
      `${config.server}/admin`,
      {
        user: user,
      },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      setIsAuthorized(true);
    } else if (res.status === 234) {
      alert("this page is for admins only");
      navigate.push("/");
    }
  };

  useLayoutEffect(() => {
    if (token === null) {
      navigate.push("/");
    }
    checkIsValidUser();
  }, []);

  return (
    <div className="App">
      {isauthorized && (
        <div className="admin">
          <div className="admin-left">
            <button
              className="btn"
              onClick={() => {
                setName("user")
              }}
            >
              Users
            </button>
            <button
              className="btn"
              onClick={() => {
                setName("rooms")
              }}
            >
              Rooms
            </button>
          </div>
          <div className="admin-right">
            <h1>admin Panel</h1>
            <EditDatabase name={name}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
