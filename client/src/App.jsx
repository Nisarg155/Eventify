import './App.css';
import Nav_Bar from "./components/Navbar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "./components/user_context.jsx";
import Home from "./Pages/Home.jsx";
import {useSelector} from "react-redux";
import Events from "./Pages/Events.jsx";
import EventDetails  from "./Pages/EventDetails.jsx";
import Users from "./Pages/Users.jsx"
// import { Analytics } from "@vercel/analytics/react"

function App() {
    const userState = useState(null); // Using array destructuring to get the state and setter function
    const user = useSelector(state => state.user);
    const access_level = user ? user.access_level : '';
    return (
        <>
            <BrowserRouter>
                <UserContext.Provider value={userState}>
                    <Nav_Bar />
                    {
                        access_level === '' && (
                            <Routes>
                                <Route path={'/'} element={<Home/> }></Route>
                            </Routes>
                        )
                    }
                    {
                        access_level === 'Administrator' && (
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path={'/events' } element={<Events />} />
                                <Route path={'/eventDetails/:id/:date'}  element={<EventDetails/>} />
                                <Route path={'/user'}  element={<Users/>} />
                            </Routes>
                        )
                    }
                    {
                        access_level === 'Guest' && (
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path={'/events'} element={<Events />} />
                                <Route path={'/eventDetails/:id/:date'} element={<EventDetails/>} />
                            </Routes>
                        )
                    }
                    {/*<Analytics/>*/}
                </UserContext.Provider>
            </BrowserRouter>

        </>
    );
}

export default App;
