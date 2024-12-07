// import './App.css';
import { useState } from "react";
import Chat from "./Component/Chat";
import UserRegistration from "./Component/UserRegistration";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
const App = () => {
    const [userdata,setUserData] = useState({
        dp:'',
        username:''
    })
    return(
        <>
        <Router>
            <Routes>
                <Route path="/" element={<UserRegistration/>}></Route>
                <Route path="/Chat" element={<Chat/>}></Route>
            </Routes>
        </Router>
        </>
    )
};


export default App;
