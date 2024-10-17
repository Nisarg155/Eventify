import {Badge, Button, Label, Modal, ModalBody, ModalHeader, Table, TextInput} from "flowbite-react";
import {useEffect, useRef, useState} from "react";
import {MagnifyingGlass} from "react-loader-spinner";
import {HiCheck, HiOutlineExclamationCircle, HiPlus} from "react-icons/hi";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RxCross1} from "react-icons/rx";
import {FaUserPlus} from "react-icons/fa6";
import {BsQrCodeScan} from "react-icons/bs";
import QrReader from "./QrScanner.jsx";
import empty from "../assets/No-Search-Results-Found-1--Streamline-Bruxelles.png";

import DatePicker from "react-datepicker";
import { MdModeEditOutline } from "react-icons/md";


const UserList = (props) => {
    // eslint-disable-next-line react/prop-types
    const Users = props.Users
    // eslint-disable-next-line react/prop-types
    const IsOld = props.Isold;
    // eslint-disable-next-line react/prop-types
    const User = useSelector((state) => state.user);
    const {id} = useParams();
    const access_level = User.access_level
    const [scanEnabled, setScanEnabled] = useState(false)
    const [qrData, setQrData] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [CreateModal, setCreateModal] = useState(false)
    const [EventDate, setEventDate] = useState(    new Date() )
    // eslint-disable-next-line react/prop-types
    const [name, setName] = useState( '')
    // eslint-disable-next-line react/prop-types
    const [description, setDescription] = useState(  '')
    // eslint-disable-next-line react/prop-types
    const [time, setTime] = useState('')
    // eslint-disable-next-line react/prop-types
    const [location, setLocation] = useState( '')

    const check_in = async (data) => {
        await fetch(`https://eventify-backend-beryl.vercel.app/api/event/registration/accept/`, {
            method: "PATCH", headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${User.token}`,
                'Content-Type': 'application/json',
            }, body: JSON.stringify(data)
        }).then((response) => {
            response.json().then((data) => {
                // eslint-disable-next-line react/prop-types
                props.setUsers(data.Users);
            })
        })
    }

    const update_event = async (data) => {
        setCreateModal(false)

        await fetch(`https://eventify-backend-beryl.vercel.app/api/event/edit`,{
            method: "PATCH",
            headers:{
                'Accept': 'application/json',
                'Authorization': `Bearer ${User.token}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                id:id,
                name:data.name,
                description:data.description,
                location:data.location,
                time:data.time,
                date:data.date,
            })
        }).then((res) => {
            res.json().then((data) => {
                setName(data.name)
                setTime(data.time)
                setLocation(data.location)
                setEventDate(new Date(data.date))
                setDescription(data.description)
            })
        })
    }

    useEffect(() => {
        fetch(`https://eventify-backend-beryl.vercel.app/api/event/event/${id}`,{
            method:"GET",
            headers:{
                'Accept': 'application/json',
                'Authorization': `Bearer ${User.token}`
            }
        }).then((res) => {
            res.json().then((data) => {
                setName(data.name)
                setTime(data.time)
                setLocation(data.location)
                setEventDate(new Date(data.date))
                setDescription(data.description)
            })
        })
    }, []);




    return (<>

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
                    update_event(data)
                }}>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Event Details</h3>
                        <div>
                            <div className="mb-2 block rounded ">
                                <Label htmlFor="name" value="Name"/>
                            </div>
                            <TextInput id="name" name={'name'} value={name} onChange={(event) => {
                                setName(event.target.value)
                            }} required/>
                        </div>
                        <div>
                            <div className="mb-2 block rounded ">
                                <Label htmlFor="description" value="Descripation"/>
                            </div>
                            <TextInput id="description" name={'description'} value={description} onChange={(event) => {
                                setDescription(event.target.value)
                            }} required/>
                        </div>
                        <div>
                            <div className="mb-2 block rounded ">
                                <Label htmlFor="location" value="Location"/>
                            </div>
                            <TextInput id="location" name={'location'} value={location} onChange={(event) => {
                                setLocation(event.target.value)
                            }} required/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="date" className={'font-medium'} value="Date"/>
                            </div>
                            <DatePicker selected={EventDate} id={'date'} name={'date'} dateFormat="dd/MM/yyyy"
                                        value={EventDate.getDate()  } minDate={new Date()} onChange={(date) => {
                                setEventDate(date)
                            }} required={true}/>
                            <div className="mb-2 block">
                                <Label htmlFor="time" className={'font-medium'} value="Time"/>
                            </div>
                            <input aria-label="Time" name={'time'} id={'time'} type="time" value={time}
                                   onChange={(event) => {
                                       setTime(event.target.value)
                                   }} required={true}/>
                        </div>

                        <div className="w-full"  >
                            <Button type={'submit'}>Update</Button>
                        </div>
                    </div>
                </form>

            </Modal.Body>
        </Modal>

        <div className={'container overflow-y-auto'}>
            {
                access_level === 'Administrator' || access_level === 'Member' ?
                    <div className="flex flex-wrap   justify-end">

                        <Button gradientMonochrome="info" pill className={'lg:mr-40 mr-8 mb-4 shadow'} onClick={
                            () => {
                                setCreateModal(true)
                            }
                        }>
                            <MdModeEditOutline className="mr-2 h-5 w-5"/> <b style={{fontSize: 'medium'}}>Update</b>
                        </Button>
                        <Button gradientMonochrome="info" pill className={'lg:mr-40 mr-8 mb-4 shadow'} onClick={
                            () => {
                                setScanEnabled(true)
                            }
                        }>
                            <BsQrCodeScan className="mr-2 h-5 w-5"/> <b style={{fontSize: 'medium'}}>Scan QR</b>
                        </Button>

                    </div> : null
            }
            {/*QR Scanner Component*/}
            <Modal size="lg" show={scanEnabled} position={'center'} onClose={() => setScanEnabled(false)}>
                <ModalBody>
                    <QrReader setQrData={setQrData} setScanEnabled={setScanEnabled} setOpenModal={setOpenModal}/>
                </ModalBody>
            </Modal>
            {/*User Registration Confirmation */}
            <Modal show={openModal && qrData} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle
                            className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"/>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to Check-in this User?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="success" className={'shadow'} style={{borderRadius: 10}} onClick={() => {
                                const Json_data = JSON.parse(qrData)
                                const data = {
                                    email: Json_data.email,
                                    eventId:Json_data.eventId
                                }
                                check_in(data)
                                setQrData(null)
                                setOpenModal(false)
                            }}>
                                {"Yes, I'm sure"}
                            </Button>
                            <Button color="failure" className={'shadow'} style={{borderRadius:10 }} onClick={() => {
                                setQrData(null)
                                setScanEnabled(false)
                                setOpenModal(false)
                            }}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {// eslint-disable-next-line react/prop-types
                props.loader ? <div className={'flex flex-col -mt-40 justify-center items-center h-screen '}>
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
                </div> : <div className={'overflow-x-auto drop-shadow-2xl justify-content-center'}>
                    <Table striped className={'shadow border-gray-500    rounded-lg '}>
                        <Table.Head>
                            <Table.HeadCell style={{fontSize: 'medium'}}>
                                Details
                            </Table.HeadCell>
                            <Table.HeadCell style={{fontSize: 'medium'}}>
                                Sem and Branch
                            </Table.HeadCell>
                            <Table.HeadCell style={{fontSize: 'medium'}}>
                                Status
                            </Table.HeadCell>

                        </Table.Head>
                        <Table.Body className={'divide-y'}>
                            {// eslint-disable-next-line react/prop-types
                                Users.map((user, index) => (<Table.Row key={index}>
                                    <Table.Cell className={'font-medium'}>
                                        <b>
                                            {user.name}<br/>
                                            {user.email}
                                        </b>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user.sem}<br/>
                                        {user.branch}
                                    </Table.Cell>
                                    <Table.Cell className={'font-medium'}>
                                        {user.attended ? <div className="flex flex-wrap ">
                                            <Badge icon={HiCheck}
                                                   className={'shadow-md font-medium'}

                                                   color={'green'}>
                                                <b>Checked in</b>
                                            </Badge>
                                        </div> : IsOld ? <div className="flex flex-wrap ">
                                            <Badge icon={RxCross1}
                                                   className={'shadow-md font-medium'}

                                                   color={'failure'}>
                                                <b>Not Attended </b>
                                            </Badge>
                                        </div> : <Button gradientMonochrome="success" className={'shadow'}
                                                         style={{borderRadius: 10}} onClick={() => {
                                            const data = {
                                                email: user.email,
                                                eventId: id,
                                            }
                                            check_in(data)
                                        }}>
                                            <FaUserPlus className={'w-4 h-4'}/>
                                        </Button>}
                                    </Table.Cell>
                                </Table.Row>))}
                        </Table.Body>
                    </Table>
                </div>}
            {
                Users.length === 0 ?
                    <div className='d-flex justify-content-center'>
                        <img src={empty} height={400} width={400} alt="empty"/>
                    </div>
                    : null
            }

        </div>
    </>)
}

export default UserList;