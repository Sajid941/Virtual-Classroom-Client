// import PropTypes from 'prop-types';

// import { useQuery } from "@tanstack/react-query";
import useUser from "../../CustomHooks/useUser";

const AllAssignments = () => {
  const { userdb } = useUser();

//   const {data} = useQuery({queryKey: 'assignments', queryFn: async()=>{
//   }})
  return (
    <div>
      {userdb.role === "teacher" ? (
        <div>
          <h3>Teacher</h3>
        </div>
      ) : (
        <div>
          <h3 className="text-lg flex justify-center items-center">This page is under development</h3>
        </div>
      )}
    </div>
  );
};

AllAssignments.propTypes = {};

export default AllAssignments;
