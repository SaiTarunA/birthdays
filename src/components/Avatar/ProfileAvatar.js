import React from 'react'
import Avatar from 'avataaars'
import './ProfileAvatar.css'
import { useNavigate } from "react-router-dom";
import { ref, onValue, remove, update } from "firebase/database";
import { auth, db } from "../../firebase";

const ProfileAvatar = (props) => {
  const [apiCall, setapiCall] = React.useState(undefined);
  const [isLoading, setisLoading] = React.useState(true);
  const navigate = useNavigate();
  React.useEffect(() => {
    // Here API Call to avatar
    const fetchData = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          onValue(ref(db, `/${auth.currentUser.uid}/avatar`), (snapshot) => {
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
  }, [props.isEditing, props.isUserNew])
  
  const isProfileSet = apiCall ? true : false;
  const [avatarProps, setavatarProps] = React.useState({});
  React.useEffect(() => {
    if(isProfileSet){
      setavatarProps({...avatarProps,
        avatarStyle: apiCall.avatarStyle,
        topType: apiCall.topType,
        accessoriesType: apiCall.accessoriesType,
        hairColor: apiCall.hairColor,
        facialHairType: apiCall.facialHairType,
        facialHairColor: apiCall.facialHairColor,
        clotheType: apiCall.clotheType,
        clotheColor: apiCall.clotheColor,
        eyeType: apiCall.eyeType,
        eyebrowType: apiCall.eyebrowType,
        mouthType: apiCall.mouthType,
        skinColor: apiCall.skinColor,
      })
    }else{
      setavatarProps({...avatarProps,
        avatarStyle: 'Transparent',
        topType: 'LongHairMiaWallace',
        accessoriesType: 'Prescription02',
        hairColor: 'BrownDark',
        facialHairType: 'Blank',
        facialHairColor: 'BrownDark',
        clotheType: 'Hoodie',
        clotheColor: 'PastelBlue',
        eyeType: 'Happy',
        eyebrowType: 'Default',
        mouthType: 'Smile',
        skinColor: 'Light',
      })
    }
  }, [isProfileSet, props.isEditing, props.isUserNew])
  
  /* const apiCallGet = {
    avatarStyle: 'Circle',
    topType: 'LongHairMiaWallace',
    accessoriesType: 'Prescription02',
    hairColor: 'BrownDark',
    facialHairType: 'Blank',
    clotheType: 'Hoodie',
    clotheColor: 'PastelBlue',
    eyeType: 'Happy',
    eyebrowType: 'Default',
    mouthType: 'Smile',
    skinColor: 'Light',
  } */

  return (
    <div>
        {/* <Avatar
          style={{width: '100px', height: '100px'}}
          avatarStyle='Circle'
          topType='LongHairMiaWallace'
          accessoriesType='Prescription02'
          hairColor='BrownDark'
          facialHairType='Blank'
          clotheType='Hoodie'
          clotheColor='PastelBlue'
          eyeType='Happy'
          eyebrowType='Default'
          mouthType='Smile'
          skinColor='Light'
        /> */}
        {isLoading ? (<></>) : (
        <Avatar
          style={{width: props.width, height: props.width, margin: "auto"}}
          avatarStyle = {avatarProps.avatarStyle}
        topType = {avatarProps.topType}
        accessoriesType = {avatarProps.accessoriesType}
        hairColor = {avatarProps.hairColor}
        facialHairType = {avatarProps.facialHairType}
        facialHairColor = {avatarProps.facialHairColor}
        clotheType = {avatarProps.clotheType}
        clotheColor = {avatarProps.clotheColor}
        eyeType = {avatarProps.eyeType}
        eyebrowType = {avatarProps.eyebrowType}
        mouthType = {avatarProps.mouthType}
        skinColor = {avatarProps.skinColor}
        />)}
      

  </div>
  )
}

export default ProfileAvatar