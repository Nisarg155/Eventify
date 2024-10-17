import {MagnifyingGlass} from "react-loader-spinner";
import {Button, Table, TextInput} from "flowbite-react";
import {useSelector} from "react-redux";
import {FaUserSlash} from "react-icons/fa";
import empty from '../assets/No-Search-Results-Found-1--Streamline-Bruxelles.png'
import {useEffect, useState} from "react";


const Members = (props) => {

    // eslint-disable-next-line react/prop-types
    const members = props.members;
    const user = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(members);

    useEffect(() => {
        const lowercasedFilter = searchTerm.toLowerCase();
        // eslint-disable-next-line react/prop-types
        const filteredData = members.filter(user =>
            user.name.toLowerCase().includes(lowercasedFilter) ||
            user.email.toLowerCase().includes(lowercasedFilter)
        );
        setFilteredUsers(filteredData);
    }, [searchTerm, members]);

    const remove_member = async (email, name) => {
        await fetch(`https://eventify-backend-beryl.vercel.app/api/member/remove/${user.email}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                email: email,
                name: name
            })
        }).then((response) => {
            response.json().then((data) => {
                // eslint-disable-next-line react/prop-types
                props.setMembers(data)
                // eslint-disable-next-line react/prop-types
                props.fetchUser.current();
            })
        })
    }
    return (
        <>
            <div className={'container overflow-y-auto'}>
                <div className="flex flex-wrap   justify-end">
                    <TextInput

                        placeholder="Search by name or email"
                        value={searchTerm}
                        style={{borderRadius: 10}}
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
                                    Remove
                                </Table.HeadCell>

                            </Table.Head>
                            <Table.Body className={'divide-y'}>
                                {// eslint-disable-next-line react/prop-types
                                    filteredUsers.map((member) => (
                                        <Table.Row key={member.email}>
                                            <Table.Cell className={'font-medium'}>
                                                <b>
                                                    {member.name}<br/>
                                                    {member.email}
                                                </b>
                                            </Table.Cell>
                                            <Table.Cell className={'font-medium'}>
                                                <Button gradientMonochrome="failure" className={'shadow'}
                                                        onClick={() => {
                                                            remove_member(member.email, member.name)
                                                        }}
                                                        style={{borderRadius: 10}}>
                                                    <FaUserSlash className={' h-4 w-4'}/>
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>))}
                            </Table.Body>
                        </Table>
                    </div>}
                {
                    !props.loader && filteredUsers.length === 0 ? <div className='d-flex justify-content-center'>
                            <img src={empty} height={400} width={400} alt="empty"/>
                        </div>
                        : null
                }

            </div>
        </>
    )
}

export default Members;