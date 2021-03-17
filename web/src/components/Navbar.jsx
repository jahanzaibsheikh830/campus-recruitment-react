import React from "react";
import { Link } from 'react-router-dom'
import { useGlobalState } from './../context/globalState'
import ProfilePic from '../assets/download.png'
function Navbar() {
    const state = useGlobalState()
    return (
        <div className='sticky-top bg-dark'>
            <nav class="navbar navbar-expand-lg navbar-light">
                <a class="navbar-brand" href="#">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link text-white" to="/">Profile<span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link text-white" to="/jobs">Jobs<span className="sr-only">(current)</span></Link>
                        </li>
                    </ul>
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto "></ul>
                    <span class="navbar-text text-white">
                        <img src={state.userData.profilePic ? state.userData.profilePic : ProfilePic} alt=""
                            style={{ width: "35px", height: "35px", borderRadius: "50%" }}
                        />
                        <span className='ml-2'>{state.userData.name.charAt(0).toUpperCase() + state.userData.name.slice(1)}</span>
                    </span>
                </div>
            </nav>
        </div>
    )
}
export default Navbar