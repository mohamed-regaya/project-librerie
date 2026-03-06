import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { FiSend } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { saveMessage } from "../../../../redux/slices/chatSlice";

const socket = io("http://localhost:8000");

export default function ChatWithAdmin() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { chatMessages } = useSelector((state) => state.chat);
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  function sendMessage() {
    if (!message.trim()) return;

    const msgData = {
      userId: user._id,
      message,
      sender: "user",
    };
    dispatch(saveMessage(msgData));
    socket.emit("client_send_message", msgData);

    setMessages((prev) => [...prev, msgData]);
    setMessage("");
  }

  function fetchOldMessages() {
    if (chatMessages && chatMessages.length > 0) {
      setMessages(chatMessages);
    }
  }

  useEffect(() => {
    socket.emit("join_user", user._id);
    fetchOldMessages();
    socket.on("client_recieve_message", (data) => {
      dispatch(saveMessage({ message: data.message, sender: "admin" }));
      setMessages((prev) => [
        ...prev,
        { message: data.message, sender: "admin" },
      ]);
    });

    return () => socket.off("client_recieve_message");
  }, []);

  useEffect(() => {
    //messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md h-[600px] bg-white shadow-xl rounded-2xl flex flex-col border">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 bg-blue-600 text-white rounded-t-2xl">
          <MdAdminPanelSettings size={24} />
          <div>
            <h2 className="font-semibold">Admin Support</h2>
            <p className="text-xs text-green-300">Online</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start gap-2 max-w-xs ${
                  msg.sender === "user" ? "flex-row-reverse" : ""
                }`}
              >
                {msg.sender === "user" ? (
                  <FaUserCircle size={22} className="text-gray-500" />
                ) : (
                  <MdAdminPanelSettings size={22} className="text-blue-600" />
                )}

                <div
                  className={`px-4 py-2 rounded-2xl text-sm shadow ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 p-3 border-t">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Type your message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition"
          >
            <FiSend size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
