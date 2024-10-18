import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid'
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import useRole from "../../CustomHooks/useRole";
import useAuth from "../../CustomHooks/useAuth";
import dayjs from 'dayjs';
import Swal from "sweetalert2";


const Calendar = () => {
    const axiosPublic = useAxiosPublic()
    const {role} = useRole()
    const {user}=useAuth()
    const {data: assignments=[]}=  useQuery({
        queryKey: ['Assignment-calendar'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/classes/assignments/${role}?email=${user.email}`)
            const assignmentsData = res.data.flatMap(classData => 
                classData.assignments.map(assignment => ({
                    id: assignment._id, 
                    title: assignment.title, 
                    description: assignment.description, 
                    start :dayjs(assignment.start).format('YYYY-MM-DD'), 
                    end:dayjs(assignment.end).format('YYYY-MM-DD'), 
                }))
            );
            return assignmentsData
        }
    })
    console.log("assignments",dayjs(assignments[0]?.start).format('YYYY-MM-DD'));
    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin]}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                events={assignments}
                expandRows={true}
                // eventClick={(info) => {
                //    toast(info.event.extendedProps.description)
                // }}
                eventClick={(info) => {
                    // Optionally show more information about the assignment
                    Swal.fire({
                        title: "Update Deadline",
                        input: "date",
                        showCancelButton: true,
                        confirmButtonText: "Update",
                        cancelButtonText: "Cancel",
                        preConfirm: async (date) => {
                            if (!date) {
                                Swal.showValidationMessage('You need to provide a date');
                                return false;
                            }
                            try {
                                const response = await axios.patch(`/classes/assignments/deadline?id=${info.event.id}`, { deadline: date });
                                if (response) {
                                    toast.success("Deadline Updated", "", "success");
                                }
                            } catch (error) {
                                Swal.fire("Error", error?.response?.data?.message || "Something went wrong", "error");
                            }
                        }
                    });
                }}
            />
        </div>
    );
};

export default Calendar;
