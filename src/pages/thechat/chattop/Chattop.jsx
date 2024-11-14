import { useState } from "react"; // Import useState for state management
import "./chattop.css";
import { IoCallOutline } from "react-icons/io5";
import { IoVideocamOutline } from "react-icons/io5";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";

// Function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
    if (!string) return ""; // Handle empty strings
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const Chattop = ({ user }) => {
    const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev); // Toggle dropdown visibility
    };

    return (
        <div className="chatTop flex justify-between items-center p-4">
            <div className="flex items-center gap-4"> 
                <div className="avatar online">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden">
                        <img 
                            src={user?.avatar || "default-avatar-url"}
                            alt="Avatar" 
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
                <div className="texts">
                    <span className="userName">{capitalizeFirstLetter(user?.username || "Unknown User")}</span>
                    <p className="text-xs status">{user?.status || "Offline"}</p>
                </div>
            </div>
            <div className="inchatCallOptions flex items-center space-x-4">
                <div className="actionIcons text-3xl">
                    <IoCallOutline size={20} />
                </div>
                <div className="actionIcons text-3xl">
                    <IoVideocamOutline size={20} />
                </div>
                <div className="relative"> {/* Added relative position for dropdown positioning */}
                    <IoEllipsisHorizontalOutline size={20} onClick={toggleDropdown} />
                    {/* Dropdown Menu */}
                    {showDropdown && (
                        <div className="dropdownMenu absolute left-0 mt-2 w-32 shadow-md rounded-md z-10">
                            <ul className="flex flex-col menu dropdown-content bg-base-100 rounded-box z-[1] w-51 p-2 shadow">
                                <li className="p-2 hover:bg-primary cursor-pointer">
                                    Action 1
                                </li>
                                <li className="p-2 hover:bg-primary cursor-pointer">
                                    Action 2
                                </li>
                                <li 
                                    className="p-2 hover:bg-primary cursor-pointer text-orange-600" 
                                >
                                    Block user
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chattop;