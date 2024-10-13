import {Badge, Button, Table} from "flowbite-react";
import {useState} from "react";
import {MagnifyingGlass} from "react-loader-spinner";
import {HiCheck} from "react-icons/hi";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import { RxCross1 } from "react-icons/rx";


const UserList = (props) => {
    // eslint-disable-next-line react/prop-types
    const registered = props.registered
    console.log(registered)
    // eslint-disable-next-line react/prop-types
    const IsOld = props.Isold;
    // eslint-disable-next-line react/prop-types
    const accepted = new Set(props.accepted);
    const User = useSelector((state) => state.user);
    const {id} = useParams();

    const check_in = async (data) => {
        await fetch(`http://localhost:5000/api/event/registration/accept/`, {
            method: "PATCH", headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${User.token}`,
                'Content-Type': 'application/json',
            }, body: JSON.stringify(data)
        }).then((response) => {
            response.json().then((data) => {
            })
        })
    }


    return (<>
            <div className={'container overflow-y-auto'}>

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
                                    registered.map((user, index) => (<Table.Row key={index}>
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
                                                {accepted.has(user.email) ? <div className="flex flex-wrap ">
                                                    <Badge icon={HiCheck}
                                                           className={'shadow-md font-medium'}

                                                           color={'green'}>
                                                        <b>Checked in</b>
                                                    </Badge>
                                                </div> : IsOld ? <div className="flex flex-wrap ">
                                                    <Badge icon={RxCross1}
                                                           className={'shadow-md font-medium'}

                                                           color={'failure' }>
                                                        <b>Not Attended </b>
                                                    </Badge>
                                                </div> : <Button gradientMonochrome="success"
                                                                 style={{borderRadius: 10}} onClick={() => {
                                                    const data = {
                                                        email: user.email,
                                                        name: user.name,
                                                        branch: user.branch,
                                                        sem: user.sem,
                                                        eventId: id,
                                                    }
                                                    check_in(data)
                                                }}>
                                                    Check In
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