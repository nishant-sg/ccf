import "../css/admin.css";
import React,{ useState, useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";

function Create(props) {
  const data = {};
  let a = null;
  console.log("props",props);

  const SubmitData = async (e)=>{
      e.preventDefault();
      console.log(data);
      try {
        console.log("data",data);
        const res = await axios.post(`${config.server}/admin/${props.name}/add`, data);
        
        console.log(data);
        if (res.status === 200) {
          console.log("success");
          a = null
          alert("Record Created successfully");  
        } else if (res.status === 234){

          alert("record already Exists"); 
          console.log("problems");
        }
       
      }catch (error) {
          console.log(" error");
      }
  }
  return (
    <div className="">
      <h3>Create {props.name}</h3>
      <div>
        <form onSubmit={SubmitData}>
          {Object.entries(props.fields).map(([key, value]) => {
            data[key]=value;
            console.log("hello form the other side",props.fields)
            return (
              <div key={key} className="reader">
                <label className="label">{key}</label> 
                <input key={key} className="input" value={a} placeholder={value} onChange={(a)=>{data[key]=a.target.value}}/>
              </div>
            );
          })}
          <input type="submit"/>
        </form>
      </div>
    </div>
  );
}

export default Create;
