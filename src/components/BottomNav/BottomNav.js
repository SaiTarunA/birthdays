import React from 'react'
import "./BottomNav.css"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import { NavLink } from 'react-router-dom';

const BottomNav = () => {
  return (
    <div className='BottomNav'>
        <NavLink to={"/Input"} className="aNav">
        <div className='iconNav'>
            <AddCircleOutlineRoundedIcon style={{ color: "var(--text1)",
            margin: "auto",
            width: "30px",
            height: "30px" }}/>
            <div style={{fontSize: "10px"}}>ADD</div>
        </div>
        </NavLink>
        <div className='activeNav'>
            <HomeRoundedIcon style={{ color: "var(--surface3)",
            margin: "auto",
            width: "40px",
            height: "40px" }}/>
        </div>
        <NavLink to={"/BirthdayList"} className="aNav">
        <div className='iconNav'>
            <ListAltRoundedIcon style={{ color: "var(--text1)",
            margin: "auto",
            width: "30px",
            height: "30px" }}/>
            <div style={{fontSize: "10px"}}>LIST</div>
        </div>
        </NavLink>
    </div>
  )
}

export default BottomNav