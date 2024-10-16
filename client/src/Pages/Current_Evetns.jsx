"use client";
import {useEffect,  useState} from "react";
import {Button, Card, Modal, Badge, Label} from "flowbite-react";
import {HiCheck, HiPlus} from "react-icons/hi";
import {CreateEventPopUp} from "../components/popup-modal/CreateEvent.jsx";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {MagnifyingGlass} from "react-loader-spinner";
import QRCode from 'qrcode';
import {useNavigate} from "react-router-dom";
import {BiCheckDouble} from "react-icons/bi";
import empty from '../assets/No-Search-Results-Found-1--Streamline-Bruxelles.png'



const Current_Evetns = (props) => {
    // eslint-disable-next-line react/prop-types
    const events = props.newEvents;
    const [CreateModal, setCreateModal] = useState(false)
    const [DetailModal, setDetailModal] = useState(false)
    const [Details, setDetails] = useState(null)
    const [QRModal, setQRModal] = useState(false)
    const [semModal, setSemModal] = useState(false)
    const [semEventDetails, setSemEventDetails] = useState(null)
    const [RegisteredEvents, setRegisteredEvents] = useState(new Map())
    const [AttendedEvents, setAttendedEvents] = useState(new Map())
    const user = useSelector(state => state.user)
    const access_level = user.access_level
    const navigation = useNavigate();
    const todays_date = new Date().toISOString().slice(0, 10);


    useEffect(() => {
        if (access_level === 'Guest') {
            fetch(`https://eventify-backend-beryl.vercel.app/api/event/registered/${user.email}/${todays_date}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${user.token}`
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


    const register = async (sem, _id) => {
        const res = await fetch(`https://eventify-backend-beryl.vercel.app/api/event/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                email: user.email,
                name: user.name,
                sem: sem,
                branch: user.branch,
                eventId: _id
            })
        })
        if (res.status === 200) {
            res.json().then((data) => {

                // data.forEach((item) => {
                //     setRegisteredEvents(prevState => new Map(prevState.set(item,1)))
                // })
                setRegisteredEvents(prevState => {
                    const newRegisteredEvents = new Map(prevState); // Create a new Map instance
                    newRegisteredEvents.set(data._id, 1); // Update the new Map

                    return newRegisteredEvents; // Return the new Map
                });
                setSemModal(false)
                setSemEventDetails(null)
                // // eslint-disable-next-line react/prop-types
                // props.newEventRef.current()


            })
        } else {
            console.log('error')
        }
    }

    const delete_event = async (id,name) => {
        try {
            const res = await fetch(`https://eventify-backend-beryl.vercel.app/api/event/delete/${id}/${name}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })

            if (res.status === 200) {
                res.json().then(() => {
                    // eslint-disable-next-line react/prop-types
                    const eve = events.filter(e => e._id !== id)
                    // eslint-disable-next-line react/prop-types
                    props.setNewEvents(eve)
                })
            }
        } catch (e) {
            console.log(e)
            toast.error(e.message)
        }

    }


    const createEvent = async (data) => {
        try {
            const res = await fetch(`https://eventify-backend-beryl.vercel.app/api/event/create`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    name: data.name,
                    description: data.description,
                    location: data.location,
                    date: data.date,
                    time: data.time,
                    email: user.email
                }),
            })
            if (res.status === 200) {
                setCreateModal(false)
                res.json().then((data) => {
                    // eslint-disable-next-line react/prop-types
                    props.setNewEvents(prevState => {
                        return prevState.concat(data)
                    })
                })

            } else {
                setCreateModal(false)
                console.log(res.status, res.json())
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }


    return (
        <>
            {/*semester modal*/}
            <Modal show={semModal} size="md" position={'center'} onClose={() => {
                setSemModal(false)
            }} popup>
                <Modal.Header/>
                <Modal.Body>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        const formData = new FormData(event.target)
                        const sem = formData.get('sem')
                        if (sem <= 10 && sem >= 1) {
                            setSemModal(false)
                            register(sem, semEventDetails)
                        }
                    }}>
                        <Label htmlFor={'sem'} className={'mb-2'} style={{ fontSize:"medium" }}><b>Semester</b></Label><br/>
                        <input className={'mb-3'} id={'sem'} name={'sem'} style={{borderRadius:10 }} type={"number"} required={true}/>
                        <Button color={'success'} style={{borderRadius: 10}} type={"submit"}>
                            Submit
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
            {/* Event Create Modal */}

            <Modal show={CreateModal} size="lg" onClose={() => {
                setCreateModal(false)
            }} popup>
                <Modal.Header/>
                <Modal.Body>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        const formData = new FormData(event.target)
                        const data = {
                            name: formData.get('name'),
                            description: formData.get('description'),
                            location: formData.get('location'),
                            date: formData.get('date'),
                            time: formData.get('time'),
                        }
                        createEvent(data);
                    }}>
                        <CreateEventPopUp/>
                    </form>

                </Modal.Body>
            </Modal>

            {/* Qr Code generator Modal */}
            <Modal show={QRModal} size="md" position={'center'} onClose={() => {
                setQRModal(false)
            }} popup>
                <Modal.Header/>
                <Modal.Body>
                    <div className={'flex-wrap flex justify-center'}>
                        {
                            Details ?
                                <img src={Details} alt={'Something Went Wrong '} width={300}/> : "Something Went Wrong "
                        }
                    </div>
                </Modal.Body>
            </Modal>

            {/*Event Details Modal  */}
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

            {
                access_level === 'Administrator' ? <div className="flex flex-wrap   justify-end">
                    <Button gradientMonochrome="info" pill className={'lg:mr-40 mr-8 shadow'} onClick={
                        () => {
                            setCreateModal(true)
                        }
                    }>
                        <HiPlus className="mr-2 h-5 w-5"/> <b style={{fontSize: 'medium'}}>Create</b>
                    </Button>
                </div> : null
            }


            {
                // eslint-disable-next-line react/prop-types
                !props.loader ?
                    <div className={'p-6 flex-wrap flex justify-start align-items-stretch  gap-4'}>
                        {/* eslint-disable-next-line react/prop-types */}
                        {events.map((event, index) => (
                            <Card className="max-w-sm shadow-md shadow-cyan-700  w-full sm:mb-2 mb-3 "
                                  style={{borderRadius: '15px'}} key={index}>

                                <div className={'flex flex-wrap justify-between'}>

                                    <h5 className="text-2xl font-bold tracking-tight text-cyan-600 dark:text-white">
                                        {
                                            event.name
                                        }
                                    </h5>
                                    <div className={'flex-wrap flex gap-2'}>
                                        {
                                            access_level === 'Guest' && RegisteredEvents.has(event._id) ?
                                                <Badge icon={HiCheck} className={'shadow-md font-medium'}

                                                       color={'green'}>
                                                    <b>Registered</b>
                                                </Badge> : null
                                        }
                                        {
                                            access_level === 'Guest' && AttendedEvents.has(event._id) ?
                                                <Badge icon={BiCheckDouble} className={'shadow-md font-medium'}

                                                       color={'blue'}>
                                                    <b>Checked-in</b>
                                                </Badge> : null
                                        }
                                    </div>
                                </div>

                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    {
                                        event.description
                                    }
                                </p>
                                <div className="flex flex-wrap justify-end gap-2">
                                    {
                                        access_level === "Administrator" ?
                                            <Button color={'failure'} className={'mr-2 shadow'}
                                                    style={{borderRadius: '10px'}}
                                                    onClick={() => {
                                                        delete_event(event._id,event.name)
                                                    }}>
                                                Delete
                                            </Button> : null
                                    }
                                    {
                                        access_level === 'Guest' && !RegisteredEvents.has(event._id) ?

                                            <Button color={'success'} className={'shadow'}
                                                    onClick={() => {
                                                        setSemModal(true)
                                                        setSemEventDetails(event._id)
                                                    }}

                                                    style={{borderRadius: '10px'}}>
                                                Register
                                            </Button>
                                            : null

                                    }
                                    {
                                        access_level === 'Guest' && RegisteredEvents.has(event._id) ?
                                            <Button color={'success'} className={'shadow'}
                                                    style={{borderRadius: '10px'}} onClick={async () => {

                                                const data = {
                                                    email: user.email,
                                                    eventId: event._id
                                                }
                                                const encoded_data = await QRCode.toDataURL(JSON.stringify(data))
                                                setDetails(encoded_data)
                                                setQRModal(true)
                                            }} disabled={AttendedEvents.has(event._id)}>
                                                Generate QR
                                            </Button> : null
                                    }
                                    {
                                        access_level === 'Guest' ?
                                            <Button style={{borderRadius: '10px'}} className={'shadow'} onClick={() => {
                                                setDetailModal(true)
                                                setDetails(event)
                                            }}>
                                                Details
                                            </Button> : null
                                    }
                                    {
                                        (access_level === 'Administrator' || access_level === 'Member') ?
                                            <Button style={{borderRadius: '10px'}} className={'shadow'} onClick={() => {
                                                navigation(`/eventDetails/${event._id}/${event.date.slice(0, 10)}`)
                                            }}>
                                                Details
                                            </Button> : null
                                    }

                                </div>

                            </Card>

                        ))
                        }
                    </div>
                    :
                    <div className={'flex flex-col -mt-40 justify-center items-center h-screen '}>
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
                events.length === 0 ?
                    <div className='d-flex justify-content-center'>
                        <img src={empty} height={400} width={400} alt="empty"/>
                    </div>
                    : null
            }
        </>
    )
}

export default Current_Evetns;