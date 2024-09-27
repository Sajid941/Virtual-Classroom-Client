import { Helmet } from "react-helmet-async";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from '../../Components/Shared/Navbar';
import { Toaster } from 'react-hot-toast';
const Forum = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Discussions | Class Net</title>
      </Helmet>
      <Navbar />
      <div className="wrap container mx-auto">
        <Outlet />
      </div>
      <ScrollRestoration />
      <Toaster />
    </div>
  );
};

export default Forum;
