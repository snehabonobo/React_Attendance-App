import "./Checkin.css";
import React, {useState, useEffect} from "react";
import {useGeolocated} from "react-geolocated";
import {db, auth} from "../firebase";
import {addDoc, collection} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import img from "../image/imzz.png";

import swal from 'sweetalert';

const Checkin = ({isAuth}) => {
  
  const [isOp, setIsOp] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
   const [ip, setIP] = useState("");
  
  
   const postsCollectionRef = collection(db, "user");

   let navigate = useNavigate();
    const getUserGeolocationDetails = async (x) => {
      const res = await axios.get('https://geolocation-db.com/json/d802faa0-10bd-11ec-b2fe-47a0872c6708')
      
     console.log(x);
      //console.log(res.data);
      setIP(res.data.IPv4)
      
      await addDoc(postsCollectionRef, {
        users: {name: auth.currentUser.displayName, 
          email: auth.currentUser.email, 
          time:dt,
          long: coords.longitude,
          lat: coords.latitude,
          ip: ip,
        type: x},
      }
      );
      
      };
      
    useEffect( () => {
        getUserGeolocationDetails()
      }, []);
      
      const popinAlert=() => {

        swal({
          title: "Thank You!",
          text: "You've successfully checked in!",
          icon: "success",
          button: "Close",
          timer: "2000"
        });  
            
            
       }

       const popoutAlert=() => {

        swal({
          title: "Thank You!",
          text: "You've successfully checked out!",
          icon: "success",
          button: "Close",
          timer: "2000"
        });  
            
            
       }
    
      const {coords, isGeolocationAvailable, isGeolocationEnabled} =            //useGeolocated() calling from react-geolocated
      useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
      }, []);
     
        
      var dt =  new Date().toLocaleString(); 
  
      useEffect(() => {
        if (!isAuth) {
          navigate("/login");
        }
      }, []);
    
      return !isGeolocationAvailable ? (                                        //checking if browser location access is available
      <div>Your browser does not support Geolocation</div>
      ) : !isGeolocationEnabled ? (                                             //checking if browser location access is enabled
      <div>Geolocation is not enabled</div>
      ) : coords ? (
        <div className="BackPage">
         <div className="CheckContainer">
         <img src={img} alt="imzz"/>
         
          
          
          <div className="MemberContainer">
            <h1>Hi {localStorage.getItem("name")}</h1>
            
            <div className="loc">
      {ip && (
        <ul className="list-group">

         
        <li className="list-group-item">
        Location : {" "}
        {`${coords.longitude},${coords.latitude}`}                          {/*displaying long & lat from react-geolocated*/}
        </li>
        <li className="list-group-item">
        IP: {ip}                                                  {/*displaying user IP addr (API)*/}
        </li>
        <li className="list-group-item">
         Date-Time : { dt}
        </li>
        
        </ul>
     )}   
    </div>
    
         
            <button 
            className="btn" 
            onClick={() =>{setIsOp(!isOp);getUserGeolocationDetails("check in");popinAlert();}}>                            {/*calling the function that has fetched data from the API*/}
            CHECK IN 
            </button>
            {isOp ? (
              <div className="mod">
                <p></p>
              </div>
            ) : null}
            
            
            
            <button
            className="btnn"
           onClick={() => {setIsOpen(!isOpen);getUserGeolocationDetails("check out");popoutAlert();}}>                            
            CHECK OUT 
            </button>
            {isOpen ? (
              <div className="mod">
                <p></p>
              </div>
            ) : null}
          </div>
          
          <h2>Logged in as {localStorage.getItem("email")}</h2>
          
         </div>
  
       </div>
      ): (
      <div>Getting the location data;</div>
    );
  
     };

  

  export default Checkin