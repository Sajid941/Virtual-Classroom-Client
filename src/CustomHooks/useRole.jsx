import useUser from "./useUser";

const useRole = () => {
  const { userdb } = useUser();
  const role = userdb?.role;
  return {
    role,
  };
};
export default useRole;
