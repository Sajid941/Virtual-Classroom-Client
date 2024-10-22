import moment from "moment";
import { useEffect, useState } from "react";
import { LiaComment } from "react-icons/lia";
import { TbPacman } from "react-icons/tb";
import useRole from "../../CustomHooks/useRole";
import LeaderBoard from "./LeaderBoard";

const DashboardSidebar = () => {
  const [time, setTime] = useState(moment().format("h : mm : ss  A"));
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format("h:mm:ss A"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const { role } = useRole();
  return (
    <div className="">
      <div className="border-b-2 pb-5">
        <h1 className="text-xl font-semibold">
          {moment().format("MMMM D, YYYY")}
        </h1>
        <h1 className="text-md font-semibold">Time: {time}</h1>
      </div>
      <div className="mt-5">
        {role === "teacher" && (
          <div>
            <LeaderBoard></LeaderBoard>
          </div>
        )}
        {role === "student" && (
          <div>
            <h4 className="text-xl font-semibold">Recent Post in Forum:</h4>
            <div className="mt-5">
              <div className="bg-white w-full rounded-md px-5 py-2  text-black ">
                <div>
                  <h3 className="text-xl font-bold">
                    Facing Problem On Debugging
                  </h3>
                  <div className="mt-2 flex gap-5">
                    <p className="flex items-center w-fit relative">
                      <LiaComment size={25} />
                      <span className="bg-[#ffc107] text-xs  px-1.5 rounded-full absolute left-3 top-3">
                        10
                      </span>
                    </p>
                    <p className="flex items-center w-fit relative">
                      <TbPacman size={25} />
                      <span className="bg-[#ffc107] text-xs  px-1.5 rounded-full absolute left-3 top-3">
                        80
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
