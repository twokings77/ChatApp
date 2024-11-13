// import { useEffect, useState } from "react";
// import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
// import { db } from "../../../library/firebase";
// import { useUserStore } from "../../../library/userStore";

// const MessageList = ({ chatId }) => {
//   const [messages, setMessages] = useState([]);
//   const { currentUser } = useUserStore();

//   useEffect(() => {
//     if (!chatId) return;

//     const q = query(
//       collection(db, "messages"),
//       where("chatId", "==", chatId),
//       orderBy("timestamp", "asc")
//     );

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const messageList = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setMessages(messageList);
//     });

//     return () => unsubscribe();
//   }, [chatId]);

//   return (
//     <div className="messages-container">
//       {messages.map((message) => (
//         <div
//           key={message.id}
//           className={`message ${
//             message.senderId === currentUser.id ? "sent" : "received"
//           }`}
//         >
//           <p>{message.text}</p>
//           <span className="timestamp">
//             {message.timestamp?.toDate().toLocaleTimeString()}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MessageList; 


