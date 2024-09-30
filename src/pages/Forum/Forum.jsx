import { Helmet } from "react-helmet-async";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import ForumNav from "../../Components/DashboardComponent/Forum/ForumNav";
const Forum = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Discussions | Class Net</title>
      </Helmet>
      <ForumNav/>
      <div className="wrap container mx-auto">
        <Outlet />
      </div>
      <ScrollRestoration />
      <Toaster />
    </div>
  );
};

export default Forum;
