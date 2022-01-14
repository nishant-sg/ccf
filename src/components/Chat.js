import React from "react";
import ChatRoom from "./ChatRoom";
import "./css/Chat.css";
import { useHistory } from "react-router";

const Chat = () => {
  const history = useHistory();
  const token = localStorage.getItem("token") || null;
  const user = JSON.parse(localStorage.getItem("user"));
  //const history = useHistory();

  if (token===null) {
    history.push("/");
  }

  return (
    <>
      {token && (
        <div className="chat-page" style={{ height: "100%" }}>
          <ChatRoom token={token} user={user} />
        </div>
      )}
    </>
  );
};

export default Chat;
