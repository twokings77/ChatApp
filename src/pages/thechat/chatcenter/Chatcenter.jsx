import { useState } from "react";
import "./chatcenter.css";

const Chatcenter = () => {
  // State to track the message status (delivered or seen)
  const [status, setStatus] = useState("delivered"); // "delivered" or "seen"

  // Dummy data: message types, including both image and text
  const messages = [
    {
      id: 1,
      type: "text",
      text: "You were the Chosen One!",
      time: "12:45",
      sender: "other",
    },
    {
      id: 2,
      type: "image",
      imgUrl: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      text: "Look at this cool picture!", // Adding text to an image message
      time: "12:46",
      sender: "self",
    },
    {
      id: 3,
      type: "text",
      text: "I hate you!",
      time: "12:46",
      sender: "self",
    },
  ];

  return (
    <div className="flex-1 flex flex-col p-2 h-full overflow-y-scroll">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`chat mb-8 ${
            message.sender === "self" ? "chat-end chatOwn" : "chat-start"
          }`}
        >
          {/* Show avatar for other users */}
          {message.sender === "other" && (
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
          )}

          {/* Chat bubble logic */}
          <div className="chat-bubble flex flex-col">
            {/* Show image if message contains one */}
            {message.type === "image" && (
              <img
                src={message.imgUrl}
                alt="Sent Image"
                className="max-w-xs rounded-lg mb-2"
              />
            )}
            
            {/* Show text if message contains text */}
            {message.text && (
              <p className="text-sm">{message.text}</p>
            )}

            {/* Time at the bottom right */}
            <time className="text-xs opacity-50 ml-auto">{message.time}</time>
          </div>

          {/* Conditionally show status for own messages */}
          {message.sender === "self" && (
            <div className="chat-footer opacity-50">
              {status === "delivered" ? "Delivered at 12:46" : "Seen at 12:46"}
            </div>
          )}
        </div>
      ))}

      {/* Button to simulate toggling between Delivered and Seen */}
      <button
        className="mt-2 text-xs text-blue-500"
        onClick={() => setStatus((prev) => (prev === "delivered" ? "seen" : "delivered"))}
      >
        Toggle Status
      </button>
    </div>
  );
};

export default Chatcenter;