import React from 'react';
import ForumNav from '../../Components/DashboardComponent/Forum/ForumNav';
import { Outlet } from 'react-router-dom';

const Forum = () => {
    return (
        <div className='min-h-screen bg-white'>
            <ForumNav />
        </div>
    );
};

export default Forum;