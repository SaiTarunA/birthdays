import React from "react";
import CakeRoundedIcon from '@mui/icons-material/CakeRounded';
import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import { onValue, ref, set } from "firebase/database";
import { NavLink, useNavigate } from "react-router-dom";
import { uid } from "uid";
import "../App.css";
import { auth, db } from "../firebase";
import { useStyles } from "./BirthdayList";


const BirthdaysInput = () => {
  const classes = useStyles()
  const [inputName, setinputName] = React.useState("");
  const [inputMonth, setinputMonth] = React.useState("January");
  const [inputDay, setinputDay] = React.useState("1");
  const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };
  const navigate = useNavigate();
  //days input
  let days = Array.from({ length: 31 }, (v, k) => k + 1);
  if (inputMonth === "February") {
    days = Array.from({ length: 29 }, (v, k) => k + 1);
    if (inputDay > 29) {
      setinputDay("1");
    }
  } else if (
    inputMonth === "April" ||
    inputMonth === "June" ||
    inputMonth === "September" ||
    inputMonth === "November"
  ) {
    days = Array.from({ length: 30 }, (v, k) => k + 1);
    if (inputDay > 30) {
      setinputDay("1");
    }
  } else {
    days = Array.from({ length: 31 }, (v, k) => k + 1);
  }

  //auth
  React.useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      }
    });
  }
    return () => {
      isCancelled = true;
    };
  }, []);

  //Submit
  function handleSubmit(e) {
    e.preventDefault();
    if (inputName.replace(/ /g, "") !== "") {
      const uidd = uid();
      set(ref(db, `/${auth.currentUser.uid}/BirthdayList/${uidd}`), {
        uidd: uidd,
        name: inputName,
        month: inputMonth,
        monthId: Object.keys(months).find((k) => months[k] === inputMonth),
        day: inputDay,
      });
      setinputName("");
      setinputMonth("January");
      setinputDay("1");
      handleSnackbar(inputName,inputDay,inputMonth)
    } else {
      handleSnackbar()
      setinputName("");
    }
  }

  const [state, setState] = React.useState({
    open: false,
    message: "",
  });

  const handleSnackbar = (inputName, inputDay, inputMonth) => {
    if(inputName && inputDay && inputMonth){
      setState({
        open: true,
        message: "Birthday of '" +
        inputName +
        "' " +
        inputDay +
        " " +
        inputMonth +
        " Successfully added",
      });
    }else{
      setState({
        open: true,
        message: "Name Cannot be empty",
      });
    }
    setTimeout(() => {
      setState({
        open: false,
        message: "",
      });
    }, 3000);
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };
  const vertical = "bottom"
  const horizontal = "center"

  const [UserProfile, setUserProfile] = React.useState(undefined);
  const [isLoading, setisLoading] = React.useState(true);
  React.useEffect(() => {
    let isCancelled = false;

    const fetchData = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          onValue(ref(db, `/${auth.currentUser.uid}/UserProfile`), (snapshot) => {
            const data = snapshot.val();
            // console.log(data)
            if (!isCancelled) {
            if (data !== null) {
              setUserProfile(data);
            }
            setisLoading(false)
          }
          });
          
        } else if (!user) {
          navigate("/");
        }
      });
    }

    fetchData()

    return () => {
      isCancelled = true;
      setUserProfile(undefined)
      setisLoading(true)
    };
  }, [])


  return (
    <div className="inputCard">
      {isLoading ? <div>Loading...</div> :
      <>
      <Snackbar
        anchorOrigin={{vertical, horizontal}}
        open={state.open}
        onClose={handleClose}
        message={state.message}
      />
      <div className={classes.form} style={{margin: "auto 10px", padding: "10% 10%", background: "var(--surface3)", borderRadius: "10px"}}>
      <Grid item style={{marginBottom: "20px"}}>
      <Typography className={classes.header}>Hi there!</Typography>
      <Typography className={classes.header}>Add a Birthday <CakeRoundedIcon /></Typography>
      </Grid>  
      <Grid item>
                            <TextField
                            margin="dense"
                                label="Name"
                                fullWidth
                                value={inputName}
                                onChange={(e) =>
                                  setinputName(e.target.value)
                                  }
                                helperText=" "
                                />
                              
                            <TextField
                            select
                            SelectProps={{
                              MenuProps: {
                                PaperProps: {
                                  sx: {
                                    backgroundColor: "var(--surface3)",
                                    color: "var(--text1)",
                                  }
                                }
                              }
                            }}
                            margin="dense"
                            fullWidth
                            id="day"
                            label="Date"
                            value={inputDay}
                            onChange={(e) =>
                              setinputDay(e.target.value)
                              }
                            helperText=" "
                            >
                            {days.map((date) => (
                                <MenuItem key={date} value={date}>
                                {date}
                                </MenuItem>
                            ))}
                            </TextField>
                              
                            <TextField
                            select
                            SelectProps={{
                              MenuProps: {
                                PaperProps: {
                                  sx: {
                                    backgroundColor: "var(--surface3)",
                                    color: "var(--text1)",
                                  }
                                }
                              }
                            }}
                            margin="dense"
                            fullWidth
                            id="month"
                            label="Month"
                            value={inputMonth}
                            onChange={(e) =>
                              setinputMonth(e.target.value)
                              }
                            helperText=" "
                            >
                            {Object.keys(months).map((key, index) => (
                                <MenuItem key={months[key]} value={months[key]}>
                                {months[key]}
                                </MenuItem>
                            ))}
                            </TextField>
                            </Grid>
                              
                            <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
                            <NavLink to="/BirthdayList" style={{textDecoration: "none", width: "45%"}}>
                            <Button style={{width: "100%", background: "rgba(21, 101, 192, 0.1)"}}>
                                View List
                            </Button>
                            </NavLink>
                            <Button variant="contained" onClick={handleSubmit} style={{width: "45%"}}>
                                Add
                            </Button></div>
                          </div>
                          </>}
      {/* <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setinputName(e.target.value)}
          value={inputName}
          name="inputName"
        />
        <span>
          <label>Date:</label>
          <select
            name="inputDay"
            id="day"
            onChange={(e) => setinputDay(e.target.value)}
            value={inputDay}
          >
            {days.map((date, index) => (
              <option key={index}>{date}</option>
            ))}
          </select>
        </span>
        <span>
          <label>Month:</label>
          <select
            name="inputMonth"
            id="month"
            onChange={(e) => setinputMonth(e.target.value)}
            value={inputMonth}
          >
            {Object.keys(months).map((key, index) => (
              <option key={key}>{months[key]}</option>
            ))}
          </select>
        </span>
        <button type="submit">Add</button>
      </form> */}
    </div>
  );
};

export default BirthdaysInput;
