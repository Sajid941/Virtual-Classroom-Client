import { Helmet } from "react-helmet-async";
import logo from "../../assets/classNet.png";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import sideImg from "../../assets/images/undraw_my_app_re_gxtj.svg";
import useAuth from "../../CustomHooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const SignIn = () => {
  // Data from context API
  const { logInUser, signInWithGoogle } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Log in a user
    logInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(location?.state ? location.state : "/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function to handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const userData = {
        email: result.user.email,
        name: result.user.displayName,
      };

      // Check if the user exists in the database
      const existingUserResponse = await axiosPublic.get(
        `/users/email?email=${userData.email}`
      );
      console.log(existingUserResponse);

      if (existingUserResponse.data === null) {
        // User doesn't exist, register the new user
        const newUserResponse = await axiosPublic.post("/users/register", userData);
        console.log(newUserResponse.data);

        // Log them in immediately after registration
        const loginResponse = await axiosPublic.post("/users/login", {
          email: userData.email,
        });

        const { token } = loginResponse.data;
        if (token) {
          // Store JWT token in a secure cookie
          document.cookie = `token=${token}; SameSite=Strict; path=/;`;
          // Redirect the user to the desired page
          navigate(location?.state ? location.state : "/dashboard");
        }
      } else {
        // User exists, log them in and obtain the JWT token
        const loginResponse = await axiosPublic.post("/users/login", {
          email: userData.email,
        });

        const { token } = loginResponse.data;
        if (token) {
          // Store JWT token in a secure cookie
          document.cookie = `token=${token}; SameSite=Strict; path=/;`;
          // Redirect the user to the desired page
          navigate(location?.state ? location.state : "/dashboard");
        }
      }
    } catch (error) {
      console.log("Error during Google sign-in:", error);
      alert("An error occurred during Google sign-in. Please try again.");
    }
  };

  const handleGitHubSignIn = () => {
    alert("GitHub Sign In");
  };

  if (user) {
    return navigate("/");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Helmet>
        <title>Sign In | Class Net</title>
      </Helmet>
      <div className="flex items-center w-full max-w-sm mx-auto overflow-hidden border bg-white rounded-lg shadow-lg lg:max-w-4xl">
        <div className="hidden p-10 lg:block lg:w-1/2">
          <img src={sideImg} alt="" />
        </div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-10 sm:h-8" src={logo} alt="" />
          </div>

          <p className="mt-3 text-xl text-center text-gray-600">
            Welcome back!
          </p>

          <a
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50"
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
            onClick={handleGitHubSignIn}
            className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50"
          >
            <div className="px-4 py-2">
              <FaGithub size={20} />
            </div>

            <span className="w-5/6 px-4 py-3 font-bold text-center">
              Sign in with GitHub
            </span>
          </a>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b lg:w-1/4"></span>

            <a
              href="#"
              className="text-xs text-center text-gray-500 uppercase hover:underline"
            >
              or sign in with email
            </a>

            <span className="w-1/5 border-b lg:w-1/4"></span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                {...register("email", { required: true })}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                type="email"
                placeholder="Enter your email"
                required
              />
              {errors.email && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>

            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                {...register("password", { required: true })}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                type="password"
                placeholder="Enter your password"
                required
              />
              {errors.password && (
                <span className="text-red-500">Password is required</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400"
            >
              Sign In
            </button>
          </form>

          <p className="mt-4 text-xs text-center text-gray-500">
            Don’t have an account?{" "}
            <Link to="/register" className="font-bold text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
