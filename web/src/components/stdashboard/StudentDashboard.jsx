import React, { useState } from 'react'
import ProfilePic from '../../assets/download.png'
import './../style.css'
import axios from 'axios'
import url from '../../baseurl/BaseUrl'
import { useGlobalState, useGlobalStateUpdate } from '../../context/globalState'
function StDashboard() {
    const state = useGlobalState()
    const dispatch = useGlobalStateUpdate()
    const [resMsg,setResMsg] = useState('')
    const [resErrMsg,setResErrMsg] = useState('')
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
                        ...prev,
                        profilePic: res.data.url
                    }
                }))
            })
            .catch(err => {
                console.log(err);
            })
    }
    function addDetails(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: url + "/addDetails",
            data: {
                fullName: document.getElementById('fullName').value,
                education: document.getElementById('education').value,
                cgpa: document.getElementById('cgpa').value,
                skills: document.getElementById('skills').value,
                experience: document.getElementById('experirence').value,
            },
            withCredentials: true
        }).then((response) => {
            console.log(response)
            if (response.data.status) {
                setResMsg(response.data.message)
            }
            else{
                setResErrMsg(response.data.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className='col-md-3 profile mr-3 mt-5 '>
                        <form>
                            <label for="fileToUpload">
                                <div class="profile-pic" id="profilePic" style={{ backgroundImage: `url( ${state.userData.profilePic  ? state.userData.profilePic :ProfilePic } )` }}>
                                    <span class="glyphicon glyphicon-camera"></span>
                                    <span>Change Image</span>
                                </div>
                            </label>
                            <input type="File" name="fileToUpload" id="fileToUpload" onChange={uploadImg} />
                        </form>
                        <h3>{state.userData.name.charAt(0).toUpperCase() + state.userData.name.slice(1)}</h3>
                        <p>{state.userData.email.charAt(0).toUpperCase() + state.userData.email.slice(1)}</p>
                    </div>
                    <div className='col-md-8 editForm mt-5' >
                        <form onSubmit={addDetails}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Full Name</label>
                                    <input type="text" className="form-control" required id="fullName"
                                        placeholder="Full Name" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Education</label>
                                    <input type="text" className="form-control" required id="education"
                                        placeholder="Education" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">CGPA</label>
                                    <input type="text" className="form-control" required id="cgpa"
                                        placeholder="CGPA" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputEmail4">Skills</label>
                                    <input type="text" className="form-control" required id="skills"
                                        placeholder="Skills" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputEmail4">Experience</label>
                                    <input type="text" className="form-control" required id="experirence"
                                        placeholder="Experience" />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form><br/>
                        {resMsg?<div class="alert alert-success" role="alert">
                            {resMsg}
                        </div>: null}
                        {resErrMsg?<div class="alert alert-danger" role="alert">
                            {resErrMsg}
                        </div>: null}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default StDashboard