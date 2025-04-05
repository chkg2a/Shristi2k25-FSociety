import React from 'react';
import useAuthStore from '../store/authStore';

const Home = () => {
    const { user } = useAuthStore();
    console.log(user);
    return (
        <div>
            <h1 className='bg-red-100'>Welcome, {user?.name}!</h1>
            <p>Email: {user?.email}</p>
            <p>User ID: {user?._id}</p>
        </div>
    );
};

export default Home;
