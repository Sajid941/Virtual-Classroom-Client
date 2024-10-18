import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast, Toaster } from "react-hot-toast";

const SubmitQuizModal = ({ isOpen, onRequestClose, quiz, classId, refetch }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question index
  const [answers, setAnswers] = useState({}); // Store answers

  const onSubmit = async () => {
    try {
      const totalQuestions = quiz.questions.length;

      // Prepare the submission data
      const submissionData = {
        answers: answers,
        studentEmail: user?.email,
        totalQuestions: totalQuestions,
        score: calculateScore(), // Calculate score based on stored answers
      };

      console.log(submissionData);

      // Make the PATCH API call using axiosPublic
      await axiosPublic.patch(`/quizzes/${classId}/quizsubmission`, {
        submissionData,
      });

      window.location.reload();
      refetch();
      toast.success(`You scored ${submissionData.score}`);
      reset();
      onRequestClose();
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Failed to submit quiz. Please try again.");
    }
  };

  // Function to calculate the score based on stored answers
  const calculateScore = () => {
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (String(answers[index]) === String(question.correctAnswer)) {
        score += 1;
      }
    });
    return score;
  };

  // Handle the answer submission for each question
  const handleAnswerSubmit = (data) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: data[`answer-${currentQuestionIndex}`], // Store the answer
    }));

    // Move to the next question or submit the quiz
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      onSubmit(); // If last question, submit the entire quiz
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="bg-white rounded-lg p-6 relative shadow-xl max-w-lg mx-auto mt-20 animate-fade-in"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-[#004085]">Submit Quiz</h2>
        <button
          onClick={onRequestClose}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          &times;
        </button>
      </div>

      <form onSubmit={handleSubmit(handleAnswerSubmit)} className="space-y-6">
        {/* Render only the current question */}
        <div className="mb-6">
          <p className="font-semibold text-gray-700 mb-2">
            {quiz.questions[currentQuestionIndex].questionText}
          </p>
          {quiz.questions[currentQuestionIndex].options.map(
            (option, optionIndex) => (
              <div key={optionIndex} className=" mb-3">
                <input
                  type="radio"
                  value={option}
                  {...register(`answer-${currentQuestionIndex}`, { required: true })} // Unique name for each question
                  id={`question-${currentQuestionIndex}-option-${optionIndex}`}
                  className="text-[#004085] border-gray-300 focus:ring-2 focus:ring-[#004085]"
                />
                <label
                  htmlFor={`question-${currentQuestionIndex}-option-${optionIndex}`}
                  className="text-gray-600 cursor-pointer"
                >
                  {option}
                </label>
              </div>
            )
          )}
        </div>

        {/* Show "Next" button until the last question, then show "Submit" */}
        <button
          type="submit"
          className="w-full py-3 bg-[#004085] text-white font-semibold rounded-lg hover:bg-[#002a62] transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          {currentQuestionIndex < quiz.questions.length - 1 ? "Next" : "Submit"}
        </button>
      </form>

      <Toaster />
    </Modal>
  );
};

export default SubmitQuizModal;
