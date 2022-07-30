import React from "react";
import Divider from "@mui/material/Divider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../App.css";

import Box from '@mui/material/Box';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
// import Aos from "aos";
// // import "aos/dist/aos.css"
// import Fade from 'react-reveal/Fade';

const useMountEffect = fun => React.useEffect(fun, []);

const AccordionComponent = (props) => {
  const [deleteDialog, setdeleteDialog] = React.useState(false)
    const current = new Date();
    const todayMonth = current.getMonth()+1
    const nameOfMonth = props.months[todayMonth]

    // React.useEffect(() => {
    //   Aos.init({ duration: 200 })
    // }, [])

    const myRef = React.useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();
  useMountEffect(executeScroll);
  return (
    <div id="mainDiv">
        <React.Fragment>
      <Dialog
        fullWidth={true}
        className={props.classes.dialog}
        maxWidth="xl"
        open={props.isUpdating}
        onClose={() => props.handleCancel()}
      >
        <DialogTitle style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}><span>EDIT</span><DeleteForeverIcon color="error" onClick={() => setdeleteDialog(true)}/></DialogTitle>
        <Divider />
        <DialogContent dividers>
          {/* <DialogContentText style={{marginBottom: "10px"}}>
            You Can Update Here
          </DialogContentText> */}
          <>
                            {/* <div> */}
                            <TextField
                            margin="dense"
                                label="Name"
                                fullWidth
                                value={props.updateDataName}
                                onChange={(e) =>
                                    props.setupdateDataName(e.target.value)
                                  }
                                helperText=" "
                                />
                              {/* <label>Name:</label>
                              <input
                                type="text"
                                onChange={(e) =>
                                  props.setupdateDataName(e.target.value)
                                }
                                value={props.updateDataName}
                              />
                            </div>
                            <div> */}
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
                            value={props.updateDataDay}
                            onChange={(e) =>
                                props.setupdateDataDay(e.target.value)
                              }
                            helperText=" "
                            >
                            {props.days.map((date) => (
                                <MenuItem key={date} value={date}>
                                {date}
                                </MenuItem>
                            ))}
                            </TextField>
                              {/* <label>Date:</label>
                              <select
                                name="inputDay"
                                id="day"
                                onChange={(e) =>
                                  props.setupdateDataDay(e.target.value)
                                }
                                value={props.updateDataDay}
                              >
                                {props.days.map((date) => (
                                  <option>{date}</option>
                                ))}
                              </select>
                            </div>
                            <div> */}
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
                            value={props.updateDataMonth}
                            onChange={(e) =>
                                props.setupdateDataMonth(e.target.value)
                              }
                            helperText=" "
                            >
                            {Object.keys(props.months).map((key, index) => (
                                <MenuItem key={props.months[key]} value={props.months[key]}>
                                {props.months[key]}
                                </MenuItem>
                            ))}
                            </TextField>
                              {/* <label>Month:</label>
                              <select
                                name="updateDataMonth"
                                id="month"
                                onChange={(e) =>
                                  props.setupdateDataMonth(e.target.value)
                                }
                                value={props.updateDataMonth}
                              >
                                {Object.keys(props.months).map((key, index) => (
                                  <option>{props.months[key]}</option>
                                ))}
                              </select>
                            </div> */}
                            {/* <Button variant="contained" color="error" onClick={() => setdeleteDialog(true)}>
                                Delete
                            </Button> */}
                          </>
        </DialogContent>
        <Divider />
        <DialogActions style={{padding: "5% 7.5%", justifyContent: "space-between"}}>
          <Button onClick={() => props.handleUpdate()} variant="contained" style={{width: "45%"}}>Confirm</Button>
          <Button onClick={() => props.handleCancel()} style={{width: "45%", background: "rgba(21, 101, 192, 0.1)"}}>Cancel</Button>
        </DialogActions>
      </Dialog>






      <Dialog
        fullWidth={true}
        className={props.classes.dialog}
        maxWidth="xl"
        open={deleteDialog}
        onClose={() => props.handleCancel()}
      >
        <DialogTitle>Delete</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Are you sure you want to delete this Birthday?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{padding: "20px", justifyContent: "space-between"}}>
          <Button onClick={() => {
            props.Deletethis()
            setdeleteDialog(false)
          }} variant="outlined" style={{width: "45%"}}>Remove</Button>
          <Button onClick={() => setdeleteDialog(false)} variant="contained" style={{width: "45%"}}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    
      {props.DisplayBirthday.map((birthday,index) => (
        <div key={index}>
        {Object.keys(birthday).map((key) => (
          <div key={key}>
          {(props.monthsWithBirthdays === false ? true : birthday[key].length>0) ? (
            <div key={key}>
              {/* <Fade big duration={800} cascade> */}
            <Accordion
              key={key}
              disableGutters
              // data-aos-easing="ease-in-sine"
              // data-aos="slide-right"
              ref={nameOfMonth === key ? myRef : null}
              style={{scrollMarginTop: "64px"}}
              square
              className={props.classes.root}
              disabled={props.handleDisable(birthday[key])}
              expanded={
                birthday[key].length > 0
                  ? props.defaultTrue[
                      Object.keys(props.months).filter((value) =>
                        props.months[value].includes(key)
                      )[0] - 1
                    ]
                  : props.defaultFalse
              }
              onChange={() =>
                props.handleChange(
                  Object.keys(props.months).filter((value) =>
                    props.months[value].includes(key)
                  )[0]
                )
              }
            >
              <AccordionSummary
                className={props.classes.summary}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{key} {/*{nameOfMonth === key? "Present Month" : ""}*/}</Typography>
              </AccordionSummary>
              <AccordionDetails
                style={{ padding: "0px" }}
                className={props.classes.details}
              >
                
                  {birthday[key].map((value) => (
                      <div key={value}>
                        
                          <div
                          >
                              <Typography
                              component={'div'}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              width: "100%",
                            }}
                            className={props.classes.form}>
                            <TextField
                            size="small"
                            InputProps={{
                              disableUnderline: true,
                            }}
                              disabled
                              id="standard-disabled"
                              defaultValue={value.split("&")[1]}
                              variant="standard"
                            />
                            {/* <span style={{
                            // wordBreak: "normal",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis", 
                            }}>{value.split("&")[1]}</span> */}
                            <span
                            onClick={() =>
                              props.Updatethis(
                                props.allBirthdays.filter((filtered) =>
                                filtered.uidd && filtered.uidd.includes(value.split("&")[0])
                                )[0]
                              )
                            }>
                              <EditRoundedIcon style={{opacity: "0.5", color: "var(--text1)"}}/>
                              </span>
                            {/* <button
                              onClick={() =>
                                props.Updatethis(
                                  props.allBirthdays.filter((filtered) =>
                                  filtered.uidd && filtered.uidd.includes(value.split("&")[0])
                                  )[0]
                                )
                              }
                            >
                              Update
                            </button> */}
                            </Typography>
                          </div>
                        
                      </div>
                  ))}
              </AccordionDetails>
            </Accordion>
            {/* </Fade> */}
            <Divider className={props.classes.divider} />
            </div>
          ) : (
            <></>
          )}
          </div>
        ))}
        </div>
      ))}
    </div>
  );
};

export default AccordionComponent;
