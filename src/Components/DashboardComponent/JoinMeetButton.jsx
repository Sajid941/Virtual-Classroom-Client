import React, { useEffect, useState } from 'react';
import useUser from '../../CustomHooks/useUser';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../CustomHooks/useAxiosPublic';

const JoinMeetButton = ({ id }) => {

    const { userdb } = useUser(); // Custom hook to get user details
    const axios = useAxiosPublic(); // Assuming this is properly set up

    const [meetLink, setMeetLink] = useState(''); 

    // Function to handle link submission
    const handleSubmit = (e) => {
        e.preventDefault();  // Prevent form submission if it's in a form

        Swal.fire({
            title: "Add Google Meet Link",
            input: "url",
            showCancelButton: true,
            confirmButtonText: "Add",
            cancelButtonText: "Cancel",
            showLoaderOnConfirm: true,
            preConfirm: async (link) => {
                if (!link) {
                    Swal.showValidationMessage('You need to provide a link');
                    return false;
                }
                try {
                    const response = await axios.patch(`/classes/${id}/meetlink`, { meetLink: link });
                    if (response) {
                        Swal.fire("Link Added", "", "success");
                    }
                } catch (error) {
                    Swal.fire("Error", error?.response?.data?.message || "Something went wrong", "error");
                }
            }
        });
    };


    useEffect(() => {
        axios.get(`/classes/meetlink?classId=${id}`).then((response) => {
            setMeetLink(response.data.meetLink);
        }).catch((error) => {
            console.error(error);
        });
    });

    return (
        <div className='flex flex-row items-center gap-4' >

            <div>
                {
                    meetLink ? <>
                        <a href={meetLink} className='btn bg-green-600 border-green-700 text-white' target="_blank">Join Meet</a>
                    </> :
                    <>
                        <p>Meet link not available</p>
                    </>
                }
            </div>

            {
                userdb?.role == "teacher" ?
                    <>
                        <button className='btn bg-secondary text-white border-secondary' onClick={handleSubmit}>Meet Setting</button>
                    </>
                    : null
            }

        </div >
    );
};

export default JoinMeetButton;