import { useState } from "react";
import { SiGoogleclassroom } from "react-icons/si";
import { BiMessageSquareMinus } from "react-icons/bi";
import { MdAssignment, MdQuiz } from "react-icons/md";
import { GiProgression } from "react-icons/gi";

// Initial card data
const initialCards = [
  {
    id: 1,
    title: "Classroom Creation",
    description:
      "Teachers can create virtual classrooms for individual courses or subjects. Students can join using the provided access code.",
    icon: <SiGoogleclassroom className="text-yellow-400 w-10 h-10" />,
  },
  {
    id: 2,
    title: "Private Messaging",
    description:
      "Students can send private messages to teachers, and teachers can respond individually.",
    icon: <BiMessageSquareMinus className="text-yellow-400 w-10 h-10" />,
  },
  {
    id: 3,
    title: "Assignment Management",
    description:
      "Teachers can create assignments and quizzes, and students can submit their work for evaluation.",
    icon: <MdAssignment className="text-yellow-400 w-10 h-10" />,
  },
  {
    id: 4,
    title: "Progress Tracking",
    description:
      "Track progress through student and teacher dashboards to monitor individual growth.",
    icon: <GiProgression className="text-yellow-400 w-10 h-10" />,
  },
  {
    id: 5,
    title: "Quiz Module",
    description:
      "Create and manage quizzes with automatic grading and real-time tracking.",
    icon: <MdQuiz className="text-yellow-400 w-10 h-10" />,
  },
];

const FeaturesSection = () => {
  const [cards, setCards] = useState(initialCards);

  // Function to handle drag and drop
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("cardIndex", index);
  };

  const handleDrop = (e, index) => {
    const draggedCardIndex = e.dataTransfer.getData("cardIndex");
    const tempCards = [...cards];
    const [draggedCard] = tempCards.splice(draggedCardIndex, 1);
    tempCards.splice(index, 0, draggedCard);
    setCards(tempCards);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mt-12 md:mt-20 px-4 md:px-16">
      <div className="grid lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="group relative bg-secondary rounded-lg p-10 shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 hover:border cursor-grabbing 
            flex flex-col justify-between min-h-fit"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            {/* Icon section with a circular gradient */}
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-gray-700 border border-yellow-500 to-gray-900 mb-6 group-hover:animate-pulse">
              {card.icon}
            </div>

            {/* Card title */}
            <h2 className="font-extrabold text-2xl text-gray-100 mb-4 group-hover:text-yellow-400 transition-colors duration-300">
              {card.title}
            </h2>

            {/* Card description */}
            <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
              {card.description}
            </p>

            {/* Subtle background animation */}
            <div className="absolute inset-0 opacity-0 bg-gradient-to-br from-transparent to-yellow-500 group-hover:opacity-80 transition-opacity duration-300 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
