import { Button, Typography } from '@mui/material'
import React from 'react'
import ProfileAvatar from './Avatar/ProfileAvatar'
import "../App.css"

const ProfileEdit = (props) => {

    const handleClick = () => {
        props.setisEditing(true)
        props.setisProfileEditing(false)
    }

  return (
    <div className='GetStarted'>
        <div style={{position: "absolute", top: "10px", width: "100vw"}}>
            <p onClick={() => (props.setisProfileEditing(false), props.setFullPage(false))}>
            Close
            </p>
          </div>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "100vw", gap: "100px"}}>
            <div>
            <div style={{overflow: "hidden", borderRadius: "50%", border: "5px solid var(--surface2)", width:"40vw", height: "40vw"}}>
            <ProfileAvatar isEditing={props.isEditing} isUserNew={props.isUserNew} width="39vw"/>
            </div>
            <Button variant='outlined' style={{margin: "20px"}} onClick={handleClick}>Edit Avatar</Button>
            </div>
            <div>
            <Typography>Email: {props.email}</Typography>
            <div className="List divlist" onClick={() => props.setDialog(true)} style={{color: "#E77573", justifyContent: "center"}}>
          
          <p className="navtext">
            SignOut
          </p>
          </div>
            </div>
        
        </div>
    </div>
  )
}

export default ProfileEdit