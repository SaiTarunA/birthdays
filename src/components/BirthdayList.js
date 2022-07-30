import React from "react";
import Time from "./Time";
import "../App.css";
import NavBar from "./NavBar";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ref, onValue, remove, update } from "firebase/database";
import { NavLink } from "react-router-dom";
import Divider from "@mui/material/Divider";
import AccordionComponent from "./AccordionComponent"
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { makeStyles } from "@mui/styles";
import { StyledEngineProvider } from '@mui/material/styles';
import { boxSizing } from "@mui/system";
import Snackbar from '@mui/material/Snackbar';
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";

export const useStyles = makeStyles({
  root: {
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0)",
    color: "inherit",
    "&.Mui-disabled": {
      backgroundColor: "inherit",
    },
    '&:before': {
      opacity: 0,
    },
    boxShadow: "none",
  },
  summary: {
    background: "none",
    width: "100%",
    color: "var(--brand)",
    "& .MuiAccordionSummary-content": {
      "& .MuiTypography-root": {
      fontWeight: "bold",
      fontFamily: "SF-Pro",
      textTransform: "uppercase",
      }
    },
    "& .MuiAccordionSummary-expandIconWrapper": {
      color: "inherit",
      background: "	rgb(0, 170, 255,0.1)",
      borderRadius: "50%",
    }
  },
  details: {
    "& .MuiAccordionDetails-root": {
      padding: "0px 16px",
    },
    "& .MuiTypography-root": {
      "&p": {
        wordBreak: "break-all",
      }
    },
    "& div": {
      minHeight: "56px",
      boxSizing: "border-box",
      width: "100%",
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
      padding: "0px 16px",
      "& div": {
        padding: "0px",
        width: "100%",
      }
    }
  },
  dialog: {
    "& .MuiDialog-paper": {
    backgroundColor: "var(--surface1)",
    color: "var(--text1)",
    },
    "& .MuiButton-root": {
      fontWeight: "bold",
    },
    "& .MuiDialogTitle-root": {
      fontWeight: "bold",
    },
    "& .MuiDialogContent-root": {
      borderTop: "1px solid rgba(127, 127, 127, 0.12);",
      borderBottom: "1px solid rgba(127, 127, 127, 0.12);",
      color: "var(--text1)",
    },
    "& .MuiDialogContentText-root": {
      backgroundColor: "var(--surface1)",
      color: "var(--text1)",
    },
    "& .MuiPopover-root": {
      "& .MuiPopover-paper": {
      backgroundColor: "var(--surface3) !important",
      color: "var(--text1)",
    },
    },
    '& label.Mui-focused': {
      color: 'var(--brand)',
    },
    "& .MuiOutlinedInput-root": {
      color: "var(--text1)",
      "& fieldset": {
        borderColor: "var(--text2)",
      },
      '&:hover fieldset': {
        borderColor: 'var(--text1)',
      },
      '& .MuiSelect-icon': {
        color: "var(--text1)"
      },
      '&.Mui-focused fieldset, label.Mui-focused': {
        borderColor: 'var(--brand)',
      },
    },
    "& .MuiInputLabel-root": {
      color: "var(--text2)",
    },
    '& .MuiFormHelperText-root': {
      color: 'var(--text1)'
    },
  },
  form: {
    '& label.Mui-focused': {
      color: 'var(--brand)',
    },
    "& .MuiOutlinedInput-root": {
      color: "var(--text1)",
      "& fieldset": {
        borderColor: "var(--text2)",
      },
      '&:hover fieldset': {
        borderColor: 'var(--text1)',
      },
      '& .MuiSelect-icon': {
        color: "var(--text1)"
      },
      '&.Mui-focused fieldset, label.Mui-focused': {
        borderColor: 'var(--brand)',
      },
    },
    "& .MuiInputLabel-root": {
      color: "var(--text2)",
    },
    '& .MuiFormHelperText-root': {
      color: 'var(--text1)'
    },
    '& .Mui-disabled': {
      color: 'var(--text1) !important',
      WebkitTextFillColor: 'var(--text1) !important'
    }
  },
  header: {
    fontSize: "1.5rem !important",
    fontWeight: "bold !important",
    textAlign: "start",
  },
  divider: {
    width: "calc(100% - 32px)",
    margin: "auto !important",
    opacity: "0.2",
    borderColor: "inherit !important",
    '&:last-child': {
      width: 0,
    },
  },
});
const BirthdayList = (props) => {
  const classes = useStyles();
  const [allBirthdays, setallBirthdays] = React.useState([]);
  const [empty, setEmpty] = React.useState(false);
  //sorting
  function compareUsingMonths(a, b) {
    return a.monthId - b.monthId;
  }
  allBirthdays.sort(compareUsingMonths);
  function compareUsingDays(a, b) {
    if (a.monthId === b.monthId) {
      return a.day - b.day;
    }
  }
  allBirthdays.sort(compareUsingDays);

  const [updateDataName, setupdateDataName] = React.useState("");
  const [updateDataDay, setupdateDataDay] = React.useState("");
  const [updateDataMonth, setupdateDataMonth] = React.useState("");
  const [isUpdating, setisUpdating] = React.useState(false);
  const [TempUid, setTempUid] = React.useState("");
  const [isAuthorized, setisAuthorized] = React.useState(false);
  const [defaultTrue, setdefaultTrue] = React.useState(Array(12).fill(true));
  const [defaultFalse, setdefaultFalse] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  // const [checkNet, setcheckNet] = React.useState(false);

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
  let days = Array.from({ length: 31 }, (v, k) => k + 1);
  if (updateDataMonth === "February") {
    days = Array.from({ length: 29 }, (v, k) => k + 1);
    if (updateDataDay > 29) {
      setupdateDataDay("1");
    }
  } else if (
    updateDataMonth === "April" ||
    updateDataMonth === "June" ||
    updateDataMonth === "September" ||
    updateDataMonth === "November"
  ) {
    days = Array.from({ length: 30 }, (v, k) => k + 1);
    if (updateDataDay > 30) {
      setupdateDataDay("1");
    }
  } else {
    days = Array.from({ length: 31 }, (v, k) => k + 1);
  }
  const navigate = useNavigate();
  React.useEffect(() => {
    let isCancelled = false;
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}/BirthdayList`), (snapshot) => {
          if (!isCancelled) {
          setallBirthdays([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((birthdaylist) => {
              setallBirthdays((oldArray) => [...oldArray, birthdaylist]);
            });
          }
          setLoading(false)
        }
        });
        // setTimeout(function(){
        //   setcheckNet(true);
        // }, 5000);
        setisAuthorized(true);
      } else if (!user) {
        navigate("/");
      }
    });
    return () => {
      isCancelled = true;
      setallBirthdays([]);
      setLoading(true)
    };
  }, []);
  React.useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
    if (allBirthdays.length != 0) {
      setEmpty(false)
    } else {
      setEmpty(true)
    }
  }
    return () => {
      isCancelled = true;
      setEmpty(false)
    };
  }, [allBirthdays]);
  const Deletethis = (id) => {
    remove(ref(db, `/${auth.currentUser.uid}/BirthdayList/${TempUid}`));
    setTimeout(function(){
      setupdateDataName("");
      setupdateDataMonth("January");
      setupdateDataDay("");
      setTempUid("");
    }, 1000);
    setisUpdating(false);
  };
  const Updatethis = (birthday) => {
    setisUpdating(true);
    setupdateDataName(birthday.name);
    setupdateDataDay(birthday.day);
    setupdateDataMonth(birthday.month);
    setTempUid(birthday.uidd);
    allBirthdays.sort(compareUsingMonths);
    allBirthdays.sort(compareUsingDays);
  };
  const handleUpdate = (value) => {
    if (updateDataName.replace(/ /g, "") !== "") {
      update(ref(db, `/${auth.currentUser.uid}/BirthdayList/${TempUid}`), {
        name: updateDataName,
        day: updateDataDay,
        month: updateDataMonth,
        monthId: Object.keys(months).find((k) => months[k] === updateDataMonth),
      });
    } else {
      handleSnackbar();
    }
    setTimeout(function(){
      setupdateDataName("");
      setupdateDataMonth("January");
      setupdateDataDay("");
      setTempUid("");
    }, 1000);
    setisUpdating(false);
  };
  const handleCancel = () => {
    setTimeout(function(){
      setupdateDataName("");
      setupdateDataMonth("January");
      setupdateDataDay("");
      setTempUid("");
    }, 1000);
    setisUpdating(false);
  };
  const handleDisable = (array) => {
    if (array.length < 1) {
      return true;
    }
    return false;
  };
  const handleChange = (array) => {
    const defaultTrueCopy = [...defaultTrue];
    defaultTrueCopy[array - 1] = !defaultTrueCopy[array - 1];
    // console.log(defaultTrue);
    setdefaultTrue(defaultTrueCopy);
    // if(array.length>0){
    //   setdefaultTrue((prev)=>!prev)
    // }else{
    //   setdefaultFalse((prev)=>!prev)
    // }
  };

  //   let counts = allBirthdays.reduce((m, { monthId }) => m.set(monthId, m.has(monthId)), new Map),
  //   result = allBirthdays.filter(({ monthId }) => counts.get(monthId)), result2 = allBirthdays.filter(({ monthId }) => !counts.get(monthId));
  // console.log(result, result2);
  const DisplayBirthday = Object.values(months).map((value) => {
    return {
      [value]: allBirthdays
        .filter((p) => p.month === value)
        .map((p) => {
          return `${p.uidd}&${p.day} - ${p.name}`;
        }),
    };
  });
  // If bot have same name, month, date
  // for(let i=0;i<allBirthdays.length-1;i++){
  //   if(allBirthdays[i].name==allBirthdays[i+1].name && allBirthdays[i].day==allBirthdays[i+1].day && allBirthdays[i].month==allBirthdays[i+1].month){
  //     console.log(allBirthdays[i])
  //     console.log(allBirthdays.filter((birthday)=>birthday.uidd!==allBirthdays[i+1].uidd))
  //   }
  // }
  // console.log(defaultTrue);
  const aaaaa = DisplayBirthday.map((birthday) => {
    return Object.keys(birthday).filter((key) => birthday[key].length > 0)[0];
  });
  // console.log(aaaaa);
  function arrayEquals(a, b) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  }
  const [defaultFalseforHideAll, setdefaultFalseforHideAll] = React.useState();
  React.useEffect(() => {
    let isCancelled = false;
    
    const defaultTrueCopyinEffect = [...defaultTrue];
    for (let i = 0; i < defaultTrueCopyinEffect.length; i++) {
      if (aaaaa[i] !== undefined) {
        // console.log(aaaaa[i]);
        defaultTrueCopyinEffect[i] = false;
      }
    }
    if (!isCancelled) {
    if (
      arrayEquals(defaultFalseforHideAll, defaultTrueCopyinEffect) === false
    ) {
      setdefaultFalseforHideAll(defaultTrueCopyinEffect);
    }
  }
    return () => {
      isCancelled = true;
      setdefaultFalseforHideAll(defaultTrueCopyinEffect);
    };
  }, [defaultTrue]);
  // console.log(defaultFalseforHideAll);

  const hideAll = () => {
    const defaultTrueCopyinHide = [...defaultTrue];
    for (let i = 0; i < defaultTrueCopyinHide.length; i++) {
      if (aaaaa[i] !== undefined) {
        defaultTrueCopyinHide[i] = false;
      }
    }
    setdefaultTrue(defaultTrueCopyinHide);
  };
  // console.log(defaultTrue);

  const bottombutton = React.useRef(null);
  var lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      bottombutton.current ? (
        (bottombutton.current.style.bottom = "-100px")
      ) : (
        <></>
      );
    } else {
      bottombutton.current ? (
        (bottombutton.current.style.bottom = "5vw")
      ) : (
        <></>
      );
    }
    lastScrollTop = scrollTop;
  });
  const [monthsWithBirthdays, setmonthsWithBirthdays] = React.useState(false);
  const withBirthdays = () => {
    setmonthsWithBirthdays(!monthsWithBirthdays);
  };

  const [state, setState] = React.useState({
    open: false,
    message: "",
  });

  const handleSnackbar = () => {
    setState({
      open: true,
      message: "Name Cannot be empty",
    });
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
  return (
    <StyledEngineProvider injectFirst>
    <div className="Container">
      {props.fullPage ? <></> : <>
      {!isAuthorized === true || loading === true ? (
        <>
        <div>Loading...</div>
        {/* {checkNet === true ? <div>Check your network connection</div> : <></>} */}
        </>
      ) : (
        empty ? <div className="listComponent" style={{display: "flex", gap: "20px", flexDirection: "column", margin: "20px", alignItems: "center"}}>
          <Typography>You did not have any Birthdays in the list. Please add a Birthday.</Typography>
          <NavLink to="/Input" style={{textDecoration: "none", width: "fit-content"}}>
              <Button variant="contained">Add</Button>
            </NavLink>
        </div> :
        <div className="listComponent">
          <div>
          <Snackbar
            anchorOrigin={{vertical, horizontal}}
            open={state.open}
            onClose={handleClose}
            message={state.message}
          />
            <NavLink to="/Input">
              <AddIcon ref={bottombutton} className="navicons material-icons bottombutton"/>
            </NavLink>
          </div>
          
          <div>
            <div className="buttonstwo">
              {arrayEquals(defaultTrue, Array(12).fill(true)) ? (
                <></>
              ) : (
                <div
                  className="button"
                  onClick={() => setdefaultTrue(Array(12).fill(true))}
                >
                  <Typography>Show All</Typography>
                  <i className="material-icons">unfold_more</i>
                </div>
              )}
              {arrayEquals(defaultTrue, defaultFalseforHideAll) ? (
                <></>
              ) : (
                <div
                  className="button"
                  onClick={
                    () =>
                      /* defaultTrue !== Array(12).fill(false) ? */ hideAll() /*: ""*/
                  }
                >
                  <Typography>Collapse All</Typography>
                  <i className="material-icons">unfold_less</i>
                </div>
              )}
            </div>
            {/* Show all months including disabled
            <button onClick={() => withBirthdays()}>
              {monthsWithBirthdays
                ? "Show All Months"
                : "Months with Birthdays"}
            </button> */}
            <AccordionComponent
                    DisplayBirthday={DisplayBirthday}
                    monthsWithBirthdays={monthsWithBirthdays}
                    classes={classes}
                    handleDisable={handleDisable}
                    defaultTrue={defaultTrue}
                    defaultFalse={defaultFalse}
                    months={months}
                    handleChange={handleChange}
                    isUpdating={isUpdating}
                    TempUid={TempUid}
                    setupdateDataName={setupdateDataName}
                    updateDataName={updateDataName}
                    setupdateDataDay={setupdateDataDay}
                    updateDataDay={updateDataDay}
                    setupdateDataMonth={setupdateDataMonth}
                    updateDataMonth={updateDataMonth}
                    days={days}
                    handleUpdate={handleUpdate}
                    handleCancel={handleCancel}
                    Deletethis={Deletethis}
                    Updatethis={Updatethis}
                    allBirthdays={allBirthdays}
                    />
          </div>
        </div>
      )}
      </>}
    </div>
    </StyledEngineProvider>
  );
};

export default BirthdayList;