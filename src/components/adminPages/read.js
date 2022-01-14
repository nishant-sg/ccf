import "../../App.css";
import React,{ useState, useLayoutEffect, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";

function Read(props) {
  const [email, setEmail] = useState("");
  const [value, setValue] = useState(false);
  const [data, setData] = useState("");
  //console.log(data);

  const SubmitData = async (e) => {
    e.preventDefault();
    try {
      console.log("data", { email });
      const res = await axios.post(
        `${config.server}/admin/${props.name}/read`,
        { email }
      );

      console.log("user", res.data);
      setData(res.data.data);
      if (res.status === 200) {
        
        console.log("success", value);
        //alert("User Created successfully");
      } else if (res.status === 234) {
        alert("User already Exists");
        console.log("problems");
      }
    } catch (error) {
      console.log(" error", error);
    }
  };

 
  return (
    <div className="">
      <h3>Read {props.name}</h3>
      <div>
        <form onSubmit={SubmitData}>
          <input
            placeholder="enter email"
            value={email}
            onChange={(a) => {
              setEmail(a.target.value);
            }}
          />
          <input type="submit" />
        </form>
      </div>
      <div>
                {Object.entries(data).map(([k,v])=>{
                  console.log(typeof v);
                  if (typeof v === 'object'){
                    return <div className="reader" key={k}>
                      <label className="label">{k}</label>
                      <label className="input">Custom Object</label>
                    </div>}else{
                      return <div className="reader" key={k}>
                      <label className="label">{k}</label>
                      <label className="input">{v}</label>
                    </div>
                    }
                })}
            </div>
    </div>
  );
}

export default Read;
