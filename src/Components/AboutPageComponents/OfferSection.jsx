import SectionHeading from "../Shared/SectionHeading";
import { SiGoogleclassroom } from "react-icons/si";
import { BiMessageSquareMinus } from "react-icons/bi";
import { MdAssignment } from "react-icons/md";
import { GiProgression } from "react-icons/gi";

const cardDetails = [
  {
    id: 1,
    icon: <SiGoogleclassroom className="w-16 h-16 text-[#0056b3]" />,
    title: "Classroom Creation",
    description: "Create virtual classrooms for courses and share access codes with students.",
  },
  {
    id: 2,
    icon: <GiProgression className="w-16 h-16 text-[#0056b3]" />,
    title: "Progress Tracking",
    description: "Monitor student progress and allow students to track their own achievements.",
  },
  {
    id: 3,
    icon: <MdAssignment className="w-16 h-16 text-[#0056b3]" />,
    title: "Assignment Management",
    description: "Create and manage assignments and quizzes efficiently.",
  },
  {
    id: 4,
    icon: <BiMessageSquareMinus className="w-16 h-16 text-[#0056b3]" />,
    title: "Private Messaging",
    description: "A simple messaging system for students to communicate with teachers.",
  },
];

const OfferSection = () => {
  return (
    <div className="container mx-auto px-3 lg:px-12 mt-60 mb-32">
      <SectionHeading heading={"What We Offer"} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 my-9 mt-20">
        {cardDetails.map((card) => (
          <div key={card.id} className="bg-[#e6f7ff] rounded-lg flex flex-col items-center justify-between p-6 shadow-gray-400 shadow-inner transition duration-200 hover:-translate-y-2 hover:shadow-gray-500 ">
            {card.icon}
            <h1 className="font-bold text-xl text-[#0056b3] mb-2 text-center">{card.title}</h1>
            <p className="text-gray-700 text-center">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferSection;