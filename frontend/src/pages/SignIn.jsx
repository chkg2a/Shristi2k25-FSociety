import React from 'react'
import useAuthStore from '../store/authStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const {login,user}=useAuthStore();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error, setError] = useState("");
    const navigate=useNavigate();

    const handleLogin=async(e)=>{
        e.preventDefault();
        setError("");
        try {
            const res=await login(email,password);
            console.log(res);
            if(res.data?.success){
                navigate("/upload-document");
            } else if(res.response?.data?.message) {
                setError(res.response.data.message);
            }
        } catch (error) {
            console.log(error);
            setError(error.message || "An error occurred during login");
        }
    }

    return (
        <div>
            <h1>Login</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default SignIn;