import React from 'react'
import useAuthStore from '../store/authStore'
const Logout = () => {
    const {logut}=useAuthStore();
    const handleLogiut=async()=>{
        await logut();
    }
  return (
    <div>
      <button onClick={handleLogiut}>Logout</button>
    </div>
  )
}

export default Logout
