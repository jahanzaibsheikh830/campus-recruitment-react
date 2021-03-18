import React, { useEffect, useState } from 'react';
import axios from 'axios'
import url from '../../baseurl/BaseUrl'
function StInfo() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: url + "/getStudentsDetails",
            withCredentials: true
        }).then((response) => {
            setData(response.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    function del(id){
        console.log(id)
        axios({
            method: 'post',
            url: url + '/delStudentDetails',
            data: {id:id},
            withCredentials: true
        }).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    }
    console.log(data)
    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12 mt-5'>
                        <table className="table table-striped table-dark">
                            <thead className="">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Full Name</th>
                                    <th scope="col">Education</th>
                                    <th scope="col">CGPA</th>
                                    <th scope="col">Skills</th>
                                    <th scope="col">Experience</th>
                                    <th scope="col">Operations</th>
                                </tr>
                            </thead>
                            {data.map((value, index) => {
                                return (
                                    <tbody>
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{value.fullName}</td>
                                            <td>{value.education}</td>
                                            <td>{value.cgpa}</td>
                                            <td>{value.skills}</td>
                                            <td>{value.experience}</td>
                                            <td><button className="btn btn-danger" onClick={()=> del(value._id)}>Delete</button></td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StInfo