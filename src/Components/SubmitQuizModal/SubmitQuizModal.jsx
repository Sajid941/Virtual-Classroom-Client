import React, { useContext } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast, Toaster } from 'react-hot-toast';

const SubmitQuizModal = ({
  isOpen,
  onRequestClose,
  quiz,
  classId,
  refetch,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      // Calculate the score
      let score = 0;
      const totalQuestions = quiz.questions.length;

      // Iterate over the questions to check answers
      quiz.questions.forEach((question, index) => {
        // Log the user's answer and the correct answer
        console.log(
          `Comparing user's answer: ${data.answers[index]} with correct answer: ${question.correctAnswer}`
        );

        // Convert both to string to avoid type issues
        if (String(data.answers[index]) === String(question.correctAnswer)) {
          score += 1; // Increment score for each correct answer
        }
      });

      // Prepare the data to be sent
      const submissionData = {
        answers: data.answers, // Collect answers
        studentEmail: user?.email, // Student email
        score: score, // Store the calculated score
        totalQuestions: totalQuestions, // Optionally, store the total number of questions
      };
      // Make the PATCH API call using axiosPublic
      const sub=await axiosPublic.patch(`/classes/${classId}/quizsubmission`, {
        submissionData, // Send submissionData in the request body
      });
      console.log(sub);

      toast.success(`you have got ${sub.data.quizzes[0].submissions[0].score}`)
      // Refetch the quiz data after submission
      refetch();
      reset(); // Reset the form
    } catch (error) {
      console.error("Error submitting quiz:", error);
    toast.error("Failed to submit quiz. Please try again.",error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2 className="text-lg font-semibold">Submit Quiz</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        {quiz.questions.map((question, index) => (
          <div key={index} className="mb-4">
            <p className="font-semibold">{question.questionText}</p>
            {/* Render options as radio buttons */}
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center mb-2">
                <input
                  type="radio"
                  value={option} // Set the option value
                  {...register(`answers.${index}`, { required: true })} // Register the input
                  className="mr-2"
                />
                <label className="text-md">{option}</label>
              </div>
            ))}
          </div>
        ))}
        <button
          type="submit"
          className="bg-[#004085] text-white px-4 py-2 rounded-lg"
        >
          Submit
        </button>
      </form>
      <Toaster/>
    </Modal>
  );
};

export default SubmitQuizModal;
