import { onValue, ref } from 'firebase/database'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { AnimatePresence, motion, LayoutGroup } from "framer-motion"
import "./BirthdayDashboard.css";
import BottomNav from './BottomNav/BottomNav'

const BirthdayDashboard = () => {

    const [selectedId, setSelectedId] = React.useState(null)

    const date = new Date()
    let next = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    let previous = new Date(date.getFullYear(), date.getMonth(), date.getDate()-1)
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]
    const [allBirthdays, setallBirthdays] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const format = (d) => {
        return [`${d.getDate()}`, months[d.getMonth()]]
    }

    const navigate = useNavigate()

    React.useEffect(() => {
        let isCancelled = false;
        
        auth.onAuthStateChanged((user) => {
          
            if (user) {
                onValue(ref(db, `/${auth.currentUser.uid}/BirthdayList`), (snapshot) => {
                    if (!isCancelled) {
                setallBirthdays([]);
                const data = snapshot.val();
                if (data !== null) {
                    Object.values(data).map((birthdaylist) => {
                    setallBirthdays((oldArray) => [...oldArray, birthdaylist]);
                    });
                }
                setLoading(false)
            }
                });
            } else if (!user) {
                navigate("/");
            }
        });
    return () => {
      isCancelled = true;
      setallBirthdays([]);
      setLoading(true)
    };
      }, []);

      const [birthdaysToday, setBirthdaysToday] = React.useState([])
      const [birthdaysYesterday, setBirthdaysYesterday] = React.useState([])
      const [birthdaysNextWeek, setBirthdaysNextWeek] = React.useState([])
      const [birthdaysNextMonth, setBirthdaysNextMonth] = React.useState([])

      const getBirthdays = (birthdayTimeline, setbirthdayTimeline, timeline) => {
        let birthdayTimelineCopy = [...birthdayTimeline]
            for (let i=0; i<timeline; i++) {
                next = new Date(next.getFullYear(), next.getMonth(), next.getDate()+1)
                allBirthdays.filter((birthday) => birthday.day && birthday.day == format(next)[0] && birthday.month && birthday.month == format(next)[1]).map((value) => {
                    if (birthdayTimelineCopy.indexOf(value) === -1) {
                        birthdayTimelineCopy = birthdayTimelineCopy.concat([value])
                    }
                })
            }
            next = new Date(date.getFullYear(), date.getMonth(), date.getDate())
            setbirthdayTimeline(birthdayTimelineCopy)
      }

      React.useEffect(() => {
        let isCancelled = false;
          if (!isCancelled) {
        setBirthdaysToday([])
        setBirthdaysNextWeek([])
        setBirthdaysNextMonth([])
        setBirthdaysYesterday([])
        if (allBirthdays.length !== 0) {
            setBirthdaysToday(allBirthdays.filter((birthday) => birthday.day && birthday.day == format(next)[0] && birthday.month && birthday.month == format(next)[1]))
            setBirthdaysYesterday(allBirthdays.filter((birthday) => birthday.day && birthday.day == format(previous)[0] && birthday.month && birthday.month == format(previous)[1]))
            getBirthdays(birthdaysNextWeek, setBirthdaysNextWeek, 7)
            getBirthdays(birthdaysNextMonth, setBirthdaysNextMonth, 30)
        }
    }
        return () => {
            isCancelled = true;
            setBirthdaysToday([])
            setBirthdaysNextWeek([])
            setBirthdaysNextMonth([])
            setBirthdaysYesterday([])
          };
      }, [allBirthdays]);

      const items = {
        "Today": [birthdaysToday, "Today"],
        "Missed Yesterday": [birthdaysYesterday, "Yesterday"],
        "Next 1 Week": [birthdaysNextWeek, "Next 1 Week"],
        "Next 1 Month": [birthdaysNextMonth, "Next 1 Month"]
      }


      function Item(props) {
        const [isOpen, setIsOpen] = React.useState(true);

        const toggleOpen = () => setIsOpen(!isOpen);

        return (
          <motion.li layout onClick={toggleOpen} initial={{ borderRadius: 10 }}>
            <motion.div className='DashboardHeadings'>
            <motion.span>{props.name}</motion.span>
            <NavLink to={"/BirthdayList"}>
                <motion.span>View All</motion.span>
            </NavLink>
            </motion.div>
            <AnimatePresence>{isOpen && <Content name={props.name}/>}</AnimatePresence>
          </motion.li>
        );
      }
      
      function Content(props) {
        return (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='DashboardContent'
          >
            {items[props.name][0].length > 0 ? items[props.name][0].map((birthday, index) => {
            return (
                <motion.div key={index} style={{width: "100%", justifyContent: "flex-start", display: "flex"}}>
                <motion.span>{birthday.day}&nbsp;</motion.span>
                <motion.span> {birthday.month} -&nbsp;</motion.span>
                <motion.span> {birthday.name}</motion.span>
                </motion.div>
            )
        }) : <motion.div className='NoContent'>No Birthdays {items[props.name][1]}</motion.div>}
          </motion.div>
        );
      }

    return (
        <div>
            {loading ?
            <span>Loading...</span>:
            <div>
                <BottomNav />
                <h3>BIRTHDAYS</h3>
                <LayoutGroup>
                <motion.ul layout initial={{ borderRadius: 25 }}>
                    {Object.keys(items).map(key => (
                    <Item key={key} name={key}/>
                    ))}
                </motion.ul>
                </LayoutGroup>

{/* {Object.keys(items).map((key) => (
      <motion.div layoutId={key} onClick={() => setSelectedId(key)}>
        <motion.h5>{key}</motion.h5>
        <NavLink to={"/BirthdayList"}>
            <motion.span>View All</motion.span>
        </NavLink>
        {items[key][0].length > 0 ? items[key][0].map((birthday, index) => {
            return (
                <motion.div key={index}>
                <motion.span>{birthday.day} </motion.span>
                <motion.span>{birthday.month} - </motion.span>
                <motion.span>{birthday.name}</motion.span>
                </motion.div>
            )
        }) : <motion.span>No Birthdays {items[key][1]}</motion.span>}
      </motion.div>
    ))}
    
    <AnimatePresence>
      {selectedId && (
        <motion.div layoutId={selectedId}>
          <motion.h5>{selectedId}</motion.h5>
        <NavLink to={"/BirthdayList"}>
            <motion.span>View All</motion.span>
        </NavLink>
        {items[selectedId][0].length > 0 ? items[selectedId][0].map((birthday, index) => {
            return (
                <motion.div key={index}>
                <motion.span>{birthday.day} </motion.span>
                <motion.span>{birthday.month} - </motion.span>
                <motion.span>{birthday.name}</motion.span>
                </motion.div>
            )
        }) : <motion.span>No Birthdays {items[selectedId][1]}</motion.span>}
          <motion.button onClick={() => setSelectedId(null)} >Close</motion.button>
        </motion.div>
      )}
    </AnimatePresence> */}

            {/* <div>
                <h5>Today</h5>
                <NavLink to={"/BirthdayList"}>
                <span>View All</span>
                </NavLink>
                {birthdaysToday.length > 0 ? birthdaysToday.map((birthday, index) => {
                    return (
                        <div key={index}>
                        <span>{birthday.day} </span>
                        <span>{birthday.month} - </span>
                        <span>{birthday.name}</span>
                        </div>
                    )
                }) : <span>No Birthdays Today</span>}
            </div>
            <div>
                <h5>Missed Yesterday</h5>
                <NavLink to={"/BirthdayList"}>
                <span>View All</span>
                </NavLink>
                {birthdaysYesterday.length > 0 ? birthdaysYesterday.map((birthday, index) => {
                    return (
                        <div key={index}>
                        <span>{birthday.day} </span>
                        <span>{birthday.month} - </span>
                        <span>{birthday.name}</span>
                        </div>
                    )
                }) : <span>No Birthdays Yesterday</span>}
            </div>
            <div>
                <h5>Next 1 Week</h5>
                <NavLink to={"/BirthdayList"}>
                <span>View All</span>
                </NavLink>
                {birthdaysNextWeek.length > 0 ? birthdaysNextWeek.map((birthday, index) => {
                    return (
                        <div key={index}>
                        <span>{birthday.day} </span>
                        <span>{birthday.month} - </span>
                        <span>{birthday.name}</span>
                        </div>
                    )
                }) : <span>No Birthdays for Next 1 Week</span>}
            </div>
            <div>
                <h5>Next 1 Month</h5>
                <NavLink to={"/BirthdayList"}>
                <span>View All</span>
                </NavLink>
                {birthdaysNextMonth.length > 0 ? birthdaysNextMonth.map((birthday, index) => {
                    return (
                        <div key={index}>
                        <span>{birthday.day} </span>
                        <span>{birthday.month} - </span>
                        <span>{birthday.name}</span>
                        </div>
                    )
                }) : <span>No Birthdays for Next 1 Month</span>}
            </div> */}
            </div>
            }
        </div>
    )
}

export default BirthdayDashboard