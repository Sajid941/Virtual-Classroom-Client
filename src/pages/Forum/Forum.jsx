import { Helmet } from "react-helmet-async";
import ForumSidebar from '../../Components/ForumComponents/ForumSidebar'
import ForumBody from '../../Components/ForumComponents/ForumBody'
import { Toaster } from 'react-hot-toast';
import ForumNavbar from "../../Components/ForumComponents/ForumNavbar";
const Forum = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Discussions | Class Net</title>
      </Helmet>
      <ForumNavbar />
      <div className="flex flex-col lg:flex-row gap-5 mx-5 md:mx-10 lg:mx-20 pt-28">
        <aside className="flex-1">
          <ForumSidebar />
        </aside>
        <div className="w-full lg:ml-96">
          <ForumBody />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Forum;
