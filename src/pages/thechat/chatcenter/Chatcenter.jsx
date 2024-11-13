import { useState, useEffect, useRef } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../library/firebase";
import { useChatStore } from '../../../library/chatStore';
import { useUserStore } from '../../../library/userStore';
import "./chatcenter.css";

const Chatcenter = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const lastMessageRef = useRef(null);
  const { chatId } = useChatStore();
  const { currentUser } = useUserStore();

  useEffect(() => {
    if (!chatId) return;

    const unsubscribe = onSnapshot(doc(db, "chats", chatId), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setMessages(data.messages || []);
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching chat data:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [chatId]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (loading) return <p>Loading messages...</p>;

  if (!chatId) return <p>Select a chat to start messaging...</p>;

  const currentUserId = currentUser ? currentUser.id : null;

  console.log("Messages:", messages);
  console.log("Current User ID:", currentUserId);

  return (
    <div className="chatCenter flex-1 flex flex-col p-2 h-full overflow-y-scroll">
      {messages.map((message, index) => (
        <div
          key={message.id}
          className={`chat mb-8 ${message.sender === currentUserId ? "chat-end chatOwn" : "chat-start"}`}
          ref={index === messages.length - 1 ? lastMessageRef : null}
        >
          {message.sender !== currentUserId && (
            <div className="chat-image avatar">
              <img src={message.avatar || "default-avatar-url"} alt="Avatar" className="w-10 rounded-full" />
            </div>
          )}
          <div className="chat-bubble flex flex-col">
            {message.type === "image" && (
              <img src={message.imgUrl} alt="Sent Image" className="max-w-xs rounded-lg mb-2" />
            )}
            {message.text && <p className="text-sm">{message.text}</p>}
            <time className="text-xs opacity-50 ml-auto">{message.time}</time>
          </div>
          {message.sender === currentUserId && (
            <div className="chat-footer opacity-50">
              {message.status === "delivered" ? "Delivered" : "Seen"}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Chatcenter;