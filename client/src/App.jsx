import './App.css';
import Nav_Bar from "./components/Navbar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useState } from "react";
// import UserContext from "./components/user_context.jsx";
// import Home from "./Pages/Home.jsx";
// import Profile from "./Pages/Profile.jsx"; // Import your Profile component here

function App() {
    const userState = useState(null); // Using array destructuring to get the state and setter function

    return (
        <>
            <BrowserRouter>
                    <Nav_Bar />
                    {/*<Routes>*/}
                    {/*    <Route path="/" element={<Home />} />*/}
                    {/*    <Route path="/Profile" element={<Profile />} />*/}
                    {/*</Routes>*/}
            </BrowserRouter>

        </>
    );
}

export default App;
