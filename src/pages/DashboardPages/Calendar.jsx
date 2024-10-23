import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import toast from "react-hot-toast";
import useRole from "../../CustomHooks/useRole";
import useAuth from "../../CustomHooks/useAuth";
import dayjs from "dayjs";
import Swal from "sweetalert2";

const Calendar = () => {
    const axiosPublic = useAxiosPublic();
    const { role } = useRole();
    const { user } = useAuth();
    const { data: assignments = [], refetch } = useQuery({
        queryKey: ["Assignment-calendar"],
        queryFn: async () => {
            const res = await axiosPublic.get(
                `/classes/assignments/${role}?email=${user.email}`
            );
            const assignmentsData = res.data.flatMap((classData) =>
                classData.assignments.map((assignment) => ({
                    id: assignment._id,
                    title: assignment.title,
                    description: assignment.description,
                    start: dayjs(assignment.start).format("YYYY-MM-DD"),
                    end:
                        dayjs(assignment.end).format("YYYY-MM-DD") +
                        " 23:59:59",
                    classId: assignment.classId,
                }))
            );
            return assignmentsData;
        },
    });
    console.log(
        "assignments",
        dayjs(assignments[0]?.start).format("YYYY-MM-DD")
    );
    return (
        <div>
            {role === "teacher" && (
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    events={assignments}
                    expandRows={true}
                    eventClick={(info) => {
                        Swal.fire({
                            title: "Update Deadline",
                            input: "date",
                            inputValue: dayjs(info.event.end).format(
                                "YYYY-MM-DD"
                            ),
                            inputAttributes: {
                                min: dayjs().format("YYYY-MM-DD"),
                            },
                            showCancelButton: true,
                            confirmButtonText: "Update",
                            cancelButtonText: "Cancel",
                            confirmButtonColor: "#004085",
                            cancelButtonColor: "#007BFF",
                            preConfirm: async (date) => {
                                if (!date) {
                                    Swal.showValidationMessage(
                                        "You need to provide a date"
                                    );
                                    return false;
                                }
                                try {
                                    const response = await axiosPublic.patch(
                                        `/classes/assignments/deadline?id=${info.event.id}&classId=${info.event.extendedProps.classId}`,
                                        { deadline: date }
                                    );
                                    if (response) {
                                        toast.success(
                                            "Deadline Updated",
                                            "",
                                            "success"
                                        );
                                        refetch();
                                    }
                                } catch (error) {
                                    Swal.fire(
                                        "Error",
                                        error?.response?.data?.message ||
                                            "Something went wrong",
                                        "error"
                                    );
                                }
                            },
                        });
                    }}
                />
            )}
            {role === "student" && (
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    events={assignments}
                    expandRows={true}
                    eventClick={(info) => {
                       toast(info.event.extendedProps.description)
                    }}
                    
                />
            )}
        </div>
    );
};

export default Calendar;
