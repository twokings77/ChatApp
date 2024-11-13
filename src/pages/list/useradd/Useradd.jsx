import React, { useState } from "react";
import "./useradd.css";
import { db } from "../../../library/firebase";
import { collection, query, where, getDocs, setDoc, serverTimestamp, doc, updateDoc, arrayUnion } from "firebase/firestore";import { useUserStore } from "../../../library/userStore";

const Useradd = React.forwardRef(({ onUserAdded }, ref) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const { currentUser } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUser(users[0]); // Set the found user
      } else {
        setUser(null); // No user found
      }
    } catch (error) {
      console.error("Error finding user:", error);
    }
  };

  const handleAdd = async () => {
    if (!user || !currentUser) return;
  
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");
  
    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });
      console.log("New chat created with ID:", newChatRef.id);
  
      const chatDataForUser = {
        chatId: newChatRef.id,
        lastMessage: "",
        receiverId: user.id,
      };
  
      const chatDataForCurrentUser = {
        chatId: newChatRef.id,
        lastMessage: "",
        receiverId: currentUser.id,
      };
  
      // Log before updating Firestore to verify data structure
      console.log("Updating Firestore for user:", chatDataForUser);
      console.log("Updating Firestore for current user:", chatDataForCurrentUser);
  
      // Update userChats collections for both users
      await setDoc(doc(userChatsRef, user.id), { chats: arrayUnion(chatDataForUser) }, { merge: true });
      await setDoc(doc(userChatsRef, currentUser.id), { chats: arrayUnion(chatDataForCurrentUser) }, { merge: true });
  
      // New addition: Automatically add User 1 to User 2's chat list
      const chatDataForUser2 = {
        chatId: newChatRef.id,
        lastMessage: "",
        receiverId: currentUser.id, // User 1's ID
      };
  
      await setDoc(doc(userChatsRef, user.id), { chats: arrayUnion(chatDataForUser2) }, { merge: true });
  
      console.log("Successfully updated Firestore");
  
      // Notify the Userlist that a user has been added
      onUserAdded({ ...user, chatId: newChatRef.id });
  
      setUsername(""); // Clear input field after adding
      setUser(null); // Reset the user state
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user. Please try again."); // User feedback
    }
  };

  return (
    <div className="userAdd p-4" ref={ref}>
      <form className="card-body gap-6" onSubmit={handleSearch}>
        <div className="form-control flex flex-row items-center justify-center gap-3">
          <input
            type="text"
            placeholder="Search username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered"
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>

      {user && (
        <div className="flex flex-col mt-4 adding">
          <div className="flex items-center gap-4 justify-between">

            <div className="flex gap-2 items-center pl-4">
            <img
              src={user.avatar || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
              alt="User avatar"
              className="w-10 h-10 rounded-full"
            />
            <span>{user.username}</span>

            </div>
           <div className="addbtn">
            
           </div>
            <button onClick={handleAdd} className="btn btn-primary ">
              Add
            </button>
          </div>
        </div>
      )}

      {!user && username && (
        <div className="mt-4 text-red-500">No user found</div>
      )}
    </div>
  );
});

export default Useradd;