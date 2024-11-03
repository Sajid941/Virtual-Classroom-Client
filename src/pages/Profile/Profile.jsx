import React from "react";
import useUser from "../../CustomHooks/useUser";

const Profile = () => {
  const { userdb, refetch } = useUser();

  // Role-based content for Teacher and Student
  const renderRoleBasedContent = () => {
    if (userdb.role === "teacher") {
      return (
        <div className="flex flex-col space-y-4 animate-fadeIn">
          <p className="text-gray-600 text-lg">Role: Teacher</p>
          <div className="p-4 bg-blue-100 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
            <h3 className="text-blue-600 text-xl font-semibold">Classes Taught</h3>
            <p className="text-gray-700">You have 5 active classes.</p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
            <h3 className="text-green-600 text-xl font-semibold">New Assignments</h3>
            <p className="text-gray-700">2 assignments pending review.</p>
          </div>
        </div>
      );
    } else if (userdb.role === "student") {
      return (
        <div className="flex flex-col space-y-4 animate-fadeIn">
          <p className="text-gray-600 text-lg">Role: Student</p>
          <div className="p-4 bg-purple-100 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
            <h3 className="text-purple-600 text-xl font-semibold">Enrolled Classes</h3>
            <p className="text-gray-700">You are enrolled in 3 active classes.</p>
          </div>
          <div className="p-4 bg-pink-100 rounded-lg shadow-md hover:scale-105 transition-transform duration-300">
            <h3 className="text-pink-600 text-xl font-semibold">Upcoming Deadlines</h3>
            <p className="text-gray-700">You have 1 assignment due in 2 days.</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="">
      <div className="justify-center bg-gradient-to-r p-10  w-full bg-white shadow-lg rounded-xl border flex flex-col items-center text-center animate-slideInUp">
        {/* Profile Image */}
        <img
          src={userdb.profileImage}
          alt="Profile"
          className="w-32 h-32 object-cover rounded-full border-4 border-indigo-300 shadow-lg mb-4 transform transition-all duration-500"
        />

        {/* User Name */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-2">
          {userdb.name}
        </h2>

        {/* User Email */}
        <p className="text-gray-500 mb-6">{userdb.email}</p>

        {/* Role-Based Content */}
        {renderRoleBasedContent()}

        {/* Edit Profile Button */}
        <button className="mt-8 hidden px-6 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600 transition-all duration-300">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;