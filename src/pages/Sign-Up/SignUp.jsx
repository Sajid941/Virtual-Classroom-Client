import { useForm } from "react-hook-form";
import logo from "../../assets/classNet.png";
import { Helmet } from "react-helmet-async";
import useAuth from "../../CustomHooks/useAuth";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import Loading from "../../Components/Loading";

import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  // data from context api
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const [photoURL, setPhotoURL] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (errors) {
      setLoading(false);
    }
  }, [errors]);

  const onSubmit = async (data) => {
    try {
      if (data.password === data.confirmPassword) {
        const imageFile = data.photo[0];
        const formData = new FormData();
        formData.append("image", imageFile);
        console.log(imageFile);
        console.log(photoURL);
        axios
          .post(
            `https://api.imgbb.com/1/upload?key=cf98fef2238d8ad79338385fc2dcc4e8`,
            formData,
            {
              headers: {
                "content-type": "multipart/form-data",
              },
            }
          )
          .then(async (res) => {
            setPhotoURL(res.data.data.display_url);
            if (res.data.data.display_url) {
              console.log("Done");

              const result = await createUser(data.email, data.password);
              if (result.user) {
                // Prepare the user data for the database
                navigate("/");
                setLoading(false);
                const userData = {
                  name: data.name,
                  email: data.email,
                  role: data.role,
                  profileImage: res.data.data.display_url,
                };
                updateProfile(result.user, {
                  displayName: data.name,
                  photoURL: res.data.data.display_url,
                });

                await axiosPublic.post("/users", userData);
                navigate("/");
                setLoading(false);
              }
            }
          })
          .catch((err) => {
            console.error(err);
            toast.error(err.message);
            setLoading(false);
          });
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(error.message);

      setLoading(false);
    }
  };

  if (user) {
    navigate("/");
  }

  return (
    <div>
      <Helmet>
        <title>Sign Up | Class Net</title>
      </Helmet>
      {loading && (
        <div className="absolute border w-full">
          <Loading />
        </div>
      )}
      <section className="">
        <div className="flex flex-col items-center mt-10 px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
          >
            <img className="w-10 h-10 mr-2 " src={logo} alt="logo" />
            Class Net
          </a>
          <div className="bg-white rounded-lg shadow border md:mt-0 w-2/4 xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Welcome 🎉!
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your Name <span className="text-red-500">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                        errors.name ? "border-red-500" : ""
                      } `}
                      placeholder="Jhon Doe"
                      {...register("name", { required: true })}
                    />
                    {errors.email && (
                      <span className="mt-2 ml-2 text-xs text-red-600">
                        Email is required
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your email <span className="text-red-500">*</span>{" "}
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      placeholder="name@company.com"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span className="mt-2 ml-2 text-xs text-red-600">
                        Email is required
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="role"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Join As <span className="text-red-500">*</span>{" "}
                    </label>
                    <select
                      id="role"
                      name="role"
                      {...register("role", { required: "Role is required" })}
                      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                        errors.role ? "border-red-500" : ""
                      }`}
                    >
                      <option value="" disabled>
                        Select your role
                      </option>
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                    </select>
                    {errors.role && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.role.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="photo"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your Photo <span className="text-red-500">*</span>{" "}
                    </label>
                    <input
                      type="file"
                      name="photo"
                      id="photo"
                      className={`file-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full ${
                        errors.photo ? "border-red-500" : ""
                      }`}
                      {...register("photo", { required: true })}
                    />
                    {errors.password && (
                      <span className="mt-2 ml-2 text-xs text-red-600">
                        Password is required
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Password <span className="text-red-500">*</span>{" "}
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                        errors.password ? "border-red-500" : ""
                      } `}
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <span className="mt-2 ml-2 text-xs text-red-600">
                        Password is required
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Confirm password <span className="text-red-500">*</span>{" "}
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirm-password"
                      placeholder="••••••••"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                        errors.confirmPassword ? "border-red-500" : ""
                      }`}
                      {...register("confirmPassword", { required: true })}
                    />
                    {errors.confirmPassword && (
                      <span className="mt-2 ml-2 text-xs text-red-600">
                        Confirm Password is required
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setLoading(true)}
                  type="submit"
                  className="w-full lg:w-auto bg-[#ffc107] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500">
                  Already have an account?{" "}
                  <Link
                    to="/signIn"
                    className="font-medium text-primary-600 hover:underline"
                  >
                    Login here
                  </Link>
                </p>
              </form>

              <div className="divider">OR</div>

              <div className="flex flex-col lg:flex-row gap-5">
                <a
                  href="#"
                  className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50 w-full"
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
                  href="#"
                  className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50 w-full"
                >
                  <div className="px-4 py-2">
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="100"
                      height="100"
                      viewBox="0 0 48 48"
                    >
                      <linearGradient
                        id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
                        x1="9.993"
                        x2="40.615"
                        y1="9.993"
                        y2="40.615"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" stopColor="#2aa4f4"></stop>
                        <stop offset="1" stopColor="#007ad9"></stop>
                      </linearGradient>
                      <path
                        fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
                        d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
                      ></path>
                      <path
                        fill="#fff"
                        d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
                      ></path>
                    </svg>
                  </div>

                  <span className="w-5/6 px-4 py-3 font-bold text-center">
                    Sign in with Facebook
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Toaster />
    </div>
  );
};

export default SignUp;
