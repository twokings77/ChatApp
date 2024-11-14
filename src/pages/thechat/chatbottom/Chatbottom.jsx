import "./chatbottom.css";
import { IoAddOutline, IoSendOutline } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { useState, useEffect, useRef } from "react";
import { db, storage } from "../../../library/firebase";
import { updateDoc, doc, arrayUnion, Timestamp } from "firebase/firestore";
import { useUserStore } from "../../../library/userStore";
import { useChatStore } from "../../../library/chatStore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Chatbottom = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const emojiRef = useRef(null);
  const { chatId, user } = useChatStore();
  const { currentUser } = useUserStore();

  const handleImageChange = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleImageIconClick = () => {
    document.getElementById("imageInput").click();
  };

  const sendMessage = async () => {
    if (!message.trim() && !image) return;
  
    try {
      const timestamp = Timestamp.now();
      let newMessage = {
        id: Date.now(),
        text: message.trim(),
        sender: currentUser.id,
        avatar: currentUser.avatar,
        timestamp: timestamp,
        type: "text",
        status: "delivered",
      };
  
      if (image) {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);
        newMessage = {
          ...newMessage,
          type: "image",
          imgUrl: imageUrl,
        };
        setImage(null);
      }
  
      const chatRef = doc(db, "chats", chatId);
      await updateDoc(chatRef, {
        messages: arrayUnion(newMessage),
        lastMessage: {
          text: newMessage.text || "Image",
          senderId: currentUser.id,
          date: timestamp,
          status: "delivered",
        },
      });
  
      // Update userChats for both sender and receiver
      const userChatsUpdateSender = {
        chatId,
        lastMessage: newMessage.text || "Image",
        updatedAt: timestamp,
        receiverId: user.id,
        read: true,
        status: "sent",
      };
  
      const userChatsUpdateReceiver = {
        chatId,
        lastMessage: newMessage.text || "Image ",
        updatedAt: timestamp,
        receiverId: currentUser.id,
        read: false,
        status: "delivered",
      };
  
      // Update or merge chat in the `userchats` document for both users
      const userIDs = [currentUser.id, user.id];
      for (const id of userIDs) {
        const userChatsRef = doc(db, "userchats", id);
        await updateDoc(userChatsRef, {
          chats: arrayUnion(id === currentUser.id ? userChatsUpdateSender : userChatsUpdateReceiver),
        });
      }
  
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  // Function to update message status to "seen"
  const markMessageAsSeen = async () => {
    if (!chatId) return;

    try {
      const chatRef = doc(db, "chats", chatId);
      await updateDoc(chatRef, {
        messages: arrayUnion({
          id: messageId, // Replace with actual message ID
          status: "seen", // Update status to seen
          read: true, // Mark as read
        }),
      });
    } catch (error) {
      console.error("Error marking message as seen:", error);
    }
  };

  // Call markMessageAsSeen when the user opens the chat or views messages
  useEffect(() => {
    markMessageAsSeen();
  }, [chatId]);

  return (
    <div className="bottom p-2">
      <div className="input input-bordered flex items-center gap-2 flex-wrap">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="grow textarea-primary resize-none overflow-hidden p-2 rounded-md placeholder:text-sm"
          placeholder="Type your message..."
          rows={1}
          style={{ minHeight: "30px", maxHeight: "120px" }}
        />

        <div className="emoji">
          <svg
            onClick={() => setOpen((prev) => !prev)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6 opacity-70 cursor-pointer"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4 7a1 1 0 110 2 1 1 0 010-2zm-8 0a1 1 0 110 2 1 1 0 010-2zm-1.45 5.723a.5.5 0 01.89-.448C8.87 15.838 10.347 16.5 12 16.5c1.653 0 3.13-.662 4.56-2.225a.5.5 0 01.89.448C16.46 16.732 14.8 17.5 12 17.5s-4.46-.768-5.45-2.777z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {open && (
          <div ref={emojiRef} className="picker">
            <EmojiPicker onEmojiClick={(emoji) => setMessage(message + emoji.emoji)} />
          </div>
        )}

        <div onClick={sendMessage} className="cursor-pointer">
          <IoSendOutline size={20} />
        </div>

        <div onClick={handleImageIconClick} className="addImage cursor-pointer">
          <IoAddOutline size={20} />
        </div>

        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default Chatbottom;