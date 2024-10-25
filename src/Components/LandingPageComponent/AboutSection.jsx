import SectionHeading from "../Shared/SectionHeading";
import { motion } from "framer-motion"; // Importing Framer Motion for animations
import { FaChalkboardTeacher, FaUsers, FaClipboardList } from "react-icons/fa"; // Importing different icons from react-icons
import { MdOutlineArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <div className="py-16 bg-white">
      {" "}
      {/* White Background */}
      {/* Section Heading */}
      <SectionHeading heading="About Class Net" />
      <div className="flex flex-col md:flex-row items-center justify-center mx-4 md:mx-16 mt-12">
        {/* Text Content with Animation */}
        <motion.div
          className="md:w-1/2 text-gray-800 mb-8 md:mb-0 md:mr-8" // Dark text color
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center mb-4">
            {/* Small Logo */}
            <img
              className="h-20 w-20 mr-2" // Small logo size
              src="https://i.ibb.co/hgXFcw0/classNet.png" // Use your logo URL here
              alt="Class Net Logo"
            />
            <h1 className="text-3xl font-bold">
              Revolutionizing Online Learning
            </h1>
          </div>
          <p className="text-lg leading-relaxed mb-6">
            At <span className="font-semibold">Class Net</span>, we empower
            educators and learners to connect and collaborate. Our platform
            makes education accessible to everyone, anytime, anywhere.
          </p>

          {/* Key Highlights Section with Different Icons */}
          <ul className="list-disc list-inside mb-6">
            <li className="flex items-center mb-2">
              <FaChalkboardTeacher className="h-5 w-5 text-secondary mr-2" />{" "}
              {/* Teaching Icon */}
              Engaging Virtual Classrooms
            </li>
            <li className="flex items-center mb-2">
              <FaUsers className="h-5 w-5 text-secondary mr-2" />{" "}
              {/* Users Icon */}
              Seamless Student Interaction
            </li>
            <li className="flex items-center">
              <FaClipboardList className="h-5 w-5 text-secondary mr-2" />{" "}
              {/* Clipboard Icon */}
              Advanced Assignment & Quiz Tools
            </li>
          </ul>

          {/* Interactive Button */}
          <Link to={"/aboutUs"}>
            <motion.button
              className="px-6 py-2 bg-secondary text-white shadow hover:bg-primary transition duration-200 btn rounded-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Discover More <MdOutlineArrowOutward className="text-2xl" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Image Section with Animation */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            className="w-72 hidden md:block mx-auto h-auto rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
            src="https://i.ibb.co/hgXFcw0/classNet.png" // Class Net image
            alt="Class Net"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;