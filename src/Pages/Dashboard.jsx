import React, { useEffect, useState } from 'react'
import Profile from '../Components/Profile'
import MyProjects from '../Components/MyProjects'
import { Link} from 'react-router-dom'
import Header from '../Components/Header'
function Dashboard() {
  const [username,setUsername] = useState("")
  useEffect(()=>{
if (sessionStorage.getItem("username")) {
  setUsername(sessionStorage.getItem("username"))
}else{
  setUsername("")
}
  },[])
  return (
    <div>
      <Header/>
      <div className="row">
        <h2 className='text-center m-3'>Welcome <span className='text-light'>{username} </span></h2>
        <div className="col-lg-6">
          <MyProjects />
        </div>

        <div className="col-lg-6">
          <Profile />
        </div>
      </div>
      <div className='text-center m-5'>
        <Link to={'/project'}>
        <button className='btn btn-light'>View All Users Projects</button>

        </Link>
        </div>
    </div>
  )
}

export default Dashboard
