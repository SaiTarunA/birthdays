import './App.css';
import React from 'react';
import Time from './components/Time';
import BirthdaysInput from './components/BirthdaysInput'
import BirthdayList from './components/BirthdayList';
import Login from './components/Login';
import {Route, Routes, useNavigate} from 'react-router-dom'
import NavBar from './components/NavBar';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import UseNetworkStatus from './components/UseNetworkStatus';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import BirthdayDashboard from './components/BirthdayDashboard';
import { auth, db } from './firebase';
import { onValue, ref } from 'firebase/database';
import logo from "./public/logo192.png";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "75%",
  maxWidth: 400,
  bgcolor: 'var(--surface3)',
  boxShadow: 24,
  p: 4,
  "&:focus":{
    outline: 'none',
  }
};

function App() {
  
  const theme = createTheme({
    typography: {
      fontFamily: 'SF-Pro'
    }
  });

  const networkStatus = UseNetworkStatus();

  const [open, setOpen] = React.useState(true);
  const [fullPage, setFullPage] = React.useState(false);
  // const handleOpen = () => setOpen(true);

  React.useEffect(() => {
    if(networkStatus === false){
      setOpen(true);
    }
  }, [networkStatus])
  
  const [granted, setGranted] = React.useState(false)
  const [allBirthdays, setallBirthdays] = React.useState([]);

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
            let localAllBirthdays = []
            localAllBirthdays = Object.values(data).map((birthdaylist) => {
              return birthdaylist
            });
            setallBirthdays(localAllBirthdays)
          }
        }
        });
      } else if (!user) {
        navigate("/");
      }
    });
    return () => {
      isCancelled = true;
      setallBirthdays([]);
    };
  }, []);

  React.useEffect(() => {
      if (Notification.permission === 'granted') {
          setGranted(true)
      } else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then(perm => {
              setGranted(perm === 'granted' ? true : false)
          })
      }
  }, [])

  React.useEffect(() => {
    let notification
    let interval

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
            let date = new Date()
            let dateNumber = date.getDate()
            let monthId = date.getMonth() + 1
            let hours = date.getHours()
            if (hours === 0) {
              let requiredNames = []
                  if (allBirthdays.length !== 0) {
                    requiredNames =  allBirthdays
                      .filter((p) => p.monthId == monthId && p.day == dateNumber)
                      .map((p) => {
                        return `${p.name}`;
                      })
                  }
              notification = new Notification(`Today's Birthdays(${dateNumber}-${monthId})`, {
                body: `${requiredNames.length !== 0 ? requiredNames : "No Birthdays"}`,
                icon: logo,
                tag: "Same Time"
              })

              notification.addEventListener('click', function(){
                  window.open('https://saitaruna.github.io/birthdays/');
              });
            }
            interval = setInterval(() => {
                date = new Date()
                dateNumber = date.getDate()
                monthId = date.getMonth() + 1
                hours = date.getHours()
                if (hours === 0) {
                  let requiredNames = []
                  if (allBirthdays.length !== 0) {
                    requiredNames =  allBirthdays
                      .filter((p) => p.monthId == monthId && p.day == dateNumber)
                      .map((p) => {
                        return `${p.name}`;
                      })
                  }
                  notification = new Notification(`Today's Birthdays(${dateNumber}-${monthId})`, {
                    body: `${requiredNames.length !== 0 ? requiredNames : "No Birthdays"}`,
                    icon: logo,
                    tag: "Next Interval"
                  })

                  notification.addEventListener('click', function(){
                      window.open('https://saitaruna.github.io/birthdays/');
                  });
                }
            }, 3600000);
        } else {
            if (interval) clearInterval(interval)
            if (notification) notification.close()
        }
    })
  }, [allBirthdays])

  return (
    <div className="App">
    <ThemeProvider theme={theme}>
    <NavBar setFullPage={setFullPage}/>
    {networkStatus ? <></> : <>
    <div>Check your Internet Connection</div>
    <Modal
        open={open}
        onClose={() => setOpen(true)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{color: "var(--brand)", fontWeight: "bold"}}>
            Check Your Internet Connection
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            The Details will not be updated to server when you are offline. Please check your connection and try again.
          </Typography>
        </Box>
      </Modal>
    </>}
    <Divider />
      <Routes>
      <Route path='/birthdays' element={<BirthdaysInput fullPage={fullPage}/>} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/Time" element={<Time fullPage={fullPage}/>} />
        <Route exact path="/Input" element={<BirthdaysInput fullPage={fullPage}/>} />
        <Route exact path="/Home" element={<BirthdayDashboard fullPage={fullPage}/>} />
        <Route exact path="/BirthdayList" element={<BirthdayList fullPage={fullPage}/>} />
      </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
