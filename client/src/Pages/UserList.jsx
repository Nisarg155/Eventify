import {Badge, Button, Modal, ModalBody, ModalHeader, Table} from "flowbite-react";
import {useRef, useState} from "react";
import {MagnifyingGlass} from "react-loader-spinner";
import {HiCheck, HiPlus} from "react-icons/hi";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {RxCross1} from "react-icons/rx";
import {FaUserPlus} from "react-icons/fa6";
import {BsQrCodeScan} from "react-icons/bs";
import QrReader from "./QrScanner.jsx";


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

    // const handleScan = (data) => {
    //     console.log(data)
    //     setScanEnabled(false)
    // }
    //
    // const handleError = (err) => {
    //     console.log(err)
    //     setScanEnabled(false)
    // }


    return (<>
        <div className={'container overflow-y-auto'}>
            {
                access_level === 'Administrator' || access_level === 'Member' ?
                    <div className="flex flex-wrap   justify-end">
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
                <ModalHeader />
                <ModalBody>
                    <QrReader  setQrData={setQrData}  />
                </ModalBody>
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

        </div>
    </>)
}

export default UserList;