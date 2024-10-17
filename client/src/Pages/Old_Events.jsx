"use client";

import {Badge, Button, Card, Modal} from "flowbite-react";
import {useSelector} from "react-redux";
import {MagnifyingGlass} from "react-loader-spinner";
import {useNavigate} from "react-router-dom";
import empty from '../assets/No-Search-Results-Found-1--Streamline-Bruxelles.png'
import {HiCheck} from "react-icons/hi";
import {BiCheckDouble} from "react-icons/bi";
import {useEffect, useState} from "react";

const Old_Events = (props) => {
    // eslint-disable-next-line react/prop-types
    const events = props.oldEvents;
    const user = useSelector(state => state.user)
    const access_level = user.access_level
    const navigation = useNavigate();
    const todays_date = new Date().toISOString().slice(0, 10);
    const [AttendedEvents, setAttendedEvents] = useState(new Map())
    const [RegisteredEvents, setRegisteredEvents] = useState(new Map())
    const [DetailModal, setDetailModal] = useState(false)
    const [Details, setDetails] = useState(null)


    useEffect(() => {
        if (access_level === 'Guest') {
            fetch(`https://eventify-backend-beryl.vercel.app/api/event/registered/old/${user.email}/${todays_date}`, {
                method: "GET", headers: {
                    'Accept': 'application/json', 'Authorization': `Bearer ${user.token}`
                }
            }).then((res) => {
                res.json().then((data) => {
                    // data.forEach((item) => {
                    //     setRegisteredEvents(prevState => new Map(prevState.set(item._id,1)))
                    // })
                    const newRegisteredEvents = new Map(); // Create a new Map instance
                    const newAttendedEvents = new Map();
                    console.log()
                    data.registeredIds.forEach(item => {
                        newRegisteredEvents.set(item._id, 1); // Add items to the new Map
                    });
                    data.attendedIds.forEach(item => {
                        newAttendedEvents.set(item._id, 1)
                    })
                    setRegisteredEvents(newRegisteredEvents)
                    setAttendedEvents(newAttendedEvents)
                })
            })
        }
    }, []);


    return (<>

        {/*Details Modal*/}
        <Modal dismissible size={"md"} show={DetailModal} onClose={() => setDetailModal(false)} popup>
            <Modal.Header>Event Details </Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        <b>Name</b> :- {Details && Details.name} <br/>
                        <b>Description</b> :- {Details && Details.description} <br/>
                        <b>location</b> :- {Details && Details.location} <br/>
                        <b>Date</b>:- {Details && new Date(Details.date).toLocaleDateString()} <br/>
                        <b>Time </b>:- {Details && Details.time} <br/>
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                {/*<Button onClick={() => setDetailModal(false)}>Register</Button>*/}
                <Button color="failure" style={{borderRadius:10}} onClick={() => setDetailModal(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>


        {!props.loader ? <div className={'p-6 flex-wrap flex justify-start align-items-stretch  gap-4'}>
            {// eslint-disable-next-line react/prop-types
                events.map((event, index) => (
                    <Card className="max-w-sm shadow-md shadow-cyan-700  w-full sm:mb-2 mb-3 "
                          style={{borderRadius: '15px'}} key={index}>

                        <div className={'flex flex-wrap justify-between'}>
                            <h5 className="text-2xl font-bold tracking-tight text-cyan-600 dark:text-white">
                                {event.name}
                            </h5>
                            <div className={'flex-wrap flex gap-2'}>
                                {access_level === 'Guest' && RegisteredEvents.has(event._id) ?
                                    <Badge icon={HiCheck} className={'shadow-md font-medium'}

                                           color={'green'}>
                                        <b>Registered</b>
                                    </Badge> : null}
                                {access_level === 'Guest' && AttendedEvents.has(event._id) ?
                                    <Badge icon={BiCheckDouble} className={'shadow-md font-medium'}

                                           color={'blue'}>
                                        <b>Attended</b>
                                    </Badge> : null}
                            </div>
                        </div>

                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {event.description}
                        </p>

                        <div className={'flex flex-wrap justify-end gap-2'}>
                            {(access_level === 'Administrator' || access_level === 'Member') ?
                                <div className="flex flex-wrap justify-end">
                                    <Button style={{borderRadius: '10px'}} className={'shadow'}
                                            onClick={() => {
                                                navigation(`/eventDetails/${event._id}/${event.date.slice(0, 10)}`)
                                            }}>
                                        Details
                                    </Button>
                                </div> : null}
                            {access_level === 'Guest' ?
                                <Button style={{borderRadius: '10px'}} className={'shadow'} onClick={() => {
                                    setDetailModal(true)
                                    setDetails(event)
                                }}>
                                    Details
                                </Button>

                                : null}
                        </div>

                    </Card>))}
        </div> : <div className={'flex flex-col -mt-40 justify-center items-center h-screen '}>
            <MagnifyingGlass
                visible={true}
                height="150"
                width="150"
                ariaLabel="magnifying-glass-loading"
                wrapperStyle={{}}
                wrapperClass="magnifying-glass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
            />
        </div>

        }

        {
           !props.loader &&  events.length === 0 ? <div className='d-flex justify-content-center'>
            <img src={empty} height={400} width={400} alt="empty"/>
        </div> : null}


    </>)
}

export default Old_Events;

