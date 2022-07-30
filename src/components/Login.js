import React from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { useStyles } from './BirthdayList'
import { Button, Grid, TextField, Typography } from '@mui/material'
import logo from "../public/logo192.png"

export const header = (props, classes) => {

  return(
    
    <Grid item style={{marginBottom: "20px"}}>
      {props.length>0 && props.map((value)=>{
        return(<Typography key={value} className={classes.header}>{value}</Typography>)
      })
    }
      </Grid>            
                          
  )
}


const Login = () => {
  const [email, setemail] = React.useState("")
  const [password, setpassword] = React.useState("")
  const [register, setregister] = React.useState(false)
  const [regInfo, setregInfo] = React.useState({
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: ""
  })
  const [isLoading, setisLoading] = React.useState(true)
  const [helperText3, setHelperText3] = React.useState(" ")
  const [helperText4, setHelperText4] = React.useState(" ")
  const [helperText1, setHelperText1] = React.useState(" ")
  const [helperText2, setHelperText2] = React.useState(" ")
  const navigate = useNavigate();
  const classes = useStyles()
  React.useEffect(() => {
    let isCancelled = false;
    auth.onAuthStateChanged ((user) => {
      if(user){
          navigate('/Home')
      }else{
        if (!isCancelled) {
        setisLoading(false)
        }
      }
    })
    return () => {
      isCancelled = true;
      setisLoading(true)
    };
  }, [])
  
  const handleSignIn = () => {
    if (email.replace(/ /g, "") == "") {
      setHelperText3("Email Cannot be empty")
    } else {
      setHelperText3(" ")
    }
    if (password.replace(/ /g, "") == "") {
      setHelperText4("Password Cannot be empty")
    } else {
      setHelperText4(" ")
    }
    if (email.replace(/ /g, "") == "" || password.replace(/ /g, "") == "") {
      return;
    }
      signInWithEmailAndPassword(auth, email, password).then(() => {
          navigate('/Home')
      }).catch((e)=>alert(e.message));
  }

  const resetHelperTexts = () => {
    setHelperText1(" ")
    setHelperText2(" ")
    setHelperText3(" ")
    setHelperText4(" ")
  }
  const handleRegister = () => {
    if (regInfo.email.replace(/ /g, "") == "") {
      setHelperText3("Email Cannot be empty")
    } else {
      setHelperText3(" ")
    }
    if (regInfo.password.replace(/ /g, "") == "") {
      setHelperText4("Password Cannot be empty")
    } else {
      setHelperText4(" ")
    }
    if(regInfo.email!==regInfo.confirmEmail){
      setHelperText1("Confirm Email does not match")
    } else if (regInfo.confirmEmail.replace(/ /g, "") == "") {
      setHelperText1("Email Cannot be empty")
    } else {
      setHelperText1(" ")
    }
    if(regInfo.password!==regInfo.confirmPassword){
      setHelperText2("Confirm Password does not match")
    } else if (regInfo.confirmPassword.replace(/ /g, "") == "") {
      setHelperText2("Password Cannot be empty")
    } else {
      setHelperText2(" ")
    }
    if (regInfo.email!==regInfo.confirmEmail || regInfo.password!==regInfo.confirmPassword || regInfo.email.replace(/ /g, "") == "" || regInfo.confirmEmail.replace(/ /g, "") == "" || regInfo.password.replace(/ /g, "") == "" || regInfo.confirmPassword.replace(/ /g, "") == "") {
      return;
    }
    createUserWithEmailAndPassword(auth, regInfo.email, regInfo.password).then(()=>{
        navigate('/Home')
        window.location.reload()
    }).catch((e)=>alert(e.message));
}
  return (
    <div className='loginComponent'>
        {isLoading ? <></> 
        : 
        <div>
            {register ?
                (<>
                <div style={{display: "flex", margin: "20px auto", justifyContent: "center"}}>
                  <img src={logo} style={{width: "40px", marginRight: "5px"}}/>
                  <Typography className={classes.header}>BIRTHDAYS</Typography>
                </div>
                <div className="inputCard">
                <div className={classes.form} style={{margin: "auto 10px", padding: "10% 10%", background: "var(--surface3)", borderRadius: "10px"}}>
                  {header(["REGISTER"],classes)}
                  <TextField
                          margin="dense"
                              label="Email"
                              required
                              inputProps={{
                                autoComplete: 'new-password',
                                form: {
                                  autoComplete: 'off',
                                },
                              }}
                              fullWidth
                              value={regInfo.email}
                              onChange={(e) =>
                                (setregInfo({...regInfo, email:e.target.value}), setHelperText3(" "))
                                }
                              helperText={helperText3}
                              />
                  <TextField
                          margin="dense"
                          required
                              label="Confirm Email"
                              inputProps={{
                                autoComplete: 'new-password',
                                form: {
                                  autoComplete: 'off',
                                },
                              }}
                              fullWidth
                              value={regInfo.confirmEmail}
                              onChange={(e) =>
                                (setregInfo({...regInfo, confirmEmail:e.target.value}), setHelperText1(" "))
                                }
                              helperText={helperText1}
                              />
                              <TextField
                          margin="dense"
                          required
                              label="Password"
                              type="password"
                              inputProps={{
                                autoComplete: 'new-password',
                                form: {
                                  autoComplete: 'off',
                                },
                              }}
                              fullWidth
                              value={regInfo.password}
                              onChange={(e) =>
                                (setregInfo({...regInfo, password:e.target.value}), setHelperText4(" "))
                                }
                              helperText={helperText4}
                              />
                              <TextField
                          margin="dense"
                          required
                              label="Confirm Password"
                              type="password"
                              inputProps={{
                                autoComplete: 'new-password',
                                form: {
                                  autoComplete: 'off',
                                },
                              }}
                              fullWidth
                              value={regInfo.confirmPassword}
                              onChange={(e) =>
                                (setregInfo({...regInfo, confirmPassword:e.target.value}), setHelperText2(" "))
                                }
                              helperText={helperText2}
                              />
                  <Button variant="contained" onClick={handleRegister} style={{width: "45%", marginBottom: "10px"}}>
                  Register
                            </Button>
                  <Typography onClick={()=>(setregister(false), resetHelperTexts())}>Already have an account? SignIn</Typography>
                  </div>
                  </div>
                {/* <h1>Register</h1>
                <input type="text" onChange={(e)=>setregInfo({...regInfo, email:e.target.value})} value={regInfo.email} placeholder="Email"/>
                <input type="text" onChange={(e)=>setregInfo({...regInfo, confirmEmail:e.target.value})} value={regInfo.confirmEmail} placeholder="Confirm Email"/>
                <input type="password" onChange={(e)=>setregInfo({...regInfo, password:e.target.value})} value={regInfo.password} placeholder="Password"/>
                <input type="password" onChange={(e)=>setregInfo({...regInfo, confirmPassword:e.target.value})} value={regInfo.confirmPassword} placeholder="Confirm Password"/>
                <button onClick={handleRegister}>Register</button>
                <button onClick={()=>setregister(false)}>Have an Account?Login</button> */}
                </>
                ):(<>
                <div style={{display: "flex", margin: "20px auto", justifyContent: "center"}}>
                  <img src={logo} style={{width: "40px", marginRight: "5px"}}/>
                  <Typography className={classes.header}>BIRTHDAYS</Typography>
                </div>
                <div className="inputCard">
                <div className={classes.form} style={{margin: "auto 10px", padding: "10% 10%", background: "var(--surface3)", borderRadius: "10px"}}>
                  {header(["LOGIN"],classes)}
                  <TextField
                          margin="dense"
                              label="Email"
                              fullWidth
                              required
                              value={email}
                              onChange={(e) =>
                                (setemail(e.target.value), setHelperText3(" "))
                                }
                              helperText={helperText3}
                              />
                  <TextField
                          margin="dense"
                              label="Password"
                              type="password"
                              fullWidth
                              required
                              value={password}
                              onChange={(e) =>
                                (setpassword(e.target.value), setHelperText4(" "))
                                }
                              helperText=" "
                              />
                  <Button variant="contained" onClick={handleSignIn} style={{width: "45%", marginBottom: "10px"}}>
                  SignIn
                            </Button>
                  <Typography onClick={()=>(setregister(true), resetHelperTexts())}>Didn't have an account? Signup</Typography>
                  </div>
                  </div>
                {/* <h1>Login</h1>
                <input type="text" onChange={(e)=>setemail(e.target.value)} value={email} placeholder="Email"/>
                <input type="password" onChange={(e)=>setpassword(e.target.value)} value={password} placeholder="Password"/>
                <button onClick={handleSignIn}>SignIn</button>
                <button onClick={()=>setregister(true)}>Create an account</button> */}
                </>)
            }
        </div>}
        
    </div>
  )
}

export default Login