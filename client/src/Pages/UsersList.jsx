import {MagnifyingGlass} from "react-loader-spinner";
import {Badge, Button, Table, TextInput} from "flowbite-react";
import {HiCheck} from "react-icons/hi";
import { FaUserPlus } from "react-icons/fa6";
import {useSelector} from "react-redux";
import empty from '../assets/No-Search-Results-Found-1--Streamline-Bruxelles.png'
import {useEffect, useState} from "react";


const UsersList = (props) => {
    // eslint-disable-next-line react/prop-types
    const users = props.users;
    const user = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);


    const add_member =async  (email,name) => {
        await fetch(`https://eventify-backend-beryl.vercel.app/api/member/add/${user.email}`,{
            method:"post",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                name:name,
                email:email,
            }),
        }).then((data) => {
            data.json().then((res) => {
                // eslint-disable-next-line react/prop-types
                props.setUsers(res);
                // eslint-disable-next-line react/prop-types
                props.fetchMember.current();
            })
        })
    }

    useEffect(() => {
        const lowercasedFilter = searchTerm.toLowerCase();
        // eslint-disable-next-line react/prop-types
        const filteredData = users.filter(user =>
            user.name.toLowerCase().includes(lowercasedFilter) ||
            user.email.toLowerCase().includes(lowercasedFilter)
        );
        setFilteredUsers(filteredData);
    }, [searchTerm, users]);

    return (
        <>
            <div className={'container overflow-y-auto'}>
                <div className="flex flex-wrap   justify-end">
                    <TextInput

                        placeholder="Search by name or email"
                        value={searchTerm}
                        style={{borderRadius:10}}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="mb-4 mr-8 w-1/2 mt-1"
                    />

                </div>

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
                                    Status
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className={'divide-y'}>
                                {// eslint-disable-next-line react/prop-types
                                    filteredUsers.map((user) => (
                                        <Table.Row key={user.email}>
                                            <Table.Cell className={'font-medium'}>
                                                <b>
                                                    {user.name}<br/>
                                                    {user.email}
                                                </b>
                                            </Table.Cell>
                                            <Table.Cell className={'font-medium'}>
                                                {user.role === 'Member' ? <div className="flex flex-wrap ">
                                                    <Badge icon={HiCheck}
                                                           className={'shadow-md font-medium'}

                                                           color={'green'}>
                                                        <b>Member</b>
                                                    </Badge>
                                                </div> : <Button gradientMonochrome="success" onClick={() => {
                                                    add_member(user.email,user.name)
                                                }}
                                                                 style={{borderRadius: 10}}  className={'shadow'}>
                                                    <FaUserPlus className={'h-5 w-4'}/>
                                                </Button>}
                                            </Table.Cell>
                                        </Table.Row>))}
                            </Table.Body>
                        </Table>
                    </div>}
                {
                   !props.loader &&  filteredUsers.length === 0 ?
                        <div className='d-flex justify-content-center'>
                            <img src={empty} height={400} width={400} alt="empty"/>
                        </div>
                        : null
                }

            </div>
        </>
    )
}

export default UsersList;