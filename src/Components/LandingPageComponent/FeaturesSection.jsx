import { SiGoogleclassroom } from "react-icons/si";
import { BiMessageSquareMinus } from "react-icons/bi";
import { MdAssignment } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { MdQuiz } from "react-icons/md";
const FeaturesSection = () => {
  return (
    <div className="mt-3 md:mt-10 md:mx-10">
      <div className="grid md:grid-cols-2 gap-2 md:gap-6">
        <div className="bg-[#F3F3F3] rounded-lg flex md:p-8 p-2 gap-2 md:gap-6 shadow-lg">
          <div>
            <h1 className="font-bold text-2xl md:text-[36px] text-[#004085] text-right">
              Classroom Creation
            </h1>
            <p className="font-bold md:text-[22px] text-right ">
              Teachers can create virtual classrooms for individual courses or
              subjects and share the access code with their students. Students
              can join the classroom using this code.
            </p>
          </div>
          <div>
            <SiGoogleclassroom className="w-[96px] h-[120px] text-[#FFC107]"></SiGoogleclassroom>
          </div>
        </div>
        <div className="bg-[#F3F3F3] rounded-lg flex md:p-8 p-2 gap-2 md:gap-6 shadow-lg">
          <div>
            <BiMessageSquareMinus className="w-[96px] h-[120px] text-[#FFC107]"></BiMessageSquareMinus>
          </div>
          <div>
            <h1 className="font-bold text-2xl md:text-[36px] text-[#004085] text-right">
              Private Messaging
            </h1>
            <p className="font-bold md:text-[22px] text-right ">
              A messaging system will allow students to send private messages to
              their teachers, and teachers can reply individually.
            </p>
          </div>
        </div>
        <div className="bg-[#F3F3F3] rounded-lg flex md:p-8 p-2 gap-2 md:gap-6 shadow-lg">
          <div>
            <h1 className="font-bold text-2xl md:text-[36px] text-[#004085] text-right">
              Assignment Management
            </h1>
            <p className="font-bold md:text-[22px] text-right ">
              Teachers can create assignments, and quizzes in the classroom tab.
              Students can submit their assignment to their teachers.
            </p>
          </div>
          <div>
            <MdAssignment className="w-[96px] h-[120px] text-[#FFC107]"></MdAssignment>
          </div>
        </div>
        <div className="bg-[#F3F3F3] rounded-lg flex md:p-8 p-2 gap-2 md:gap-6 shadow-lg">
          <div>
            <GiProgression className="w-[96px] h-[120px] text-[#FFC107]"></GiProgression>
          </div>
          <div>
            <h1 className="font-bold text-2xl md:text-[36px] text-[#004085] text-right">
              Progress Tracking
            </h1>
            <p className="font-bold md:text-[22px] text-right ">
              A tracking system will be available on both student and teacher
              dashboards. Teachers can monitor individual students, and students
              can track their own progress.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#F3F3F3] rounded-lg md:w-1/2 flex md:mt-6 mt-2 mx-auto md:p-8 p-2 gap-2 md:gap-6 shadow-lg">
        <div>
          <h1 className="font-bold text-2xl md:text-[36px] text-[#004085] text-right">
            Quiz Module
          </h1>
          <p className="font-bold md:text-[22px] text-right ">
            The Quiz Module enables instructors to create and manage quizzes
            with automatic grading, real-time tracking, and performance
            analytics.
          </p>
        </div>
        <div>
          <MdQuiz className="w-[96px] h-[120px] text-[#FFC107]"></MdQuiz>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
