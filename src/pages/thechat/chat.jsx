// import React, { useState } from 'react';
// import Chatbottom from './Chatbottom';

// const Chat = () => {
//   const [messages, setMessages] = useState([]);

//   const handleSendMessage = (newMessage) => {
//     if (!newMessage.trim()) return; // Prevent empty messages
    
//     setMessages(prev => [...prev, {
//       id: Date.now(),
//       text: newMessage,
//       sender: 'user', // Add sender information
//       timestamp: new Date().toLocaleTimeString(),
//     }]);
//   };

//   return (
//     <div className="chat-container">
//       {/* Messages display area */}
//       <div className="messages-container">
//         {messages.map(message => (
//           <div 
//             key={message.id} 
//             className={`message ${message.sender === 'user' ? 'message-user' : 'message-other'}`}
//           >
//             <div className="message-text">{message.text}</div>
//             <div className="message-timestamp">{message.timestamp}</div>
//           </div>
//         ))}
//       </div>
      
//       <Chatbottom onSendMessage={handleSendMessage} />
//     </div>
//   );
// };
