import { useForm } from "react-hook-form";
import logo from "../../assets/classNet.png";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-around items-center container mx-auto">
      <Helmet>
        <title>Sign Up | Class Net</title>
      </Helmet>
      <div>
        {/* left side */}
        <img src={logo} className="w-52 object-contain" alt="Logo" />
        <div>
          <h1 className="text-secondary font-extrabold text-5xl">Class Net</h1>
          <p className="text-gray-600 text-lg font-semibold">
            Expanding Learning Horizon
          </p>
        </div>
      </div>

      {/* right side/form side */}
      <div className="lg:w-1/3 md:w-1/2 w-full p-8 shadow-md border rounded-md">
        <h1 className="text-3xl font-bold text-center text-secondary mb-8">
          Sign Up
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Name field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          {/* Email field */}
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
              placeholder="Enter your Email"
              {...register("email", { required: "Email is required" })}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* Password field */}
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
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message:
                    "Password must contain at least 8 characters, including letters and numbers",
                },
              })}
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
          {/* Your role */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Join As
            </label>
            <select
              id="role"
              {...register("role", { required: "Role is required" })}
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent focus:border-accent ${
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
              <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
            )}
          </div>
          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-accent text-secondary py-2 rounded-md hover:bg-primary font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Sign Up
          </button>
        </form>
        {/* sign in link */}
        <p className="text-center mt-4 text-sm text-gray-600">
          {"Already have an account?"}{" "}
          <a href="/signin" className="text-primary hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
