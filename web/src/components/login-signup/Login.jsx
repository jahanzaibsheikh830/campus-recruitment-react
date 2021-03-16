import React from 'react';
import rocketImg from '../../assets/rocket.png'
import axios from 'axios'
import url from '../../baseurl/BaseUrl'
import {Link} from 'react-router-dom'
import { useGlobalStateUpdate } from '../../context/globalState'
const Login = () => {
    const dispatch = useGlobalStateUpdate()
    function login(e) {
        e.preventDefault()
        axios({
            method: 'post',
            url: url + "/login",
            data: {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            },
            withCredentials: true
        }).then((res) => {
            console.log("data===", res.data.user)
            if (res.data.status === 200) {
                dispatch({ type: "USERDATA", item: res.data.user })
                dispatch({ type: "ROLE", item: res.data.user.role })
                dispatch({ type: "LOGINSTATUS", item: true })
            }
            else {
                alert(res.data.message)
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div className="container mt-3">
            <div className="row ">
                <div className="col-md-7 my-auto">
                    <img className="img-fluid w-100" src={rocketImg} alt="" />
                </div>
                <div className="col-md-5 ">
                    <h1 className="my-4 font-weight-bold .display-4">Login</h1>
                    <form onSubmit={login}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id='email' required aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id='password' required placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <p>Create an account <Link to="/signup">Signup</Link></p>
                        </div>
                        <button type="submit" className="btn btn-dark">Submit</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login