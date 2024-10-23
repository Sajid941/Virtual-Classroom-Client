import Modal from "react-modal";
import { useForm, useFieldArray } from "react-hook-form";
import { FaPlus, FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import toast, { Toaster } from "react-hot-toast";

// Ensure accessibility for the modal
Modal.setAppElement("#root");

const AddQuizModal = ({ isOpen, onRequestClose, classId, refetch }) => {
    const axiosPublic = useAxiosPublic();
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
            dueDate: "",
            questions: [
                {
                    questionText: "",
                    options: ["", "", "", ""],
                    correctAnswer: "",
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "questions",
    });

    const onSubmit = async (data) => {
        try {
            // Send PATCH request to add the quiz
            const response = await axiosPublic.patch(
                `/quizzes/${classId}/quiz`,
                {
                    quiz: data,
                },
                { withCredentials: true }
            );
            if (response.status === 200) {
                toast.success("Quiz added successfully!");

                // Reset the form
                reset();

                // Close the modal
                onRequestClose();

                // Refetch class data to update the quizzes list
                refetch();
            } else {
                toast.error("Failed to add quiz.");
            }
        } catch (error) {
            console.error("Error adding quiz:", error);
            toast.error(
                "There was an error adding the quiz. Please try again."
            );
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Add Quiz"
            className="max-w-3xl mx-auto mt-20 bg-white p-6 rounded-lg shadow-lg overflow-auto max-h-[90vh] z-40"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
        >
            <h2 className="text-2xl font-semibold mb-4">Add New Quiz</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Quiz Title */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Quiz Title
                    </label>
                    <input
                        {...register("title", {
                            required: "Quiz title is required",
                        })}
                        className="w-full border border-gray-300 p-2 rounded-lg"
                        placeholder="Enter quiz title"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                {/* Quiz Description */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Description
                    </label>
                    <textarea
                        {...register("description", {
                            required: "Quiz description is required",
                        })}
                        className="w-full border border-gray-300 p-2 rounded-lg"
                        placeholder="Enter quiz description"
                    ></textarea>
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                {/* Due Date */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Due Date
                    </label>
                    <input
                        type="date"
                        {...register("dueDate", {
                            required: "Due date is required",
                        })}
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                    {errors.dueDate && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.dueDate.message}
                        </p>
                    )}
                </div>

                {/* Questions */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                        Questions
                    </label>
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="border border-gray-300 p-4 rounded-lg mb-4"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold">
                                    Question {index + 1}
                                </h3>
                                {fields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                )}
                            </div>

                            {/* Question Text */}
                            <div className="mb-2">
                                <label className="block text-gray-700 mb-1">
                                    Question Text
                                </label>
                                <input
                                    {...register(
                                        `questions.${index}.questionText`,
                                        {
                                            required:
                                                "Question text is required",
                                        }
                                    )}
                                    className="w-full border border-gray-300 p-2 rounded-lg"
                                    placeholder="Enter question text"
                                />
                                {errors.questions &&
                                    errors.questions[index]?.questionText && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {
                                                errors.questions[index]
                                                    ?.questionText?.message
                                            }
                                        </p>
                                    )}
                            </div>

                            {/* Options */}
                            <div className="mb-2">
                                <label className="block text-gray-700 mb-1">
                                    Options
                                </label>
                                {[
                                    "option1",
                                    "option2",
                                    "option3",
                                    "option4",
                                ].map((option, optIndex) => (
                                    <input
                                        key={optIndex}
                                        {...register(
                                            `questions.${index}.options.${optIndex}`,
                                            {
                                                required: "Option is required",
                                            }
                                        )}
                                        className="w-full border border-gray-300 p-2 rounded-lg mb-2"
                                        placeholder={`Option ${optIndex + 1}`}
                                    />
                                ))}
                                {errors.questions &&
                                    errors.questions[index]?.options && (
                                        <p className="text-red-500 text-sm mt-1">
                                            All options are required
                                        </p>
                                    )}
                            </div>

                            {/* Correct Answer */}
                            <div className="mb-2">
                                <label className="block text-gray-700 mb-1">
                                    Correct Answer
                                </label>
                                <input
                                    {...register(
                                        `questions.${index}.correctAnswer`,
                                        {
                                            required:
                                                "Correct answer is required",
                                        }
                                    )}
                                    className="w-full border border-gray-300 p-2 rounded-lg"
                                    placeholder="Enter correct answer"
                                />
                                {errors.questions &&
                                    errors.questions[index]?.correctAnswer && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {
                                                errors.questions[index]
                                                    ?.correctAnswer?.message
                                            }
                                        </p>
                                    )}
                            </div>
                        </div>
                    ))}

                    {/* Add Question Button */}
                    <button
                        type="button"
                        onClick={() =>
                            append({
                                questionText: "",
                                options: ["", "", "", ""],
                                correctAnswer: "",
                            })
                        }
                        className="flex items-center text-blue-500 hover:text-blue-700"
                    >
                        <FaPlus className="mr-2" />
                        Add Question
                    </button>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onRequestClose}
                        className="mr-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-[#004085] text-white px-4 py-2 rounded-lg"
                    >
                        Add Quiz
                    </button>
                </div>
            </form>
            <Toaster />
        </Modal>
    );
};

AddQuizModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    classId: PropTypes.string.isRequired,
    refetch: PropTypes.func.isRequired,
};

export default AddQuizModal;
