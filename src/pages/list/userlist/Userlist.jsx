import { useState } from "react";
import "./userlist.css";
import Useradd from "../useradd/Useradd";
import { IoAddOutline } from "react-icons/io5";
const Userlist = () => {
  const [addMode, setAddMode] = useState(false);

  const toggleAddMode = () => {
    setAddMode((prevMode) => !prevMode);
  };

  return (
    <div className="userList flex-1 flex-col overflow-scroll p-2">
      <div className="searchBar mb-8  flex gap-6 items-center">
        <label className="input input-bordered input-sm flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
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
          <IoAddOutline size={20} className="" />
        </div>
      </div>

      {/* List of users */}
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="flex mb-8 items-center gap-5 cursor-pointer"
        >
          <div className="historyAvatar avatar online">
            <div className="w-10 rounded-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="User avatar"
              />
            </div>
          </div>
          <div className="texts">
            <span>Jane Doe</span>
            <p className="text-xs">This is the message</p>
          </div>
        </div>
      ))}

      {/* Conditionally render Useradd component */}
      {addMode && <Useradd />}
    </div>
  );
};

export default Userlist;
