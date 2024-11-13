import "./thechat.css";
import Chattop from "./chattop/Chattop";
import Chatbottom from "./chatbottom/Chatbottom";
import Chatcenter from "./chatcenter/Chatcenter";
import { useState } from "react";
import { useChatStore } from "../../library/chatStore";

const Thechat = () => {
  const [messages, setMessages] = useState([]);
  const { user } = useChatStore();

  const handleSendMessage = (message) => {
    const newMessage = {
      id: Date.now(),
      text: message,
      // Add other properties as needed (e.g., sender, timestamp)
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    console.log("Sending message:", message);
  };

  return (
    <div className="theChat">
       <Chattop user={user} />
       <Chatcenter messages={messages} />
       <Chatbottom onSendMessage={handleSendMessage} />
    </div>
  )
}

export default Thechat
