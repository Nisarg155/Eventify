import {Tabs} from "flowbite-react";

import {FaRegUser} from "react-icons/fa";
import {PiUserListBold} from "react-icons/pi";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import Members from "./Members.jsx";
import UsersList from "./UsersList.jsx";

const Users = () => {

    const [members, setMembers] = useState([])
    const [memberloader, setMemberloader] = useState(true)
    const [usersloader, setUsersloader] = useState(true)
    let userfetchRef = useRef(null), memberfetchRef = useRef(null);
    const [users, setUsers] = useState([])
    const user = useSelector(state => state.user);
    useEffect(() => {
        memberfetchRef.current = () => {
            const members = fetch(`https://eventify-backend-beryl.vercel.app/api/member/members/${user.email}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })

            members.then(res => {
                res.json().then(data => {
                    setMembers(data.members)
                    setMemberloader(false)
                })
            })
        }

        userfetchRef.current = () => {
            const users = fetch(`https://eventify-backend-beryl.vercel.app/api/member/users`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            })

            users.then(res => {
                res.json().then(data => {
                    setUsers(data)
                    setUsersloader(false)
                })
            })
        }
        memberfetchRef.current();
        userfetchRef.current();
    }, []);

    return (
        <>
            <Tabs aria-label="Tabs with underline" style="underline">
                <Tabs.Item active title="Members" icon={FaRegUser}>
                    <Members members={members} setMembers={setMembers}  fetchUser={userfetchRef} loader={memberloader}/>
                </Tabs.Item>
                <Tabs.Item title="Users" icon={PiUserListBold}>
                    <UsersList users={users} setUsers={setUsers} fetchMember={memberfetchRef} loader={usersloader}/>
                </Tabs.Item>
            </Tabs>
        </>
    )
}

export default Users;