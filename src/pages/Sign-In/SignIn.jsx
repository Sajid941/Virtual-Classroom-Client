import { Helmet } from "react-helmet-async";
import {  useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { Link,  useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import useAuth from "../../CustomHooks/useAuth";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import sideImg from "../../assets/images/SignIn-pana .svg";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";

const SignIn = () => {
    const { logInUser, signInWithGoogle } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(); 

    // User login submission handler with email and password
    const onSubmit = async (data) => {
        try {
            const res = await logInUser(data.email, data.password);
            if (res.user?.email) {
                navigate("/dashboard/dashboardHome");
            }
        } catch (err) {
            console.error("Login error:", err);
            setLoading(false);
            console.log(err.message);
            if (err.message === "Firebase: Error (auth/invalid-credential).") {
                toast.error("Invalid email or password. Please try again.");
            } else {
                toast.error(
                    "An error occurred during login. Please try again."
                );
            }
        }
    };

    // Google Sign-In handler
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            const userData = {
                email: result.user.email,
                name: result.user.displayName,
            };

            // Send user data to backend for registration
            const response = await axiosPublic.post(
                "/users/register",
                userData,
                {
                    withCredentials: true,
                }
            );

            // Handle response: navigate to dashboard if user exists or is newly created
            if (response.status === 201 || response.status === 200) {
                navigate("/dashboard/dashboardHome");
            } else {
                console.error("Unexpected response:", response);
            }
        } catch (error) {
            console.error("Error during Google sign-in:", error);
        }
    };

    // Placeholder for GitHub sign-in (optional)
    const handleGithubSignIn = () => {
        toast.error("GitHub sign-in is not available at the moment.");
    };

    useEffect(() => {
        if (errors.password || errors.email) {
            setLoading(false);
        }
    }, [errors]);
    if (user) {
        return navigate("/");
    }
    return (
        <div className="flex justify-center items-center bg-black bg-[url('https://i.postimg.cc/dt26S0d1/yellow-and-White-Neon-Tech-Online-Sale-Cyber-Monday-Banner-2.png')] pt-5 min-h-screen bg-cover bg-center bg-no-repeat">
            <Helmet>
                <title>Sign In | Class Net</title>
            </Helmet>
            <div className="flex items-center border border-gray-400/35 w-full max-w-sm mx-auto overflow-hidden backdrop-blur-sm bg-opacity-30 rounded-lg shadow-lg lg:max-w-4xl">
                <div className="hidden p-10 lg:block lg:w-1/2">
                    <img src={sideImg} alt="" />
                </div>

                <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                    <div className="flex justify-center mx-auto">
                        <img
                            className="w-auto h-10 rounded-full sm:h-8"
                            src={"/favicon.png"}
                            alt="logo"
                        />
                    </div>

                    <p className="mt-3 text-xl text-center text-white">
                        Welcome back!
                    </p>

                    <a
                        onClick={handleGoogleSignIn}
                        href="#"
                        className="flex items-center justify-center mt-4 border-gray-400/30 text-white transition-colors duration-300 transform border rounded-lg "
                    >
                        <div className="px-4 py-2">
                            <svg className="w-6 h-6" viewBox="0 0 40 40">
                                <path
                                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                    fill="#FFC107"
                                />
                                <path
                                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                                    fill="#FF3D00"
                                />
                                <path
                                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                                    fill="#4CAF50"
                                />
                                <path
                                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                    fill="#1976D2"
                                />
                            </svg>
                        </div>

                        <span className="w-5/6 px-4 py-3 font-bold text-center">
                            Sign in with Google
                        </span>
                    </a>
                    <a
                        hidden
                        onClick={handleGithubSignIn}
                        href="#"
                        className=" items-center hidden justify-center mt-4 border-gray-400/30 text-white transition-colors duration-300 transform border rounded-lg "
                    >
                        <div className="px-4 py-2">
                            <FaGithub size={20} />
                        </div>

                        <span className="w-5/6 px-4 py-3 font-bold text-center">
                            Sign in with Github
                        </span>
                    </a>

                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b lg:w-1/4"></span>

                        <a
                            href="#"
                            className="text-xs text-center text-white uppercase hover:underline"
                        >
                            or login with email
                        </a>

                        <span className="w-1/5 border-b lg:w-1/4"></span>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-4">
                            <label
                                className="block mb-2 text-sm font-medium text-white"
                                htmlFor="LoggingEmailAddress"
                            >
                                Email Address
                            </label>
                            <input
                                id="LoggingEmailAddress"
                                className="block w-full px-4 py-2 text-white bg-transparent border rounded-lg focus:border-yellow-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-yellow-300"
                                placeholder="john@example.com"
                                type="email"
                                name="email"
                                {...register("email", { required: true })}
                            />
                            {errors.email && (
                                <span className="text-xs ml-2 mt-2 text-red-600">
                                    This filed is required.
                                </span>
                            )}
                        </div>

                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label
                                    className="block mb-2 text-sm font-medium text-white"
                                    htmlFor="loggingPassword"
                                >
                                    Password
                                </label>
                                <a
                                    href="#"
                                    className="text-xs text-white hover:underline"
                                >
                                    Forget Password?
                                </a>
                            </div>
                            <div className="relative">
                                <input
                                    id="loggingPassword"
                                    className="block w-full px-4 py-2 text-white bg-transparent border rounded-lg focus:border-yellow-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-yellow-300"
                                    placeholder="••••••••"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    {...register("password", {
                                        required: true,
                                    })}
                                />
                                <div
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute top-1/4 text-white right-3 hover:cursor-pointer"
                                >
                                    {showPassword ? (
                                        <IoMdEyeOff size={20} />
                                    ) : (
                                        <IoMdEye size={20} />
                                    )}
                                </div>
                            </div>
                            {errors.password && (
                                <span className="text-xs ml-2 mt-2 text-red-600">
                                    This filed is required.
                                </span>
                            )}
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={() => setLoading(true)}
                                type="submit"
                                className="w-full px-6 py-3 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform bg-white text-black rounded-lg focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                            >
                                {loading ? (
                                    <div className="flex justify-center items-center gap-2">
                                        {" "}
                                        <span className="loading loading-spinner  w-4"></span>
                                        Loading
                                    </div>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-4">
                        <p className="text-sm font-light text-white">
                            {"Don't have an account? "}
                            <Link
                                to="/signUp"
                                className="font-medium text-primary-600 hover:underline"
                            >
                                Register Here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default SignIn;
