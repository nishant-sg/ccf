import "../css/admin.css";
import React ,{ useState, useLayoutEffect, useEffect } from "react";
import { Switch,BrowserRouter, Route } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";
import Create from "./create";
import Read from "./read";
import Update from "./update";

function EditDatabase(props) {
  const [apiCall,setApiCall] = useState("");
  const [fields,setFields] = useState({});
  const [operation,setOperation] = useState("create")

  useEffect(()=>{
    if(props.name==="user"){
      setApiCall(props.name);
      setFields({
        "name":"default", 
        "email":"a@mnit.ac.in",
        "rollNumber":"1234abc1234",
        "role":"fresher",
        "college":"MNIT",
        "password":"default_password"
      });
    }else if(props.name==="rooms"){
      setApiCall(props.name);
      setFields({
        "conversationName":"default", 
      })
    }else if(props.name==="messages"){
      setApiCall(props.name);
      setFields({
        "senderId":"60e93365ce5ecd0015a74b04",
        "content": "message sent succefully",
        "conversationId": "60e9373ace5ecd0015a74b07",
        "senderName": "admin", 
      })
    }
    
  },[props.name,operation]);

  console.log("fields", fields);
  return (
    <div className="App">
        <div className="button-arrange">
        <button onClick={() => {
                setOperation("create")
              }}>
              Create
            </button>
            <button onClick={() => {
                setOperation("read")
              }}>
              Read
            </button>
            <button onClick={() => {
                setOperation("update")
              }}>
              Update
            </button>
          </div>
        <div className="backdrop">
          {operation==="create" && <Create name={apiCall} fields={fields}/>}
          {operation==="read" && <Read name={apiCall}/>}
          {operation==="update" && <Update name={apiCall} fields={fields}/>}
          </div>
    </div>
  );
}

export default EditDatabase;
