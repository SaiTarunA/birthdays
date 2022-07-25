import "../App.css";
import React from "react";
import moment from "moment";
import { tz } from "moment-timezone";
import romandial from "../public/dial.png";
import minutehand from "../public/minutes.png";
import hourhand from "../public/hour.png";
import NavBar from "./NavBar";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Time = (props) => {
  const [hours, sethours] = React.useState(
    moment().tz("America/New_York").format("h")
  );
  const [minutes, setminutes] = React.useState(
    moment().tz("America/New_York").format("mm")
  );
  const [seconds, setseconds] = React.useState(
    moment().tz("America/New_York").format("ss")
  );
  const [isAuthorized, setisAuthorized] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      } else {
        setisAuthorized(true);
      }
    });
  }, []);
  const hoursStyle = {
    transform: `rotate(${hours * 30 + (minutes * 6) / 12}deg)`,
  };
  const minutesStyle = {
    transform: `rotate(${minutes * 6}deg)`,
  };
  const secondsStyle = {
    transform: `rotate(${seconds * 6}deg)`,
  };
  React.useEffect(() => {
    const timer = setInterval(() => {
      sethours(moment().tz("America/New_York").format("h"));
      setminutes(moment().tz("America/New_York").format("mm"));
      setseconds(moment().tz("America/New_York").format("ss"));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="Container">
      {!isAuthorized === true ? (
        <div>Loading...</div>
      ) : (
        <div className="timeComponent">
          {props.fullPage? <></> : <>
          <h1>
            {hours}:{minutes}:{seconds}{" "}
            {moment().tz("America/New_York").format("A")}
          </h1>
          <h1>{moment().utcOffset("+05:30").format("LTS, ll")}</h1>
          <div className="analog-clock">
            <div className="dial minutes" style={minutesStyle}></div>
            <div className="dial seconds" style={secondsStyle}></div>
            <div className="dial hours" style={hoursStyle}></div>
            <div className="dial round"></div>
            <div className="dial top label">12</div>
            <div className="dial right label">3</div>
            <div className="dial bottom label">6</div>
            <div className="dial left label">9</div>
          </div>
          <div className="roman-clock">
            <img className="romandial" alt="" src={romandial} />
            <img
              className="minutehand"
              alt=""
              src={minutehand}
              style={minutesStyle}
            />
            <img
              className="hourhand"
              alt=""
              src={hourhand}
              style={hoursStyle}
            />
            <div className="dial round"></div>
          </div>
          </>}
        </div>
      )}
    </div>
  );
};

export default Time;
