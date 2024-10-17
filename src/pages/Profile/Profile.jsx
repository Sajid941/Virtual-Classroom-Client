import React from 'react';
import useUser from '../../CustomHooks/useUser';

const Profile = () => {
    const { userdb } = useUser();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full text-center">
                <div className="flex justify-center mb-4">
                    <img 
                        src={userdb?.profileImage || 'https://via.placeholder.com/150'} 
                        alt="Profile" 
                        className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                    />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">{userdb.name || 'John Doe'}</h1>
                <p className="text-gray-600 mb-4">{userdb.email || 'email@example.com'}</p>

                <div className="text-left mt-6">
                    <h2 className="text-xl font-semibold text-gray-700">Bio:</h2>
                    <p className="text-gray-600 mt-2">{userdb.bio || 'This is the user bio.'}</p>
                </div>

                <div className="text-left mt-6">
                    <h2 className="text-xl font-semibold text-gray-700">Contact:</h2>
                    <p className="text-gray-600 mt-2">{userdb.contact || 'No contact information available.'}</p>
                </div>

                <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all">
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default Profile;
