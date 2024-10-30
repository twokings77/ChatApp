import { useState, useEffect, useRef } from "react";
import "./chatcenter.css";

const Chatcenter = () => {
  const [status, setStatus] = useState("delivered");
  const lastMessageRef = useRef(null);

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
      imgUrl:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
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

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col p-2 h-full overflow-y-scroll">
      {messages.map((message, index) => (
        <div
          key={message.id}
          className={`chat mb-8 ${
            message.sender === "self" ? "chat-end chatOwn" : "chat-start"
          }`}
          ref={index === messages.length - 1 ? lastMessageRef : null}
        >
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

          <div className="chat-bubble flex flex-col">
            {message.type === "image" && (
              <img
                src={message.imgUrl}
                alt="Sent Image"
                className="max-w-xs rounded-lg mb-2"
              />
            )}
            {message.text && <p className="text-sm">{message.text}</p>}
            <time className="text-xs opacity-50 ml-auto">{message.time}</time>
          </div>

          {message.sender === "self" && (
            <div className="chat-footer opacity-50">
              {status === "delivered" ? "Delivered at 12:46" : "Seen at 12:46"}
            </div>
          )}
        </div>
      ))}

      <button
        className="mt-2 text-xs text-blue-500"
        onClick={() =>
          setStatus((prev) => (prev === "delivered" ? "seen" : "delivered"))
        }
      >
        Toggle Status
      </button>
    </div>
  );
};

export default Chatcenter;
