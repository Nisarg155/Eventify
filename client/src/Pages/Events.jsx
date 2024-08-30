import {Tabs} from "flowbite-react";
import { MdEventAvailable } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import {useSelector} from "react-redux";
import Current_Evetns from "./Admin/Current_Evetns.jsx";
import {useEffect, useState} from "react";

const Events = () => {
    const [newEvents, setNewEvents] = useState([])
    const [oldEvents, setOldEvents] = useState([])
    const [new_event_loader, setNew_event_loader] = useState(true)
    const [old_event_loader, setOld_event_loader] = useState(true)
    useEffect(() => {
        const todays_date = new Date().toISOString().slice(0,10);
        const new_events = fetch(`https://eventify-backend-beryl.vercel.app/api/event/new/${todays_date}`,{
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        new_events.then(res=>{
            res.json().then((data) => {
                setNewEvents(data);
                setNew_event_loader(false)
            })
        })
    }, []);
    const user = useSelector((state) => state.user);
    const access_level = user ? user.access_level : null;

    return (
        <>
            <Tabs aria-label="Tabs with underline"  style="underline">
                <Tabs.Item active title="Events" icon={MdEventAvailable}>
                    {
                        access_level === 'Administrator' && (
                            <Current_Evetns newEvents={newEvents} setNewEvents={setNewEvents} loaderr={new_event_loader}  />
                        )
                    }
                </Tabs.Item>
                <Tabs.Item title="History" icon={FaHistory}>

                </Tabs.Item>
            </Tabs>
        </>
    )
}

export default Events;