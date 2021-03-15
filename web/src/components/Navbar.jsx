import React from "react";
import { Link } from 'react-router-dom'
import { useGlobalState } from './../context/globalState'
function Navbar() {
    const state = useGlobalState()
    return (
        <div className='sticky-top bg-dark'>
            <nav className="navbar  navbar-expand-lg navbar-light">
                <a className="navbar-brand text-white" href="#">Welcome {state.userData.name.charAt(0).toUpperCase() + state.userData.name.slice(1)}</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                    {state.role === 'student' ?
                        <>
                            <span className="navbar-text">
                            <ul className="navbar-nav mr-auto f">
                                <li className="nav-item active ">
                                    <Link className="nav-link text-white" to="/">Profile</Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link text-white" to="/jobs">Jobs</Link>
                                </li>
                            </ul>
                            </span>
                        </> :
                        <>
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/">Admin Dashboard <span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/addproducts">Add Products <span className="sr-only">(current)</span></Link>
                                </li>
                            </ul>
                            <h3 className="mr-3">Welcome {state.userData.name.charAt(0).toUpperCase() + state.userData.name.slice(1)}</h3>
                        </>
                    }
                </div>
            </nav>
        </div>
    )
}
export default Navbar