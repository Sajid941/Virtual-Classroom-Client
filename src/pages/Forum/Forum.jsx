import { Helmet } from "react-helmet-async";
import ForumSidebar from '../../Components/ForumComponents/ForumSidebar'
import { Toaster } from 'react-hot-toast';
import ForumNavbar from "../../Components/ForumComponents/ForumNavbar";
import { useState } from "react";
import ForumCards from "../../Components/ForumComponents/ForumCards";


const Forum = () => {
  const [discussionCategory,setDiscussionCategory] = useState("All")
  const [isShowDrawer,setIsShowDrawer] = useState(false)
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Discussions | Class Net</title>
      </Helmet>
      <ForumNavbar setIsShowDrawer={setIsShowDrawer} isShowDrawer={isShowDrawer} />
      <div className="flex flex-col lg:flex-row gap-5 mx-5 md:mx-10 lg:mx-20 pt-28">
        <aside className="flex-1 ">
          <ForumSidebar discussionCategory={discussionCategory} setIsShowDrawer={setIsShowDrawer} isShowDrawer={isShowDrawer} setDiscussionCategory={setDiscussionCategory}/>
        </aside>
        <div className="w-full lg:ml-96">
          <ForumCards discussionCategory={discussionCategory}/>
        </div>

      </div>
      <Toaster />
    </div>
  );
};

export default Forum;
