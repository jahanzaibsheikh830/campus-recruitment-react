import React from 'react';
import rocketImg from '../../assets/rocket.png'
import axios from 'axios'
import url from '../../baseurl/BaseUrl'
import {Link} from 'react-router-dom'
const Signup = () => {

  function signup(e) {
    e.preventDefault()
    axios({
      method: 'post',
      url: url + "/signup",
      data: {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        role: document.getElementById('role').value,
        password: document.getElementById('password').value
      },
      withCredentials: true
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
  return (
    <div className="container mt-3">
      <div className="row ">
        <div className="col-md-5 ">
          <h1 className="my-4 font-weight-bold .display-4">Signup</h1>
          <form onSubmit={signup}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Name</label>
              <input type="text" className="form-control" id='name' required aria-describedby="emailHelp" placeholder="Enter name" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id='email' required aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div class="form-group">
              <label for="exampleFormControlSelect1">Select role</label>
              <select class="form-control" id="role">
                <option value="student">Student</option>
                <option value="company">Company</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id='password' required placeholder="Password" />
            </div>
            <div className="form-group">
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
            <button type="submit" className="btn btn-dark">Submit</button>
          </form>
        </div>
        <div className="col-md-7 my-auto">
          <img className="img-fluid w-100" src={rocketImg} alt="" />
        </div>
      </div>
    </div>

  )
}

export default Signup