import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid'
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


const Calendar = () => {
    const axiosPublic = useAxiosPublic()
    const {data: assignments=[]}=  useQuery({
        queryKey: ['Assignment-calendar'],
        queryFn: async () => {
            const res = await axios('/assignments.json')
            return res.data
        }
    })
    console.log(assignments);
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
                eventClick={(info) => {
                   toast(info.event.extendedProps.description)
                }}
            />
        </div>
    );
};

export default Calendar;
