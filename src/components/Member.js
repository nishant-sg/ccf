import React, { useEffect, useState } from "react";
import "./css/ChatRoom.css";
import Avatar from "react-avatar";
import config from "../config.json";
import axios from "axios";
import Icon from "./images/icon.webp";

function Member({ userId }) {
  const token = localStorage.getItem("token");
  const [memberName, setMemberName] = useState("");
  const [role, setRole] = useState("");
  const getUserInfo = async () => {
    const res = await axios.get(`${config.server}/user/`, {
      params: {
        userId,
      },
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-type": "application/json",
      },
    });
    if (res.status === 200) {
      setMemberName(res.data.user.fullName);
      setRole(res.data.user.role);
    } else {
      console.log(res);
    }
  };
  useEffect(() => {
    if (userId) getUserInfo();
  }, []);

  function avatar() {
    if (role === "admin") return <Avatar src={Icon} size="40" round />;
    else
      return (
        <strong>
          <Avatar name={memberName} size="40" round />
        </strong>
      );
  }
  return (
    <a className="list-group-item media">
      <div className="pull-left avatars">{avatar()}</div>
      <div className="media-body">
        <div className="list-group-item-heading">{memberName}</div>
        {/* <small className="list-group-item-text c-gray"></small> */}
      </div>
    </a>
  );
}
export default Member;
