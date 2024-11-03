import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const useAxiosPrivate = () => {

    const axiosPrivate = axios.create({
        baseURL: 'https://class-net-server.vercel.app',
        //baseURL: import.meta.env.VITE_API_URL,
        withCredentials: true,
    });


    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext);
    useEffect(() => {
        axiosPrivate.interceptors.response.use(
            (res) => {
                return res;
            },
            (error) => {
                // console.log(error.response.status);
                if (
                    error.response.status === 401 ||
                    error.response.status === 403
                ) {
                    logOut().then(() => {
                        navigate("/signIn");
                    });
                }
                return Promise.reject(error);
            }
        );
    }, [logOut, navigate, axiosPrivate]);

    return axiosPrivate;
};

export default useAxiosPrivate;
