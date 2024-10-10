import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPrivate from "../../CustomHooks/useAxiosPrivate";

// Connect to Socket.io server
const socket = io.connect("http://localhost:3000");

const ChatTab = ({ classroomId }) => {
    const { user } = useContext(AuthContext);
    const sender = user.email;
    const [messages, setMessages] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        socket.emit("joinClassroom", classroomId);

        socket.on("chatHistory", (history) => {
            setMessages(history);  
        });

        socket.on("receiveMessage", (newMessage) => {

            const isCurrentUser = newMessage.sender === sender;
            const formattedMessage = {
                ...newMessage,
                sender: isCurrentUser ? "You" : newMessage.sender,
            };


            setMessages((prevMessages) => [...prevMessages, formattedMessage]);
        });


        return () => {
            socket.off("receiveMessage");
        };
    }, [classroomId, sender]);


    const onSubmit = (data) => {
        if (data.message.trim()) {
            const newMessage = {
                sender,
                text: data.message,
                time: new Date().toLocaleTimeString(),
            };

            const newChat = {
                classroomId,
                message: [newMessage],
            }
            console.log(newChat);

            axiosPrivate.patch("/chats", newChat)
                .then(res => {
                    console.log('Chat updated successfully:', res.data);
                })
                .catch(err => {
                    console.error('Error sending message:', err.response ? err.response.data : err.message);
                });


            socket.emit("sendMessage", { classroomId, message: newMessage });

            reset();
        }
    };

    return (
        <div className="bg-white p-6 shadow rounded-lg mb-6 flex flex-col h-[400px]">
            <h2 className="text-2xl font-semibold mb-4">Chat</h2>
            <div className="flex-grow overflow-y-auto p-3 border border-gray-300 rounded-lg">
                <ul className="space-y-3">
                    {messages.map((message, index) => (
                        <li key={index} className="flex items-start p-3 bg-gray-100 rounded-lg">
                            <div>
                                <p className="font-semibold">{message.sender === sender ? "You" : message.sender}</p>
                                <p className="text-gray-600">{message.text}</p>
                                <p className="text-xs text-gray-500">{message.time}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                <textarea
                    className="w-full p-3 rounded-lg border shadow-sm"
                    placeholder="Type your message..."
                    {...register("message", { required: true })}
                ></textarea>
                <button
                    className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg"
                    type="submit"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatTab;

ChatTab.propTypes = {
    classroomId: PropTypes.string.isRequired,
};
