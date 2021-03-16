import React, { useState } from 'react'
import ProfilePic from '../../assets/download.png'
import './../style.css'
import axios from 'axios'
import url from '../../baseurl/BaseUrl'
import {useGlobalState, useGlobalStateUpdate} from '../../context/globalState'
function StDashboard() {
    const state = useGlobalState()
    const dispatch = useGlobalStateUpdate()
    console.log(state.userData.profilePic)
    function uploadImg(e) {
        e.preventDefault()
        alert('fsfs')
        var fileInput = document.getElementById("fileToUpload");
        console.log(fileInput)
        let formData = new FormData();
        formData.append("myFile", fileInput.files[0]);
        axios({
            method: 'post',
            url: url + "/upload",
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        })
            .then(res => {
                console.log("response data=> ", res.data);
                console.log("response data=> ", res.data.url);
                dispatch({ type: "USERDATA", item: res.data.user })
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className='col-md-4'>
                        <form>
                            <label for="fileToUpload">
                                <div class="profile-pic" id="profilePic" style={{ backgroundImage: `url( ${ProfilePic === "" ? ProfilePic : state.userData.profilePic} )` }}>
                                    <span class="glyphicon glyphicon-camera"></span>
                                    <span>Change Image</span>
                                </div>
                            </label>
                            <input type="File" name="fileToUpload" id="fileToUpload" onChange={uploadImg} />
                        </form>
                    </div>
                    <div className='col-md-8'>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default StDashboard