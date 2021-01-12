import React, { useEffect } from "react";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { debounce } from "lodash";
import $ from "jquery";
import { Switch, Route, HashRouter } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

function App() {
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setViewportHeight();
    const handleResize = debounce(setViewportHeight, 200);
    $(window).on("resize", handleResize);
    return () => {
      $(window).off("resize", handleResize);
    };
  }, []);
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/chat" component={Chat} />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
