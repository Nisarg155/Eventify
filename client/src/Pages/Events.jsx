import {Tabs} from "flowbite-react";
import {MdEventAvailable} from "react-icons/md";
import {FaHistory} from "react-icons/fa";
import {useSelector} from "react-redux";
import Current_Evetns from "./Current_Evetns.jsx";
import {useEffect, useRef, useState} from "react";
import Old_Events from "./Old_Events.jsx";

const Events = () => {
    const [newEvents, setNewEvents] = useState([])
    const [oldEvents, setOldEvents] = useState([])
    const [events, setEvents] = useState([])
    const [new_event_loader, setNew_event_loader] = useState(true)
    const [old_event_loader, setOld_event_loader] = useState(true)
    const old_Event_Ref = useRef(null)
    useEffect(() => {
        const todays_date = new Date().toISOString().slice(0, 10);
        const new_events = fetch(`http://localhost:5000/api/event/new/${todays_date}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        new_events.then(res => {
            res.json().then((data) => {
                setEvents(data);
                setNew_event_loader(false)
                console.log(data)
            })
        })
        old_Event_Ref.current = () => {
            const old_events = fetch(`http://localhost:5000/api/event/old/${todays_date}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })

            old_events.then(res => {
                res.json().then((data) => {
                    setOldEvents(data);
                    setOld_event_loader(false)
                })
            })
        }

        old_Event_Ref.current()
    }, []);




    const user = useSelector((state) => state.user);
    const access_level = user ? user.access_level : null;

    return (
        <>
            <Tabs aria-label="Tabs with underline" style="underline">
                <Tabs.Item active title="Events" icon={MdEventAvailable}>
                    <Current_Evetns newEvents={events}  setNewEvents={setEvents}  loader={new_event_loader}  />
                </Tabs.Item>
                <Tabs.Item title="History" icon={FaHistory}>
                    <Old_Events oldEvents={oldEvents} loader={old_event_loader}/>
                </Tabs.Item>
            </Tabs>
        </>
    )
}

export default Events;