import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import { registerAPI } from "../Services/allAPIs";
import { loginAPI } from "../Services/allAPIs";
import {useNavigate} from 'react-router-dom'
import { MDBContainer, MDBNavbar, MDBNavbarBrand } from "mdb-react-ui-kit";
import { GiLaptop } from "react-icons/gi";




function Auth({ register }) {
  const navigate = useNavigate()
  const [userData,setUserData] = useState({//to hold user data from form
    username:"",
    email:"",
    password:""
  })

  const handleRegister = async(e)=>{
    e.preventDefault()
    if (!userData.username || !userData.email || !userData.phonenumber || !userData.password) {

      Swal.fire({
        title: 'Warning!',
        text: 'Please fill the form properly!',
        icon: 'warning',
        confirmButtonText: 'Back'
      
      })

    }else{
      //api call to register
      const result = await registerAPI(userData)
      console.log(result);
      if (result.status==200) {
        Swal.fire({
          title: 'Success!',
          text: 'Succesfully Registered',
          icon: 'success',
          confirmButtonText: 'Back'
        })
        setUserData({
          username:"",
          email:"",
          password:"",
        })
        //to navigate to login page
        navigate('/login')
        }

        else if (result.response.status==406) {
          Swal.fire({
            title: 'Error!',
            text: result.response.data,
            icon: 'error',
            confirmButtonText: 'Back'
          })      }
    }
    console.log(userData);
  }

  const handleLogin = async(e)=>{
    e.preventDefault()
    if ( !userData.email || !userData.password) {

      Swal.fire({
        title: 'Warning!',
        text: 'Please fill the form properly!',
        icon: 'warning',
        confirmButtonText: 'Back'
      
      })

    }else{
      //api call to register
      const result = await loginAPI(userData)
      console.log(result);
      if (result.status==200) {
        sessionStorage.setItem("username",result.data.existingUser.username)
        sessionStorage.setItem("token",result.data.token)
        Swal.fire({
          title: 'Success!',
          text: 'Login Succesfully',
          icon: 'success',
          confirmButtonText: 'Back'
        })
        setUserData({
          username:"",
          email:"",
          password:"",
        })
        //to navigate to dasboard page
        navigate('/dashboard')
        }

        else if (result.response.status==404) {
          Swal.fire({
            title: 'Error!',
            text: result.response.data,
            icon: 'error',
            confirmButtonText: 'Back'
          })      }
    }
    console.log(userData);
  }

  return (
    <div>
      <MDBNavbar light bgColor="black">
          <MDBContainer fluid>
            <MDBNavbarBrand href="/" className="text-light fs-2 m-2">
              <GiLaptop className="text-light fs-1" />
              Project Hub
            </MDBNavbarBrand>
          </MDBContainer>
        </MDBNavbar>
      <div className="row">
        <div className="col-lg-6">
          <img
            src="https://cdn.dribbble.com/users/2131993/screenshots/4948736/thoughtworks-gif_dribbble.gif"
            width={"100%"}
            className="p-4"
            alt=""
          />
        </div>

        <div className="col-lg-6">
          <form className="shadow bg-black">
            <h2 className="text-center m-4">project Hub</h2>
            <h4 className="text-center">
              {register ? `Register Here...` : `Login Here..`}
            </h4>

            <div className="m-5 p-5">
              {register && (
                <input 
                onChange={e=>setUserData({...userData,username:e.target.value})}
                value={userData.username}
                  type="text"
                  placeholder="Username"
                  className="form-control mb-2"
                />
              )}
              <input
              onChange={e=>setUserData({...userData,email:e.target.value})}
              value={userData.email}
                type="email"
                placeholder="email"
                className="form-control mb-2"
              />
              
              <input
              onChange={e=>setUserData({...userData,password:e.target.value})}
              value={userData.password}
                type="password"
                placeholder="password"
                className="form-control mb-2"
              />
            </div>
            <div>
              {register ? 
                <div className="text-center m-4">
                  <button onClick={handleRegister} className="btn btn-dark m-4">Register</button>
                  <p>
                    Already registered? <Link to={"/login"}>Login here..</Link>
                  </p>
                </div>
               : 
                <div className="text-center m-4">
                  <button onClick={handleLogin} className="btn btn-dark m-4">Login</button>
                  <p>
                    New to here? <Link to={"/register"}>Register here..</Link>
                  </p>
               </div>
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Auth;
