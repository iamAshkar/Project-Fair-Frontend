import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import programer from '../assets/programer.webp'
import Projectcard from '../Components/Projectcard'
import { getHomeProjectAPI } from '../Services/allAPIs'
import { MDBContainer, MDBNavbar, MDBNavbarBrand } from "mdb-react-ui-kit";
import { GiLaptop } from "react-icons/gi";


function Home() {
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [homeProject,setHomeProject] = useState([])

    //three project card in home
const getHomeProject = async(req,res)=>{
    //api call
    const result = await getHomeProjectAPI()
    console.log(result);
    if (result.status == 200) {
        setHomeProject(result.data)
    }else{
        console.log(result.response.data);
    }
}
console.log(homeProject);
    useEffect(()=>{
        getHomeProject()
        if (sessionStorage.getItem("token")) {
                   setIsLoggedIn(true)
        }else{
            setIsLoggedIn(false)
        }
    },[])




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
                <div className="col-sm-6">
                    <h1 className='text-center mt-5'>Project Hub</h1>
                    <p style={{ textAlign: 'justify' }} className='mx-5'>Project management involves the planning and organization of a company's resources to move a specific task, event, or duty toward completion. It can involve a one-time project or an ongoing activity, and resources managed include personnel, finances, technology, and intellectual property.
                        Project management is the process of leading a team to achieve project goals while considering constraints like budget, time, and scope. Project management can be broken down into five steps: initiation, planning, execution, monitoring, and closing
                    </p>
                   {
                    isLoggedIn?
                    <div className='text-center'>
                    <Link to={'/dashboard'}>
                        <button className='btn btn-dark  m-5'>Manage your Projects</button>
                    </Link>
                </div>:
                 <div className='text-center'>
                 <Link to={'/login'}>
                     <button className='btn btn-dark  m-5'>Get Started</button>
                 </Link>
             </div>
                   }
                </div>
                <div className="col-sm-6">
                    <img src={programer}
                        width={'100%'}
                        alt="" />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12" style={{ height: '500px' }}>
                    <h1 className='text-center m-5'>Explore Our Porject</h1>
                    <marquee width="100%" direction="left" height="400px">
                   <div className='row'>
                   {
    homeProject.length>0 ? homeProject.map(item => (
        <div className='col'>
            <Projectcard project= {item} />
        </div>
    )) : `<h1 clasname="text-light">Null<h1>`
}
                   </div>


                    </marquee>
                </div>
            </div>
            <div className="row sm-5">
                <h1 className='text-center m-5'>Our Services</h1>

                <div className="col-sm-4">
                    <div className="card shadow p-5 " style={{ height: '550px' }} >
                        <h3 className='text-centerr m-2'>Web Desigining</h3>
                        <p style={{ textAlign: 'justify' }}>Web design and coding are closely related, but they are not the same. Web design involves creating the visual elements and layout of a website, while coding involves translating these designs into a functional website using programming languages like HTML, CSS, and JavaScript. Typically, dedicated web developers translate the designs to code. Several design tools can also export code directly. However, having a basic understanding of coding can be beneficial for a web designer as it helps in creating designs that are both aesthetically pleasing and technically feasible..</p>

                    </div>

                </div>
                <div className="col-sm-4">

                    <div className="card shadow p-5" style={{ height: '550px' }}>
                        <h3 className='text-centerr m-2'>Single Page Application </h3>
                        <p style={{ textAlign: 'justify' }}>Single page applications (SPAs) are everywhere. Even if you're not exactly sure what they are, you most likely use them regularly — they're a great tool for making incredibly engaging and unique experiences for website users.

                            A single page application is a website or web application that dynamically rewrites a current web page with new data from the web server, instead of the default method of a web browser loading entire new pages.</p>

                    </div>
                </div>
                <div className="col-md-4">

                    <div className="card shadow p-5 " style={{ height: '550px' }}>
                        <h3 className='text-centerr m-2'>Backend Service</h3>
                        <p style={{ textAlign: 'justify' }}>A backend service defines how Cloud Load Balancing distributes traffic. The backend service configuration contains a set of values, such as the protocol used to connect to backends, various distribution and session settings, health checks, and timeouts. These settings provide fine-grained control over how your load balancer behaves. To get you started, most of the settings have default values that allow for fast configuration. A backend service is either global or regional in scope.</p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
