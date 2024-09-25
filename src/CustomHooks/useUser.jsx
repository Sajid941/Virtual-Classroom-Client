import { useContext, useEffect, useState } from "react";
import { AuthContext } from './../Provider/AuthProvider';

const useUser = () => {
  const apiLink = import.meta.env.API_URL;
  const [userdb, setUser] = useState([]);
  const { user } = useContext(AuthContext);
  console.log(userdb,user)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/email?email=${user?.email}`, {
          method: "GET",
          credentials: "include", // Use 'credentials' instead of 'withCredentials'
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        console.log(response);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [user?.email]);
  return userdb;
};

export default useUser;
