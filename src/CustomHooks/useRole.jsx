import useUser from "./useUser";

const useRole = () => {
  const {userDb} =useUser()
    const role= userDb?.role
  return {
    role
  };
};
export default useRole;