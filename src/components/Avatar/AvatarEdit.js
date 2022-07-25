import React from 'react'
import './AvatarEdit.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Avatar from 'avataaars';
import { useNavigate } from "react-router-dom";
import { ref, onValue, remove, update } from "firebase/database";
import { auth, db } from "../../firebase";
import { makeStyles } from "@mui/styles";
import { Button } from '@mui/material';

const useStyles = makeStyles({
  root: {
    color: "var(--text1) !important",
    background: "var(--surface2) !important"
  },
  tabs: {
    "& .Mui-selected" :{
      color: "#1976d2 !important"
    }
  }
})

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        className='TabPanel'
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

const AvatarEdit = (props) => {
  const classes = useStyles();
  // const handleUpdate = () => {
  //     // Post Update
  //     console.log("Updated")
  //     props.setisEditing(false)
  //     setValue(0)
  // }
  const handleCancel = () => {
    props.setisEditing(false)
    props.setFullPage(false)
    setValue(0)
  }
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const navigate = useNavigate();




  const [apiCall, setapiCall] = React.useState(undefined);
  React.useEffect(() => {
    // Here API Call to avatar
    
      auth.onAuthStateChanged((user) => {
        if (user) {
          onValue(ref(db, `/${auth.currentUser.uid}/avatar`), (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                setapiCall(data);
            }
            
          });
          
        } else if (!user) {
          navigate("/");
        }
      });
    
  }, [props.isEditing])
  
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
  }, [isProfileSet, props.isEditing])

  const avatarStyle = ['Circle','Transparent']
  const handleAvatarStyle = (value) => {
    setavatarProps({...avatarProps, avatarStyle: value})
  }

  const topType = ["NoHair", "Eyepatch", "Hat", "Hijab", "Turban", "WinterHat1", "WinterHat2", "WinterHat3", "WinterHat4", "LongHairBigHair", "LongHairBob", "LongHairBun", "LongHairCurly", "LongHairCurvy", "LongHairDreads", "LongHairFrida", "LongHairFro", "LongHairFroBand", "LongHairNotTooLong", "LongHairShavedSides", "LongHairMiaWallace", "LongHairStraight", "LongHairStraight2", "LongHairStraightStrand", "ShortHairDreads01", "ShortHairDreads02", "ShortHairFrizzle", "ShortHairShaggyMullet", "ShortHairShortCurly", "ShortHairShortFlat", "ShortHairShortRound", "ShortHairShortWaved", "ShortHairSides", "ShortHairTheCaesar", "ShortHairTheCaesarSidePart"]
  const handleTopType = (value) => {
    setavatarProps({...avatarProps, topType: value})
  }

  const accessoriesType = [ 'Blank',
  'Kurt',
  'Prescription01',
  'Prescription02',
  'Round',
  'Sunglasses',
  'Wayfarers' ]
  const handleAccessoriesType = (value) => {
    setavatarProps({...avatarProps, accessoriesType: value})
  }

  const hairColor = [ 'Auburn',
  'Black',
  'Blonde',
  'BlondeGolden',
  'Brown',
  'BrownDark',
  'PastelPink',
  'Blue',
  'Platinum',
  'Red',
  'SilverGray' ]
  const HairColorStyle = ['#a55728','#2c1b18','#b58143','#d6b370','#724133','#4a312c','#f59797','#000fdb','#ecdcbf','#c93305','#e8e1e1']
  const handleHairColor = (value) => {
    setavatarProps({...avatarProps, hairColor: value})
  }

  const facialHairType = [ 'Blank',
  'BeardMedium',
  'BeardLight',
  'BeardMajestic',
  'MoustacheFancy',
  'MoustacheMagnum' ]
  const handleFacialHairType = (value) => {
    setavatarProps({...avatarProps, facialHairType: value})
  }

  const facialHairColor = [ 'Auburn',
  'Black',
  'Blonde',
  'BlondeGolden',
  'Brown',
  'BrownDark',
  'Platinum',
  'Red' ]
  const facialHairColorStyle = ['#a55728','#2c1b18','#b58143','#d6b370','#724133','#4a312c','#ecdcbf','#c93305']
  const handleFacialHairColor = (value) => {
    setavatarProps({...avatarProps, facialHairColor: value})
  }

  const clotheType = [ 'BlazerShirt',
  'BlazerSweater',
  'CollarSweater',
  'GraphicShirt',
  'Hoodie',
  'Overall',
  'ShirtCrewNeck',
  'ShirtScoopNeck',
  'ShirtVNeck' ]
  const handleClotheType = (value) => {
    setavatarProps({...avatarProps, clotheType: value})
  }

  const clotheColor = [ 'Black',
  'Blue01',
  'Blue02',
  'Blue03',
  'Gray01',
  'Gray02',
  'Heather',
  'PastelBlue',
  'PastelGreen',
  'PastelOrange',
  'PastelRed',
  'PastelYellow',
  'Pink',
  'Red',
  'White<' ]
  const ClotheColorStyle = [ '#262e33',
  '#65c9ff',
  '#5199e4',
  '#25557c',
  '#e6e6e6',
  '#929598',
  '#3c4f5c',
  '#b1e2ff',
  '#a7ffc4',
  '#ffdeb5',
  '#ffafb9',
  '#ffffb1',
  '#ff488e',
  '#ff5c5c',
  '#ffffff' ]
  const handleClotheColor = (value) => {
    setavatarProps({...avatarProps, clotheColor: value})
  }

  const eyeType = [ 'Close',
  'Cry',
  'Default',
  'Dizzy',
  'EyeRoll',
  'Happy',
  'Hearts',
  'Side',
  'Squint',
  'Surprised',
  'Wink',
  'WinkWacky' ]
  const handleEyeType = (value) => {
    setavatarProps({...avatarProps, eyeType: value})
  }

  const eyebrowType = [ 'Angry',
  'AngryNatural',
  'Default',
  'DefaultNatural',
  'FlatNatural',
  'RaisedExcited',
  'RaisedExcitedNatural',
  'SadConcerned',
  'SadConcernedNatural',
  'UnibrowNatural',
  'UpDown',
  'UpDownNatural' ]
  const handleEyebrowType = (value) => {
    setavatarProps({...avatarProps, eyebrowType: value})
  }

  const mouthType = [ 'Concerned',
  'Default',
  'Disbelief',
  'Eating',
  'Grimace',
  'Sad',
  'ScreamOpen',
  'Serious',
  'Smile',
  'Tongue',
  'Twinkle',
  'Vomit' ]
  const handleMouthType = (value) => {
    setavatarProps({...avatarProps, mouthType: value})
  }

  const skinColor = [ 'Tanned',
  'Yellow',
  'Pale',
  'Light',
  'Brown',
  'DarkBrown',
  'Black' ]
  const handleSkinColor = (value) => {
    setavatarProps({...avatarProps, skinColor: value})
  }


  const handleAvatarUpdate = () => {
    setapiCall({...avatarProps})
    // Here API call = {...avatarProps}
    update(ref(db, `/${auth.currentUser.uid}/${"avatar"}`), {...avatarProps});
    update(ref(db, `/${auth.currentUser.uid}/${"UserProfile"}`), {
      isUserNew: false
    });
    props.setisEditing(false)
    props.setFullPage(false)
    setValue(0)
    if (props.setNewAvatarEdit) {
      props.setNewAvatarEdit(false)
    }
  }
  return (
    <div>
        {props.isEditing ? (
        <div className='AvatarEdit'>
            <div className="Avatarheading">{props.heading ? props.heading : "AVATAR EDIT"}</div>
            <Box sx={{ maxWidth: { xs: "100%", sm: "100%" }, bgcolor: 'inherit', flex: 1,overflowY: "hidden", display: "flex", flexDirection: "column" }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                className={classes.tabs}
                aria-label="scrollable auto tabs example"
            >
              {/* <Tab className={classes.root} label="Avatar Style" /> */}
                <Tab className={classes.root} label="Hair" />
                <Tab className={classes.root} label="Accessories" />
                <Tab className={classes.root} label="Facial Hair" />
                <Tab className={classes.root} label="Clothes" />
                <Tab className={classes.root} label="Eyes" />
                <Tab className={classes.root} label="Eyebrow" />
                <Tab className={classes.root} label="Mouth" />
                <Tab className={classes.root} label="Skin" />
            </Tabs>
            <div style={{flexGrow: 1, overflowY: "hidden", display: "flex", flexDirection: "column"}}>
            <div>
            <Avatar
            style={{width: '200px', height: '200px', margin: "20px auto"}}
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
            />
            </div>
            {/* <TabPanel value={value} index={0}>
            <div className='AvatarContainer'>
            {avatarStyle.map((value) => (
              <div onClick={() => handleAvatarStyle(value)} key={value}>
              <Avatar
              style={{width: '100px', height: '100px'}}
              avatarStyle={value}
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
            />
            <p>{value}</p>
            </div>))}
            </div>
            </TabPanel> */}
            <TabPanel value={value} index={0}>
            <div>Hair Color</div>
            <div style={{display: "flex", width: "100%", justifyContent: "center", padding: "10px",background: "var(--surface2)", position: "-webkit-sticky", position: "sticky", top: 0}}>
            {hairColor.map((value, index) => (
              <div onClick={() => handleHairColor(value)} key={index}>
                <div style={{height: "20px", width: "20px", background: HairColorStyle[index]}}></div>
            </div>
            ))}
            </div>
            <div className='AvatarContainer'>
            {topType.map((value) => (
              <div onClick={() => handleTopType(value)} key={value}>
              <Avatar
              style={{width: '100px', height: '100px'}}
              avatarStyle={avatarProps.avatarStyle}
              topType = {value}
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
            />
            </div>
            ))}
            </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
            <div className='AvatarContainer'>
            {accessoriesType.map((value) => (
              <div onClick={() => handleAccessoriesType(value)} key={value}>
              <Avatar
              style={{width: '100px', height: '100px'}}
              avatarStyle={avatarProps.avatarStyle}
              topType = {avatarProps.topType}
              accessoriesType = {value}
              hairColor = {avatarProps.hairColor}
              facialHairType = {avatarProps.facialHairType}
              facialHairColor = {avatarProps.facialHairColor}
              clotheType = {avatarProps.clotheType}
              clotheColor = {avatarProps.clotheColor}
              eyeType = {avatarProps.eyeType}
              eyebrowType = {avatarProps.eyebrowType}
              mouthType = {avatarProps.mouthType}
              skinColor = {avatarProps.skinColor}
            />
            </div>
            ))}
            </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
            <div>Facial Hair Color</div>
            <div style={{display: "flex", width: "100%", justifyContent: "center", padding: "10px",background: "var(--surface2)", position: "-webkit-sticky", position: "sticky", top: 0}}>
            {facialHairColor.map((value, index) => (
              <div onClick={() => handleFacialHairColor(value)} key={index}>
                <div style={{height: "20px", width: "20px", background: facialHairColorStyle[index]}}></div>
            </div>
            ))}
            </div>
            <div className='AvatarContainer'>
            {facialHairType.map((value) => (
              <div onClick={() => handleFacialHairType(value)} key={value}>
              <Avatar
              style={{width: '100px', height: '100px'}}
              avatarStyle={avatarProps.avatarStyle}
              topType = {avatarProps.topType}
              accessoriesType = {avatarProps.accessoriesType}
              hairColor = {avatarProps.hairColor}
              facialHairType = {value}
              facialHairColor = {avatarProps.facialHairColor}
              clotheType = {avatarProps.clotheType}
              clotheColor = {avatarProps.clotheColor}
              eyeType = {avatarProps.eyeType}
              eyebrowType = {avatarProps.eyebrowType}
              mouthType = {avatarProps.mouthType}
              skinColor = {avatarProps.skinColor}
            />
            </div>
            ))}
            </div>
            </TabPanel>
            <TabPanel value={value} index={3}>
            <div>Cloth Color</div>
            <div style={{display: "flex", width: "100%", justifyContent: "center", padding: "10px",background: "var(--surface2)", position: "-webkit-sticky", position: "sticky", top: 0}}>
            {clotheColor.map((value, index) => (
              <div onClick={() => handleClotheColor(value)} key={index}>
                <div style={{height: "20px", width: "20px", background: ClotheColorStyle[index]}}></div>
            </div>
            ))}
            </div>
            <div className='AvatarContainer'>
            {clotheType.map((value) => (
              <div onClick={() => handleClotheType(value)} key={value}>
              <Avatar
              style={{width: '100px', height: '100px'}}
              avatarStyle={avatarProps.avatarStyle}
              topType = {avatarProps.topType}
              accessoriesType = {avatarProps.accessoriesType}
              hairColor = {avatarProps.hairColor}
              facialHairType = {avatarProps.facialHairType}
              facialHairColor = {avatarProps.facialHairColor}
              clotheType = {value}
              clotheColor = {avatarProps.clotheColor}
              eyeType = {avatarProps.eyeType}
              eyebrowType = {avatarProps.eyebrowType}
              mouthType = {avatarProps.mouthType}
              skinColor = {avatarProps.skinColor}
            />
            </div>
            ))}
            </div>
            </TabPanel>
            <TabPanel value={value} index={4}>
            <div className='AvatarContainer'>
            {eyeType.map((value) => (
              <div onClick={() => handleEyeType(value)} key={value}>
              <Avatar
              style={{width: '100px', height: '100px'}}
              avatarStyle={avatarProps.avatarStyle}
              topType = {avatarProps.topType}
              accessoriesType = {avatarProps.accessoriesType}
              hairColor = {avatarProps.hairColor}
              facialHairType = {avatarProps.facialHairType}
              facialHairColor = {avatarProps.facialHairColor}
              clotheType = {avatarProps.clotheType}
              clotheColor = {avatarProps.clotheColor}
              eyeType = {value}
              eyebrowType = {avatarProps.eyebrowType}
              mouthType = {avatarProps.mouthType}
              skinColor = {avatarProps.skinColor}
            />
            </div>
            ))}
            </div>
            </TabPanel>
            <TabPanel value={value} index={5}>
            <div className='AvatarContainer'>
            {eyebrowType.map((value) => (
              <div onClick={() => handleEyebrowType(value)} key={value}>
              <Avatar
              style={{width: '100px', height: '100px'}}
              avatarStyle={avatarProps.avatarStyle}
              topType = {avatarProps.topType}
              accessoriesType = {avatarProps.accessoriesType}
              hairColor = {avatarProps.hairColor}
              facialHairType = {avatarProps.facialHairType}
              facialHairColor = {avatarProps.facialHairColor}
              clotheType = {avatarProps.clotheType}
              clotheColor = {avatarProps.clotheColor}
              eyeType = {avatarProps.eyeType}
              eyebrowType = {value}
              mouthType = {avatarProps.mouthType}
              skinColor = {avatarProps.skinColor}
            />
            </div>
            ))}
            </div>
            </TabPanel>
            <TabPanel value={value} index={6}>
            <div className='AvatarContainer'>
            {mouthType.map((value) => (
              <div onClick={() => handleMouthType(value)} key={value}>
              <Avatar
              style={{width: '100px', height: '100px'}}
              avatarStyle={avatarProps.avatarStyle}
              topType = {avatarProps.topType}
              accessoriesType = {avatarProps.accessoriesType}
              hairColor = {avatarProps.hairColor}
              facialHairType = {avatarProps.facialHairType}
              facialHairColor = {avatarProps.facialHairColor}
              clotheType = {avatarProps.clotheType}
              clotheColor = {avatarProps.clotheColor}
              eyeType = {avatarProps.eyeType}
              eyebrowType = {avatarProps.eyebrowType}
              mouthType = {value}
              skinColor = {avatarProps.skinColor}
            />
            </div>
            ))}
            </div>
            </TabPanel>
            <TabPanel value={value} index={7}>
            <div className='AvatarContainer'>
            {skinColor.map((value) => (
              <div onClick={() => handleSkinColor(value)} key={value}>
              <Avatar
              style={{width: '100px', height: '100px'}}
              avatarStyle={avatarProps.avatarStyle}
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
              skinColor = {value}
            />
            </div>
            ))}
            </div>
            </TabPanel>
            </div>
            </Box>
            <div style={{height: "34px", width: "90%", display: "flex", justifyContent: "space-evenly", margin: "15px auto"}}>
            {!props.heading && <Button variant="outlined" onClick={handleCancel} style={{width: "40%"}}>
                Cancel
            </Button>}
            <Button variant="contained" onClick={handleAvatarUpdate} style={{width: "40%"}}>
                {props.heading ? "Let's Go" : "Update"}
            </Button>
            </div>
        </div>
        ):(<></>)}
    </div>
  )
}

export default AvatarEdit