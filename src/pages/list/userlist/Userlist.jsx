import { useEffect, useState, useRef } from "react";
import "./userlist.css";
import Useradd from "../useradd/Useradd";
import { IoCreateOutline } from "react-icons/io5";
import { db } from "../../../library/firebase";
import { useUserStore } from "../../../library/userStore";
import {
  doc,
  onSnapshot,
  getDoc,
  updateDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";
import { useChatStore } from "../../../library/chatStore";

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();
  const userAddRef = useRef(null);

  useEffect(() => {
    if (!currentUser?.id) return;

    const userChatsRef = doc(db, "userchats", currentUser.id);

    const unsubscribe = onSnapshot(userChatsRef, async (snapshot) => {
      const items = snapshot.data()?.chats || [];

      // Fetch user details and remove duplicates
      const promises = items.map(async (item) => {
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);
        const userData = userDocSnap.exists() ? userDocSnap.data() : null;
        return {
          ...item,
          user: userData,
          lastMessage: item.lastMessage || "",
          updatedAt: item.updatedAt || Date.now(), // Fallback for updatedAt if missing
          read: item.read || false, // Add read status
          status: item.status || "delivered", // Add status
        };
      });

      const chatData = await Promise.all(promises);

      // Use a Map to remove duplicates based on chatId
      const uniqueUsersMap = new Map();
      chatData.forEach((chat) => {
        if (chat.user && chat.user.id !== currentUser.id) {
          uniqueUsersMap.set(chat.chatId, chat);
        }
      });

      // Set unique users by converting the Map back to an array and sorting by updatedAt
      const uniqueUsers = Array.from(uniqueUsersMap.values()).sort(
        (a, b) => b.updatedAt - a.updatedAt
      );
      setUsers(uniqueUsers);
    });

    return () => unsubscribe();
  }, [currentUser?.id]);

  const handleSelect = async (chat) => {
    changeChat(chat.chatId, chat.user);
    
    // Mark messages as read when the chat is selected
    await updateDoc(doc(db, "userchats", currentUser.id), {
      chats: arrayUnion({
        ...chat,
        read: true, // Mark as read
        status: "seen", // Update status to seen
      }),
    });
  };

  const toggleAddMode = () => {
    setAddMode((prevMode) => !prevMode);
  };

  const handleUserAdded = async (newUser) => {
    const userExists = users.some((chat) => chat.user.id === newUser.id);
    if (!userExists) {
      const newChat = {
        receiverId: newUser.id,
        chatId: newUser.chatId,
        lastMessage: "",
        updatedAt: Date.now(),
      };

      try {
        const userChatsRef = doc(db, "userchats", currentUser.id);
        await updateDoc(userChatsRef, {
          chats: arrayUnion(newChat),
        });
      } catch (error) {
        console.error("Error adding new chat:", error);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userAddRef.current && !userAddRef.current.contains(event.target)) {
        setAddMode(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userAddRef]);

  // Filter users based on search query
  const filteredUsers = users.filter((chat) =>
    chat.user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="userList flex-1 flex-col overflow-scroll p-2">
      <div className="searchBar mb-8 flex gap-6 items-center">
        <label className="input input-bordered input-sm flex items-center gap-2">
          <input 
            type="text" 
            className="grow" 
            placeholder="Search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70 cursor-pointer"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <div
          onClick={toggleAddMode}
          className="hover:text-primary cursor-pointer transition-colors duration-200"
        >
          <IoCreateOutline size={20}  />
        </div>
      </div>

      {filteredUsers.map((chat) => (
        <div
          className={`flex mb-8 items-center gap-5 cursor-pointer hover:bg-base-200 p-2 rounded-lg transition-colors duration-200 ${
            chatId === chat.chatId ? "bg-base-200" : ""
          } ${chat.lastMessage.senderId !== currentUser.id && chat.status === "delivered" && !chat.read ? "bg-neutral-600" : "bg-transparent"}`}
          key={chat.chatId} // Using chatId as the unique key
          onClick={() => handleSelect(chat)}
        >
          <div className="historyAvatar avatar online">
            <div className="w-10 rounded-full">
              <img
                src={
                  chat.user.avatar ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                alt="User avatar"
              />
            </div>
          </div>
          <div className="texts flex-1">
            <div className="flex justify-between items-center">
              <span className="font-medium">{chat.user.username.charAt(0).toUpperCase() + chat.user.username.slice(1) || "Jane Doe"}</span>
              {chat.updatedAt && (
                <span className="text-xs text-gray-500">
                  {chat.updatedAt instanceof Timestamp
                    ? chat.updatedAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
                    : new Date(chat.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
                  }
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 truncate">
              {chat.lastMessage || "No messages yet"}
            </p>
          </div>
        </div>
      ))}

      {addMode && (
        <div ref={userAddRef}>
          <Useradd onUserAdded={handleUserAdded} />
        </div>
      )}
    </div>
  );
};

export default Userlist;