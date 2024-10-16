import {Tabs} from "flowbite-react";
import { CiBoxList } from "react-icons/ci";
import { FaChartSimple } from "react-icons/fa6";
import UserList from "./UserList.jsx";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import Insights from "./Insights.jsx";
const EventDetails = () => {

    const user = useSelector(state => state.user);
    const { id , date  } = useParams();
    const Isold = new Date() > new Date(date);
    const [data, setData] = useState()
    const [Users, setUsers] = useState([])
    const [Userloader, setUserloader] = useState(true)
    useEffect(() => {
        fetch(`https://eventify-backend-beryl.vercel.app/api/event/users/${id}`,{
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        }).then(res => {
            res.json().then(data => {
                setUsers(data.Users)
                setUserloader(false)
            })
        })
        // fetch(`https://eventify-backend-beryl.vercel.app/api/event/accepted/${id}`,{
        //     method: "GET",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Authorization': `Bearer ${user.token}`
        //     }
        // }).then((res) => {
        //     res.json().then((data) => {
        //         setRegistered(data.registeredUsers)
        //
        //         data.attendedUsers.filter((user) => {
        //             setAccepted(prevState => [...prevState, user.email])
        //         })
        //         setListLoader(false)
        //     })
        // })
    }, []);

    return (
        <>
            <Tabs aria-label="Tabs with underline" style="underline">
                <Tabs.Item active title="User List" icon={CiBoxList}>
                    <UserList Users={Users} loader={Userloader} setUsers={setUsers} Isold={Isold} />
                </Tabs.Item>
                <Tabs.Item title="Insights" icon={FaChartSimple}>
                    <Insights   Users={Users}  />
                </Tabs.Item>
            </Tabs>
        </>
    )
}

export default EventDetails;