import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import "../App.css";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import logo from "../public/logo192.png";
import { makeStyles } from "@mui/styles";
import AvatarEdit from "./Avatar/AvatarEdit"
import ProfileAvatar from "./Avatar/ProfileAvatar";
// import { maxHeight, width } from "@mui/system";
import CakeRoundedIcon from '@mui/icons-material/CakeRounded';
import Checkbox from "./Checkbox/Checkbox"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Icon, Typography } from "@mui/material";
import { onValue, ref } from "firebase/database";
// import { Carousel } from "react-responsive-carousel";
import GetStarted from "./GetStarted";
import ProfileEdit from "./ProfileEdit";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  icon: {
  display: "none !important",
  ['@media (max-width: 910px)']: { // eslint-disable-line no-useless-computed-key
    display: "inline-block !important"
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
});

const NavBar = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleSignOut = (name) => {
    if(name){
      handleNav();
    }
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        alert(e.message);
      });
    setisProfileEditing(false)
  };
  const [loggedin, setloggedin] = React.useState(false);
  const [isEditing, setisEditing] = React.useState(false);
  const [isProfileEditing, setisProfileEditing] = React.useState(false);
  const [isNew, setisNew] = React.useState(false);
  const [theme, setTheme] = React.useState("dark");
  const [dialog, setDialog] = React.useState(false)

  React.useEffect(() => {
    setTheme(localStorage.getItem("SelectedTheme"))
  }, [])

  auth.onAuthStateChanged((user) => {
    if (user != null) {
      setloggedin(true);
    } else {
      setloggedin(false);
    }
  });
  

  const [sidebar,setsidebar] = React.useState(false);

  React.useEffect(() => {
    props.setFullPage(sidebar)
  
    return () => {
      props.setFullPage(sidebar)
    }
  }, [sidebar])
  const handleNav = () => {
    window.scrollTo(0, 0);
    setsidebar(!sidebar)
    // console.log(sidebar)
  }
  const handleMenu = () => {
    setsidebar(!sidebar)
  }
  const handleAvatarClick = () => {
    setisProfileEditing(true);
    props.setFullPage(true);
  }
  const pathname = window.location.toString()

  const [apiCall, setapiCall] = React.useState(undefined);
  const [isLoading, setisLoading] = React.useState(true);
  const [email, setEmail] = React.useState("");
  React.useEffect(() => {
    // Here API Call to avatar
    const fetchData = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setEmail(user.email)
          onValue(ref(db, `/${auth.currentUser.uid}/UserProfile`), (snapshot) => {
            const data = snapshot.val();
            // console.log(data)
            if (data !== null) {
                setapiCall(data);
            }
            setisLoading(false)
          });
          
        } else if (!user) {
          navigate("/");
        }
      });
    }
    fetchData()
  }, [])

  const isProfileSet = apiCall ? true : false;
  const [isUserNew, setisUserNew] = React.useState(false);
  const [newAvatarEdit, setNewAvatarEdit] = React.useState(false);
  React.useEffect(() => {
    if(isProfileSet){
      setisUserNew(false)
    }else{
      setisUserNew(true)
    }
  }, [isProfileSet])

  if(isUserNew && !isLoading){
    props.setFullPage(true)
  }

  return (
    <>
    {loggedin &&
    <div className="NavBar">
      <div className="logo">
        <img src={logo}></img>
      </div>
      <div className="heading">
        <div className="menudiv" onClick={handleMenu}>
        <div className={sidebar ? "menu-btn close menu" : "menu-btn menu"}>
              <div className={"btn-line"}></div>
              <div className={"btn-line"}></div>
              <div className={"btn-line"}></div>
          </div>
        </div>
      {sidebar ? <></> : <span>{pathname.indexOf("/Time") !== -1 ? "TIME" : pathname.indexOf("/Input") !== -1 ? "ADD A BIRTHDAY" : pathname.indexOf("/BirthdayList") !== -1 ? "BIRTHDAYS" : ""}</span>}
      {loggedin && <div onClick={handleAvatarClick} style={{width: "46px", height: "46px", border: "2px solid rgba(140,140,140,0.15)", boxSizing: "border-box", borderRadius: "50%", overflow:"hidden"}}><div style={{marginTop: "2px"}}><ProfileAvatar width="40px" isEditing={isEditing} isUserNew={isUserNew}/></div></div>}
      {isProfileEditing && <ProfileEdit setDialog={setDialog} isEditing={isEditing} setisEditing={setisEditing} isUserNew={isUserNew} setisProfileEditing={setisProfileEditing} email={email} setFullPage={props.setFullPage}/>}
      {isEditing? <AvatarEdit isEditing={isEditing} setisEditing={setisEditing} setFullPage={props.setFullPage}/> : <></>}
      {isUserNew && !isLoading ? <GetStarted setNewAvatarEdit={setNewAvatarEdit}/> : <></>}
      {newAvatarEdit && <AvatarEdit isEditing={isUserNew} setisEditing={setisUserNew} setNewAvatarEdit={setNewAvatarEdit} setFullPage={props.setFullPage} heading={"LET'S CREATE YOUR AVATAR"}/>}
      </div>
      <div className={sidebar ? "NavList activeNavlist" : "NavList"}>
        <p className="MenuTag">MENU</p>
        <div className="NavListChild">
        <NavLink className="List" to="/Time">
          <div className="List2 divlist" onClick={sidebar ? handleNav : null}>
          <i className="navicons material-icons">access_time</i>
          <span className="navtext">Time</span>
          </div>
        </NavLink>
        <NavLink className="List" to="/Input">
          <div className="List2 divlist" onClick={sidebar ? handleNav : null}>
          <i className="navicons material-icons">library_add</i>
          <span className="navtext">Add Birthday</span>
          </div>
        </NavLink>
        <NavLink
          className="List"
          to="/BirthdayList"
        >
          <div className="List2 divlist" onClick={sidebar ? handleNav : null}>
            <Icon className={classes.icon}>cake</Icon>
          {/* <CakeRoundedIcon className="navicons material-icons"/> */}
          {/* <i className="navicons material-icons">card_giftcard</i> */}
          <span className="navtext">Birthdays</span>
          </div>
        </NavLink>
        {loggedin ? (<>
        <div className="List pointer signout2">
          <div className="List divlist" onClick={() => setDialog(true)} style={{color: "#E77573"}}>
          <i style={{width: "24px"}} className="navicons material-icons">
            exit_to_apps
          </i>
          <span className="navtext">
            SignOut
          </span>
          </div>
        </div>
      </>) : (
        <></>
      )}
      <Dialog
        fullWidth={true}
        className={classes.dialog}
        maxWidth="xl"
        open={dialog}
        // onClose={() => props.handleCancel()}
      >
        <DialogTitle>Logout</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Are you sure you want to Signout?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{padding: "20px", justifyContent: "space-between"}}>
          <Button onClick={() => {
            if (sidebar) {
              handleSignOut("true")
            } else {
              handleSignOut()
            }
            setDialog(false)
          }} variant="outlined" style={{width: "45%"}}>Yes</Button>
          <Button onClick={() => setDialog(false)} variant="contained" style={{width: "45%"}}>No</Button>
        </DialogActions>
      </Dialog>
        </div>
        <div className="List">
        <div className="List2 divlist" style={{justifyContent: "space-between"}}>
          <span className="navtext MenuTag">THEME</span>
          <Checkbox theme={theme}/>
          </div>
          </div>
        {/* {sidebar ? <div className="rightwhitespace" onClick={()=>setsidebar(!sidebar)}></div> : <></>} */}
      </div>
      {loggedin ? (
        <div className="signout">
          <button className="navbutton" onClick={handleSignOut}>
            SignOut
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
}
</>
  );
};

export default NavBar;
