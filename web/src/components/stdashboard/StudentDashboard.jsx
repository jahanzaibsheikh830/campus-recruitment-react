import React, { useState } from 'react'
import ProfilePic from '../../assets/download.png'
import './../style.css'
import axios from 'axios'
import url from '../../baseurl/BaseUrl'
import { useGlobalState, useGlobalStateUpdate } from '../../context/globalState'
function StDashboard() {
    const state = useGlobalState()
    const dispatch = useGlobalStateUpdate()
    console.log(state.userData.profilePic)
    function uploadImg(e) {
        e.preventDefault()
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
                dispatch(prev => ({
                    ...prev,
                    userData: {
                        profilePic: res.data.url
                    }
                }))
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
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <input type="text" className="form-control" id="inputEmail4"
                                     placeholder="First Name" />
                                </div>
                                <div className="form-group col-md-6">
                                    <input type="text" className="form-control" id="inputPassword4"
                                     placeholder="Last Name" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <input type="text" className="form-control" id="inputEmail4"
                                     placeholder="" />
                                </div>
                                <div className="form-group col-md-6">
                                    <input type="password" className="form-control" id="inputPassword4"
                                     placeholder="Password" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Email</label>
                                    <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputPassword4">Password</label>
                                    <input type="password" className="form-control" id="inputPassword4" placeholder="Password" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress">Address</label>
                                <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputAddress2">Address 2</label>
                                <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputCity">City</label>
                                    <input type="text" className="form-control" id="inputCity" />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="inputState">State</label>
                                    <select id="inputState" className="form-control">
                                        <option selected>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputZip">Zip</label>
                                    <input type="text" className="form-control" id="inputZip" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="gridCheck" />
                                    <label className="form-check-label" htmlFor="gridCheck">
                                        Check me out
                                    </label>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default StDashboard