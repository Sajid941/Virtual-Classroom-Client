import { Helmet } from "react-helmet-async";
import logo from "../../assets/classNet.png";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import sideImg from '../../assets/images/undraw_my_app_re_gxtj.svg'

import useAuth from "../../CustomHooks/useAuth";

import { Link } from 'react-router-dom';

import { useNavigate } from "react-router-dom";

const SignIn = () => {
  //data from context api
  const { logInUser, signInWithGoogle } = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

    //log in an user
    logInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((err) => {
        console.log(err);
      });
    }


  const handleGoogleSignIn = () => {

    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  const handleGitHubSignIn = () => {
    alert("GitHub Sign In");
  };

  return (

    <div className='flex items-center justify-center h-screen px-5'>
      <Helmet>
        <title>Sign In | Class Net</title>
      </Helmet>
      <div className="flex items-center w-full max-w-sm mx-auto overflow-hidden border bg-white rounded-lg shadow-lg lg:max-w-4xl">
        <div
          className="hidden p-10 lg:block lg:w-1/2"

        >
          <img src={sideImg} alt="" />
        </div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-10 sm:h-8"
              src={logo}
              alt=""
            />
          </div>

          <p className="mt-3 text-xl text-center text-gray-600">
            Welcome back!
          </p>

          <a
           onClick={handleGoogleSignIn}
            className="flex items-center justify-center hover:cursor-pointer mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50"
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
            className="flex items-center justify-center hover:cursor-pointer mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50"
          >
            <div className="px-4 py-2">
              <FaGithub size={20}/>
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
              or login with email
            </a>

            <span className="w-1/5 border-b lg:w-1/4"></span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} >

            <div className="mt-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600"
                htmlFor="LoggingEmailAddress"
              >
                Email Address
              </label>
              <input
                id="LoggingEmailAddress"
                className={`block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300 ${errors.email ? "border-red-500" : ""}`}
                type="email"
                name='email'
                {...register("email", { required: "Email is required" })}
              />
              {
                errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )
              }
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600"
                  htmlFor="loggingPassword"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-gray-500 hover:underline"
                >
                  Forget Password?
                </a>
              </div>

              <input
                id="loggingPassword"
                className={`block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300 ${errors.email ? "border-red-500" : ""}`}
                type="password"
                name='password'
                {...register("password", { required: "Password is required" })}

              />
              {
                errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )
              }
            </div>

            <div className="mt-6">
              <button type='submit' className="w-full px-6 py-3 text-sm font-medium tracking-wide  capitalize transition-colors duration-300 transform bg-[#ffc107] rounded-lg hover:bg-[#ffdf1b] focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                Sign In
              </button>
            </div>
          </form>

          <div className="text-center mt-4">

            <p className="text-sm font-light text-gray-500">
              {"Don't have an account? "}<Link to="/signUp" className="font-medium text-primary-600 hover:underline">Sign Up</Link>
            </p>

          </div>
        </div>
      </div>


    </div>


    //           <input
    //             id="email"
    //             type="email"
    //             {...register("email", { required: "Email is required" })}
    //             className={`mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent ${errors.email ? "border-red-500" : ""
    //               }`}
    //             placeholder="Enter your email"
    //           />
    //           {
    //   errors.email && (
    //     <p className="text-red-500 text-xs mt-1">
    //       {errors.email.message}
    //     </p>
    //   )
    // }
    //         </div >


  );
};

export default SignIn;
