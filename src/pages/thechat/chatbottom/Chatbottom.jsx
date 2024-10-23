import "./chatbottom.css";
import { IoAddOutline } from "react-icons/io5";
import { IoSendOutline } from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import { useState, useEffect, useRef } from "react";

const Chatbottom = () => {
  const [open, setOpen] = useState(false); // Toggle emoji picker
  const [message, setMessage] = useState(""); // Track the textarea message
  const emojiRef = useRef(null); // To reference the EmojiPicker div

  // Handle emoji click and add it to the textarea
  const handleEmoji = (emojiObject) => {
    setMessage((prev) => prev + emojiObject.emoji); // Append emoji to the current message
  };

  // Close the emoji picker when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && emojiRef.current && !emojiRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="bottom p-2">
      <div>
      <div className="input input-bordered flex items-center gap-2 flex-wrap">
        {/* Textarea for typing */}
        <textarea
          value={message} // Controlled value for textarea
          onChange={(e) => setMessage(e.target.value)} // Update the message when typing
          className="grow textarea-primary resize-none overflow-hidden p-2 rounded-md placeholder:text-sm"
          placeholder="Type your message..."
          rows={1} // Keep it to 1 row initially
          style={{ minHeight: "30px" }} // Minimum height
        />

        {/* Emoji SVG with onClick */}
        <div className="emoji">
          <svg
          onClick={() => setOpen((prev) => !prev)} // Toggle the emoji picker
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
        

        {/* Conditionally render the EmojiPicker */}
        {open && (
          <div ref={emojiRef} className="picker">
            <EmojiPicker onEmojiClick={handleEmoji} />
          </div>
        )}

        {/* Icons */}
        <IoAddOutline size={20} />
        <IoSendOutline size={20} />
      </div>

      </div>
     
    </div>
  );
};

export default Chatbottom;