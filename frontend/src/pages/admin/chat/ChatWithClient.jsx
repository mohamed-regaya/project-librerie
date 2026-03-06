import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { saveMessage } from "../../../../redux/slices/chatSlice";

import { MdAdminPanelSettings } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

const socket = io("http://localhost:8000");

function AdminChat() {
  const dispatch = useDispatch();
  const { chatMessages } = useSelector((state) => state.chat);

  const [reply, setReply] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    socket.emit("join_admin");

    socket.on("admin_recieve_message", (data) => {
      dispatch(
        saveMessage({
          userId: data.userId,
          message: data.message,
          admin: false,
        }),
      );

      setSelectedUser(data.userId);
    });

    return () => socket.off("admin_recieve_message");
  }, [dispatch]);

  const sendReply = () => {
    if (!reply.trim() || !selectedUser) return;

    socket.emit("admin_send_message", {
      userId: selectedUser,
      message: reply,
    });

    dispatch(
      saveMessage({
        userId: selectedUser,
        message: reply,
        admin: true,
      }),
    );

    setReply("");
  };

  /* -------- USERS LIST -------- */
  console.log(chatMessages);
  const users = [...new Set(chatMessages.map((msg) => msg.userId))];

  /* -------- CURRENT CHAT -------- */

  const currentChat = chatMessages.filter((msg) => msg.userId === selectedUser);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* USERS LIST */}

      <div className="w-64 bg-white border-r">
        <div className="p-4 font-semibold border-b">Active Users</div>

        {users.map((user) => (
          <div
            key={user}
            onClick={() => setSelectedUser(user)}
            className={`p-3 cursor-pointer flex items-center gap-2 hover:bg-gray-100 ${
              selectedUser === user && "bg-gray-200"
            }`}
          >
            <FaUserCircle />
            {user}
          </div>
        ))}
      </div>

      {/* CHAT WINDOW */}

      <div className="flex flex-col flex-1 max-w-md mx-auto bg-white shadow-xl">
        {/* Header */}

        <div className="flex items-center gap-3 p-4 bg-indigo-600 text-white">
          <MdAdminPanelSettings size={24} />
          <div>
            <h2 className="font-semibold">
              Chat with {selectedUser || "User"}
            </h2>
          </div>
        </div>

        {/* Messages */}

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {currentChat.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.admin ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-start gap-2 max-w-xs ${
                  msg.admin ? "flex-row-reverse" : ""
                }`}
              >
                {msg.admin ? (
                  <MdAdminPanelSettings size={22} />
                ) : (
                  <FaUserCircle size={22} />
                )}

                <div
                  className={`px-4 py-2 rounded-2xl text-sm shadow ${
                    msg.admin ? "bg-indigo-600 text-white" : "bg-gray-200"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}

        {selectedUser && (
          <div className="p-3 border-t flex items-center gap-2">
            <input
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className="flex-1 border rounded-full px-4 py-2"
              placeholder="Reply..."
              onKeyDown={(e) => e.key === "Enter" && sendReply()}
            />

            <button
              onClick={sendReply}
              className="bg-indigo-600 text-white p-3 rounded-full"
            >
              <FiSend />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminChat;
