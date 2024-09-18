import React from "react";
import SidebarForum from "./SidebarForum";

const ForumBody = () => {
  return (
    <div className="px-4">
      <div className="flex flex-col-reverse lg:flex-row gap-4 mt-12">
        {/* Main content */}
        <div className="basis-full lg:basis-3/4 min-h-screen bg-white border rounded-lg shadow-xl p-4">
          {/* Add your main forum content here */}
        </div>

        {/* Sidebar */}
        <div className="basis-full lg:basis-1/4 lg:min-h-screen bg-white rounded-lg border p-4">
          <SidebarForum />
        </div>
      </div>
    </div>
  );
};

export default ForumBody;
