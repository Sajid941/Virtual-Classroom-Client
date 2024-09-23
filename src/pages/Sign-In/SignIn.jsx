import logo from "../../assets/classNet.png";
import { useForm } from "react-hook-form";
import { FaGoogle, FaGithub } from "react-icons/fa";
const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert("Form Data:", data);
  };

  const handleGoogleSignIn = () => {
    alert("Google Sign In");
  };

  const handleGitHubSignIn = () => {
    alert("GitHub Sign In");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-around container mx-auto ">
      {/* Left Column - Logo */}
      <div className="md:w-1/2 lg:1/3 flex justify-center flex-col items-center p-10">
        <img src={logo} alt="Logo" className="lg:w-52 w-44 object-contain" />
        <div className="text-wrap mt-3 text-center">
          <h1 className="text-secondary font-extrabold text-5xl">ClassNet</h1>
          <p className="text-gray-600 font-semibold text-lg">
            Expanding Learning Horizons.
          </p>
        </div>
      </div>

      {/* Right Column - Sign In Form */}
      <div className="lg:w-1/3 md:w-1/2 w-full p-8 shadow-md border  rounded-md">
        <h2 className="text-3xl font-bold text-center text-secondary mb-8">
          Sign In
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-accent text-secondary py-2 rounded-md hover:bg-primary font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Sign In
          </button>
        </form>

        {/* OAuth Sign In */}
        <div className="mt-6">
          <p className="text-center text-sm text-gray-600">Or sign in with</p>
          <div className="flex space-x-4 justify-center mt-4">
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center space-x-2 bg-white  hover:bg-gray-200 shadow-md border text-secondary rounded-full p-2 text-2xl"
            >
              <FaGoogle /> {/* Google Icon */}
            </button>
            <button
              onClick={handleGitHubSignIn}
              className="flex items-center space-x-2 bg-white  hover:bg-gray-200 shadow-md border text-secondary rounded-full p-2 text-2xl"
            >
              <FaGithub /> {/* GitHub Icon */}
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="text-center mt-4 text-sm text-gray-600">

          {"Don't have an account?"}{' '}
          <a href="/signUp" className="text-primary hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
