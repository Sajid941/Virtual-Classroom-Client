import React from "react";
import ForumNav from "../../Components/DashboardComponent/Forum/ForumNav";
import { Outlet, ScrollRestoration } from "react-router-dom";
import ForumBody from "../../Components/DashboardComponent/Forum/ForumBody";

const Forum = () => {
  return (
    <div className="min-h-screen bg-white">
      <ForumNav />
      <div className="wrap container mx-auto">
        <Outlet/>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default Forum;
