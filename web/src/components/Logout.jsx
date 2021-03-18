import React from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {useGlobalStateUpdate} from '../context/globalState'
import URL from "../baseurl/BaseUrl"
function Logout() {
    const globalStateUpdate = useGlobalStateUpdate()
    const history = useHistory()
    function logout() {
        axios({
            method: 'post',
            url: URL+'/logout',
            withCredentials: true
        }).then((response) => {
            globalStateUpdate(prev => ({
                ...prev,
                loginStatus: false,
                role: null
            }))
            history.push("/login")
        }, (error) => {
            console.log(error);
        });
    }
    return (
        <span>
            <a className=" btn btn-light mr-3 ml-3" onClick={logout}>Logout<span className="sr-only">(current)</span></a>
        </span>
    )
}

export default Logout