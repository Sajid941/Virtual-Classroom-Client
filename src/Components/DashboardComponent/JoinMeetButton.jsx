import React, { useEffect } from 'react';
import { useState } from 'react';
import useUser from '../../CustomHooks/useUser';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../CustomHooks/useAxiosPublic';

const JoinMeetButton = () => {

    const { userdb } = useUser(); // Custom hook to get user details

    const axios = useAxiosPublic();

    // Function to handle link submission
    const handleSubmit = (e) => {
        Swal.fire({
            title: "Add Google Meet Link",
            input: "url",
            showCancelButton: true,
            confirmButtonText: "Add",
            cancelButtonText: "Cancel",
            showLoaderOnConfirm: true,
            preConfirm: async (link) => {
                return axios.patch(`/meet`, { meetLink: link })
                    .then((response) => {
                        if (response.status === 200) {
                            Swal.fire("Link Added", "", "success");
                        }
                    })
                    .catch((error) => {
                        Swal.fire("Error", error.response.data.message, "error");
                    });
            }
        });
    }

    // useEffect(() => {
    //     axios.get(`/meet`)
    //         .then((response) => {
    //             console.log(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // });

    return (
        <div className='flex flex-row items-center gap-4' >

            <div>
                <a className='btn bg-green-600 border-green-700 text-white' target="_blank">Join Meet</a>
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