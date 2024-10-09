import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import useAuth from "../../CustomHooks/useAuth";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import logo from "../../assets/classNet.png";
import sideImg from "../../assets/images/undraw_my_app_re_gxtj.svg";

const SignIn = () => {
  const { logInUser, signInWithGoogle } = useAuth(); // Auth functions
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Form handling

  // User login submission handler with email and password
  const onSubmit = async (data) => {
    try {
      await logInUser(data.email, data.password);

      const res = await axiosPublic.post("/users/login", {
        email: data.email,
      });
      const token=res.token
      if (token) {
        localStorage.setItem("token", token); // Store JWT in localStorage
        navigate("/dashboard"); // Navigate to dashboard
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("An error occurred during login. Please try again.");
    }
  };

  // Google Sign-In handler
  const handleGoogleSignIn = async () => {
    try {
      // Step 1: Sign in with Google
      const result = await signInWithGoogle();
      console.log(result);

      const userData = {
        email: result.user.email,
        name: result.user.displayName
      };

      axiosPublic.post("/users/register", userData);

      const res = await axiosPublic.post("/users/login", {
        email: userData.email,
      });
      const token=res.token
      if (token) {
        localStorage.setItem("token", token); // Store JWT in localStorage
        navigate("/dashboard"); // Navigate to dashboard
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      alert(`${error.message}`);
    }
  };

  // GitHub Sign-In placeholder (if needed later)
  const handleGitHubSignIn = () => {
    alert("GitHub Sign In");
  };

  if (user) {
    navigate("/");
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Helmet>
        <title>Sign In | Class Net</title>
      </Helmet>

      <div className="flex items-center w-full max-w-sm mx-auto overflow-hidden border bg-white rounded-lg shadow-lg lg:max-w-4xl">
        <div className="hidden p-10 lg:block lg:w-1/2">
          <img src={sideImg} alt="Side illustration" />
        </div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-10 sm:h-8"
              src={logo}
              alt="ClassNet Logo"
            />
          </div>

          <p className="mt-3 text-xl text-center text-gray-600">
            Welcome back!
          </p>

          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50 w-full py-2"
          >
            <svg className="w-6 h-6" viewBox="0 0 40 40">
              {/* Google icon paths */}
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#FFC107"
              />
              <path
                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                fill="#FF3D00"
              />
              <path
                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9883 27.2325 10.605 23.3725L5.15747 27.5275C7.90663 32.9175 13.4975 36.6667 20 36.6667Z"
                fill="#4CAF50"
              />
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.6817 25.4125 27.3192 27.2142 25.5075 28.4783L30.6925 32.805C34.0617 29.6975 36.6667 25.135 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#1976D2"
              />
            </svg>
            <span className="mx-2">Sign in with Google</span>
          </button>

          <div className="mt-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm text-gray-800">Email</label>
                <input
                  type="email"
                  className={`block w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:outline-none ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("email", { required: "Email is required." })}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm text-gray-800">Password</label>
                <input
                  type="password"
                  className={`block w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:outline-none ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("password", {
                    required: "Password is required.",
                  })}
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Sign In
                </button>
              </div>
            </form>

            <p className="mt-4 text-sm text-center">
              Don't have an account?{" "}
              <Link to="/signUp" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
