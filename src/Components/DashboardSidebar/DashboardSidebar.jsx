import moment from "moment";
import { useEffect, useState } from "react";

const DashboardSidebar = () => {
    const [time, setTime] = useState(moment().format("h : mm : ss  A"))
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(moment().format("h : mm : ss A"))
        }, 1000)
        return () => clearInterval(interval)
    }, [])
    return (
        <div className="">
            <div className="border-b-2 pb-5">
                <h1 className="text-xl font-semibold">{moment().format('MMMM D, YYYY')}</h1>
                <h1 className="text-xl font-semibold">{time}</h1>
            </div>
            <div className="mt-5">
                <h4 className="text-xl font-semibold">Student Leader Board:</h4>
                <h6 className="font-semibold">
                    Assignment: <span className="font-normal text-accent">ThermoDynamics</span>
                </h6>
                <div className="mt-5">
                    <div className="bg-white w-full rounded-md px-5 py-2 flex gap-6 text-black items-center">
                        <h1 className="text-4xl font-bold">
                            1
                        </h1>
                        <div>
                            <h3 className="text-2xl font-bold">Jhon Foe</h3>
                            <p>Total Mark: 90</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSidebar;