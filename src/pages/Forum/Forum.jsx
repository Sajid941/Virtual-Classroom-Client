import { Helmet } from "react-helmet-async";
<<<<<<< HEAD
import ForumSidebar from '../../Components/ForumComponents/ForumSidebar'
import ForumBody from '../../Components/ForumComponents/ForumBody'
import { Toaster } from 'react-hot-toast';
import ForumNavbar from "../../Components/ForumComponents/ForumNavbar";
=======
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import ForumNav from "../../Components/DashboardComponent/Forum/ForumNav";
>>>>>>> 1f969f11f3b69fe7aa47c39aca215008e1356a0f
const Forum = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Discussions | Class Net</title>
      </Helmet>
<<<<<<< HEAD
      <ForumNavbar />
      <div className="flex flex-col lg:flex-row gap-5 mx-5 md:mx-10 lg:mx-20 pt-28">
        <aside className="flex-1">
          <ForumSidebar />
        </aside>
        <div className="w-full lg:ml-96">
          <ForumBody />
        </div>
=======
      <ForumNav/>
      <div className="wrap container mx-auto">
        <Outlet />
>>>>>>> 1f969f11f3b69fe7aa47c39aca215008e1356a0f
      </div>
      <Toaster />
    </div>
  );
};

export default Forum;
