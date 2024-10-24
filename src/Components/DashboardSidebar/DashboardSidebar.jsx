import moment from "moment";
import { useEffect, useState } from "react";
import { LiaComment } from "react-icons/lia";
import { TbPacman } from "react-icons/tb";
import useRole from "../../CustomHooks/useRole";
import LeaderBoard from "./LeaderBoard";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const DashboardSidebar = () => {
  const axiosPublic=useAxiosPublic()
  const [time, setTime] = useState(moment().format("h : mm : ss  A"));
  const { data: discussions, isPending } = useQuery({
    queryKey: ["discussions", "latest"],
    queryFn: async () => {
      const res = await axiosPublic(`/discussions?sort=newest&limit=3`);
      return res.data;
    }
  });
  console.log(discussions);
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
            <h4 className="text-lg font-semibold">Recent Post in Forum:</h4>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
