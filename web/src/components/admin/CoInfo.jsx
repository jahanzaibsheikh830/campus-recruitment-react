import React, { useEffect, useState } from 'react';
import axios from 'axios'
import url from '../../baseurl/BaseUrl'
function CoInfo() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: url + "/getJobDetails",
            withCredentials: true
        }).then((response) => {
            setData(response.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    console.log(data)
    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12 mt-5'>
                        <table className="table table-striped table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Company</th>
                                    <th scope="col">Job Title</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Salary</th>
                                    <th scope="col">Operations</th>
                                </tr>
                            </thead>
                            {data.map((value, index) => {
                                return (
                                    <tbody>
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{value.compName}</td>
                                            <td>{value.jobTitle}</td>
                                            <td>{value.jobDes}</td>
                                            <td>{value.salary}</td>
                                            <td><button className="btn btn-danger">Delete</button></td>
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

export default CoInfo