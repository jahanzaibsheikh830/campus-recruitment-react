import React, { useState } from 'react'
import ProfilePic from '../../assets/download.png'
import './../style.css'
import axios from 'axios'
import url from '../../baseurl/BaseUrl'
import { useGlobalState, useGlobalStateUpdate } from '../../context/globalState'
function CoDashboard() {
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
    function addJobs(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: url + "/addJobs",
            data: {
                jobTitle: document.getElementById('jobTitle').value,
                salary: document.getElementById('salary').value,
                jobDes: document.getElementById('jobDes').value,
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
                                <div class="profile-pic" id="profilePic" 
                                style={{ backgroundImage: `url( ${ProfilePic ? ProfilePic : state.userData.profilePic} )` }}>
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
                        <form onSubmit={addJobs}>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputEmail4">Job Title</label>
                                    <input type="text" className="form-control" required id="jobTitle"
                                        placeholder="Job Title" />
                                </div>
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputEmail4">Salary</label>
                                    <input type="text" className="form-control" required id="salary"
                                        placeholder="Salary" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label htmlFor="inputEmail4">Job Description</label>
                                    <input type="text" className="form-control" required id="jobDes"
                                        placeholder="Description" />
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
export default CoDashboard