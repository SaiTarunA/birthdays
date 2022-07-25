import './App.css';
import React from 'react';
import Time from './components/Time';
import BirthdaysInput from './components/BirthdaysInput'
import BirthdayList from './components/BirthdayList';
import Login from './components/Login';
import {Route, Routes} from 'react-router-dom'
import NavBar from './components/NavBar';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import UseNetworkStatus from './components/UseNetworkStatus';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
        <Route exact path="/BirthdayList" element={<BirthdayList fullPage={fullPage}/>} />
      </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
