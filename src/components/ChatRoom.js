import React, { useState, useEffect } from "react";
import "./css/ChatRoom.css";
import $ from "jquery";
import Message from "./Message";
import Rooms from "./Rooms";
import Member from "./Member";
import getSocket from "../helpers/socket";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import Navbar from "./navbar";
import axios from "axios";
import config from "../config.json";

const socket = getSocket();

// $(function () {
//   if ($("#ms-menu-trigger")[0]) {
//     $("body").on("clixck", "#ms-menu-trigger", function () {
//       $(".ms-menu").toggleClass("toggled");
//     });
//   }
// });

const ChatRoom = ({ token, user }) => {
  const [isActive, setActive] = useState(false);
  const [clickedRoomName, setClickedRoomName] = useState("");
  const [clickedRoomMessages, setClickedRoomMessages] = useState([]);
  const [clickedRoomMembers, setClickedRoomMembers] = useState([]);
  const [clickedMemberIdForDm, setClickedMemberIdForDm] = useState("");
  const [clickedMemberNameForDm, setClickedMemberNameForDm] = useState("");
  const [rooms, setRooms] = useState([]);
  const [clickedRoomId, setClickedRoomId] = useState("");
  const acknowledgement = (ack) => {
    if (ack) {
      alert(ack);
    }
  };

  // const getUserInfo = async () => {
  //   const res = await axios.get(`${config.server}/user/`, {
  //     params: {
  //       userId,
  //     },
  //     headers: {
  //       Authorization: token ? `Bearer ${token}` : "",
  //       "Content-type": "application/json",
  //     },
  //   });
  //   if (res.status === 200) {
  //     setMemberName(res.data.user.fullName);
  //     setRole(res.data.user.role);
  //   } else {
  //     console.log(res);
  //   }
  // };

  const getDmRoom = async (clickedMemberIdForDm, clickedMemberNameForDm) => {
    if (clickedMemberIdForDm){
      const res = await axios.get(`${config.server}/checkroom`, {
        params: {
          userId: clickedMemberIdForDm,
          firstUserName: clickedMemberNameForDm,
          secondUserName: user.fullName
        },
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-type": "application/json",
        },
      });
      if (res.status === 200) {
        const dmRoomMembersName = res.data.room.conversationName.split(",")
        dmRoomMembersName.forEach((name) => {
          if(name !== user.fullName) {
            res.data.room.conversationName = name;
          }
        })
        setClickedRoomName(res.data.room.conversationName);
        setClickedRoomId(res.data.room._id);
        setClickedRoomMembers([]);
        setRooms([...rooms, res.data.room])
      }
    }
  };

  useEffect(() => {
    if (!clickedRoomId) return;
    getMessages(clickedRoomId);
  }, [clickedRoomId]);

  const getMessages = async (clickedRoomId) => {
    const res = await axios.post(
      `${config.server}/messages/`,
      {
        roomId: clickedRoomId,
      },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-type": "application/json",
        },
      }
    );
    if (res.status === 200) {
      setClickedRoomMessages(res.data.messages);
    }
  };

  useEffect(() => {
    getDmRoom(clickedMemberIdForDm, clickedMemberNameForDm)
  }, [clickedMemberIdForDm, setClickedMemberNameForDm])

  const sendMessage = () => {
    const content = document.getElementById("box").value;
    if (/\S/.test(content)) {
      socket.emit("message", {
        senderId: user._id,
        content,
        createdAt: Date().toLocaleString(),
        senderName: user.fullName,
      });
      document.getElementById("box").value = "";
    }
  };

  useEffect(() => {
    socket.on("message", (data) => {
      const { senderId, content, createdAt, senderName } = data;
      setClickedRoomMessages((messages) => [
        ...messages,
        { senderId, content, createdAt, senderName },
      ]);
    });
  }, []);

  useEffect(() => {
    $("#ms-menu-trigger").on("click", function () {
      $(".ms-menu").toggleClass("toggled");
    });
  }, []);

  const onEnterPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <LoadingOverlay active={isActive} spinner={<BounceLoader />}>
        <Navbar user={user} />
        <div className="all">
          <div className={clickedRoomName}>
            <div className="container bootstrap snippets bootdey">
              <div className="tile tile-alt" id="messages-main">
                <div className="ms-menu">
                  <div className="ms-user clearfix">
                    <div className="sub-heading">Channels</div>
                  </div>
                  <div className="list-group lg-alt scroll">
                    <Rooms
                      token={token}
                      user={user}
                      setClickedRoomName={setClickedRoomName}
                      setClickedRoomMessages={setClickedRoomMessages}
                      setActive={setActive}
                      setRooms={setRooms}
                      rooms={rooms}
                      setClickedRoomMembers={setClickedRoomMembers}
                      acknowledgement={acknowledgement}
                      socket={socket}
                    />
                    <div className="ms-user clearfix">
                      <div className="sub-heading">Members</div>
                    </div>
                    {clickedRoomMembers.length !== 2 &&
                      clickedRoomMembers.map((clickedRoomMember, index) => (
                       clickedRoomMember !== user._id ? (
                       <Member
                        userId={clickedRoomMember.id}
                        setClickedMemberIdForDm={setClickedMemberIdForDm}
                        setClickedMemberNameForDm={setClickedMemberNameForDm}
                        key={index}
                      />) : ({})
                      ))}
                  </div>
                </div>
                {clickedRoomName ? (
                  //if clicked room true
                  <div className="ms-body">
                    <div className="action-header clearfix">
                      <div
                        className="d-none d-block d-sm-block d-md-none"
                        id="ms-menu-trigger"
                      >
                        <i className="fa fa-bars" />
                      </div>
                      <div className="pull-left roomname">
                        <div className="lv-avatar pull-left"></div>
                        <div className="sub-heading">{clickedRoomName}</div>
                      </div>
                    </div>

                    {/* MESSAGES START FROM HERE*/}

                    <div className="messages">
                      <div className="reverse" id="messages">
                        {clickedRoomMessages &&
                          clickedRoomMessages.map(
                            (
                              { senderId, content, createdAt, senderName },
                              index
                            ) => (
                              <Message
                                senderId={senderId}
                                content={content}
                                createdAt={createdAt}
                                user={user}
                                senderName={senderName}
                                key={index}
                              />
                            )
                          )}
                      </div>
                    </div>
                    {/* MESSAGES END */}
                    <div className="msb-reply">
                      <textarea
                        placeholder="What's on your mind..."
                        defaultValue={""}
                        id="box"
                        onKeyDown={(event) => onEnterPress(event)}
                      />
                      <button
                        onClick={() => {
                          sendMessage();
                        }}
                      >
                        <i className="fa fa-paper-plane-o" />
                      </button>
                    </div>
                  </div>
                ) : (
                  //else
                  <div className="ms-body">
                    <div className="action-header clearfix">
                      <div
                        className="d-none d-block d-sm-block d-md-none"
                        id="ms-menu-trigger"
                      >
                        <i className="fa fa-bars" />
                      </div>
                      <div className="pull-left roomname">
                        <div className="lv-avatar pull-left"></div>
                        <div className="sub-heading"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </LoadingOverlay>
    </>
  );
};
export default ChatRoom;
