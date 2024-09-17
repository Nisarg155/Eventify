"use client";
import {useState} from "react";
import {Button, Card, Modal} from "flowbite-react";
import {HiPlus} from "react-icons/hi";
import {CreateEventPopUp} from "../../components/popup-modal/CreateEvent.jsx";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {MagnifyingGlass} from "react-loader-spinner";

const Current_Evetns = (props) => {
    // eslint-disable-next-line react/prop-types
    const events = props.newEvents;
    const [CreateModal, setCreateModal] = useState(false)
    const user = useSelector(state => state.user)
    const access_level = user.access_level

    const delete_event = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/event/delete/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                    'Accept': 'application/json',
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
            const res = await fetch(`http://localhost:5000/api/event/create`, {
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
                <div className="flex flex-wrap   justify-end">
                    <Button gradientMonochrome="info" pill className={'lg:mr-40 mr-8 shadow'} onClick={
                        () => {
                            setCreateModal(true)
                        }
                    }>
                        <HiPlus className="mr-2 h-5 w-5"/> <b style={{fontSize: 'medium'}}>Create</b>
                    </Button>
                </div>

            {
                // eslint-disable-next-line react/prop-types
                !props.loader ?
                    <div className={'p-6 flex-wrap flex justify-start align-items-stretch  gap-4'}>
                        {/* eslint-disable-next-line react/prop-types */}
                        {events.map((event, index) => (
                            <Card className="max-w-sm shadow-md shadow-cyan-700  w-full sm:mb-2 mb-3 "
                                  style={{borderRadius: '15px'}} key={index}>

                                <h5 className="text-2xl font-bold tracking-tight text-cyan-600 dark:text-white">
                                    {
                                        event.name
                                    }
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    {
                                        event.description
                                    }
                                </p>
                                <div className="flex flex-wrap justify-end">
                                    <Button color={'success'} className={'mr-2'} style={{borderRadius: '10px'}}>
                                        Edit
                                    </Button>
                                    <Button color={'failure'} className={'mr-2'} style={{borderRadius: '10px'}}
                                            onClick={() => {
                                                delete_event(event._id, index)
                                            }}>
                                        Delete
                                    </Button>
                                    <Button style={{borderRadius: '10px'}}>
                                        Details
                                    </Button>
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
        </>
    )
}

export default Current_Evetns;