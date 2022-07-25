import React from 'react'
import './Checkbox.css'
import { ReactComponent as MoonIcon } from "./icons/moon.svg";
import { ReactComponent as SunIcon } from "./icons/sun.svg";

const Checkbox = (props) => {

  const doc = document.firstElementChild;
  const [value, setvalue] = React.useState(props.theme ? props.theme : "light")

  const toggleFunction = (e) => {
    if(e.target.checked){
      setvalue("dark")
    }else{
      setvalue("light")
    }
  }

  React.useEffect(() => {
    doc.setAttribute('color-scheme', value)
    localStorage.setItem("SelectedTheme", value);
    // if(value === "light"){
    //   doc.style.backgroundColor = "red";
    // }else{
    //   doc.style.backgroundColor = "blue";
    // }
  }, [value])
  

  return (
    <div className="Checkbox" style={{display: "flex"}}>
      <div className='CheckboxDiv'>
        <label className="switch" id="switch">
          {props.theme === "dark" ?
          <input type="checkbox" id="checkbox" defaultChecked value={value} onChange={(e) => toggleFunction(e)}/> 
          :
          <input type="checkbox" id="checkbox" value={value} onChange={(e) => toggleFunction(e)}/> 
          }
          <span className="slider round">
            <SunIcon className='sunIcon'/>
            <MoonIcon className='moonIcon'/>
          </span>
        </label>
      </div>
    </div>
  )
}

export default Checkbox