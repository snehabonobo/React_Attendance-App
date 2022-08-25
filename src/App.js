import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home";
import Checkin from "./pages/Checkin";
import Login from "./pages/Login";
import React, { useState } from "react";
import {signOut} from "firebase/auth";
import {auth} from "./firebase"

function App() {
  const [isAuth, setIsAuth] = useState(false);
  

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  };


  return (
    <Router>
      <nav>
        <Link to = "/">  </Link>
        
        {!isAuth ? (<Link to = "/login"> Login </Link>
        ) :(
          <>
          <Link to = "/checkin"> Checkin </Link>
           <Link to = "/checkin"  onClick={signUserOut}>Log out</Link>
           </>
           )}
      </nav>
      <Routes>
        <Route  path="/" element={<Home/>}/>
        <Route  exact path="/checkin" element={<Checkin isAuth={isAuth} />}/>
        <Route path="/login" element={<Login setIsAuth={setIsAuth}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
