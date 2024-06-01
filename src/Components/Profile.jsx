import React from 'react'
import Swal from 'sweetalert2'


function Profile() {
  const updateUser = () => {
    Swal.fire({
      title: 'Success!',
      text: 'User Details Updated',
      icon: 'success',
      confirmButtonText: 'Back'
    })
    }
  return (
    <div>
      <div className='text-center'>
        <label>
          <h3 className='mt-5'>My Profile</h3>
          <input type="file" style={{ display: 'none' }} />
          <img src="https://tse1.mm.bing.net/th?id=OIP.vuJTCH9hkqa8aoWly_3O0wHaHa&pid=Api&P=0&h=180" style={{ borderRadius: '50%' }} alt="" />
        </label>
        <div className='mx-5 px-5'>
          <input type="text" placeholder='Name' className='form-control mb-2' />
          <input type="text" placeholder='Github' className='form-control mb-2' />
          <input type="text" placeholder='Live link' className='form-control mb-2' />
          <button className='btn btn-dark m-4' onClick={updateUser}>Update</button>

        </div>
      </div>
    </div>
  )
}

export default Profile
