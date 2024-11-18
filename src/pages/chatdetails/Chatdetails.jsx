import "./chatdetails.css";
import { useState } from "react";
import {
  IoChevronDownOutline,
  IoSearchOutline,
  IoChevronUpOutline,
  IoNotificationsOutline,
  IoPersonOutline,
  IoSettingsOutline,
  IoNotificationsOffOutline,
} from "react-icons/io5";

const Chatdetails = () => {
  // State to manage visibility of the search input
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // State to manage visibility of the SharedTypes section
  const [isSharedVisible, setIsSharedVisible] = useState(false);

  // State to manage notification icon
  const [notificationsOn, setNotificationsOn] = useState(true);

  // Toggle search input visibility
  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  // Toggle shared section visibility
  const toggleShared = () => {
    setIsSharedVisible(!isSharedVisible);
  };

  // Toggle notifications icon
  const toggleNotifications = () => {
    setNotificationsOn(!notificationsOn);
  };

  return (
    <div className="chatDetails flex flex-col">
      {/* User Section */}
      <div
        className="user flex flex-col items-center p-2 justify-center gap-2"
        style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.132)" }}
      >
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content w-16 rounded-full">
            <span className="text-3xl">D</span>
          </div>
        </div>
        <h1 className="name">John Doe</h1>
        <p>User Description</p>
        <div className="flex gap-4">
          <div
            className="skeleton h-10 w-10 flex items-center justify-center"
            onClick={toggleNotifications}
          >
            {notificationsOn ? (
              <IoNotificationsOutline size={20} className="" />
            ) : (
              <IoNotificationsOffOutline size={20} className="text-red-500" />
            )}
          </div>
          <div className="skeleton h-10 w-10 flex items-center justify-center">
            <IoPersonOutline size={20} className="" />
          </div>
          <div className="skeleton h-10 w-10 flex items-center justify-center">
            <IoSettingsOutline size={20} className="" />
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="info flex flex-col gap-4">
        <div className="option">
          <div
            className="title flex items-center justify-between p-2 mb-4"
            style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.132)" }}
          >
            <span>Search files</span>
            {/* Search Icon - Toggle search input */}
            <IoSearchOutline
              size={20}
              onClick={toggleSearch}
              className="cursor-pointer"
            />
          </div>

          {/* Conditionally render search input based on state */}
          {isSearchVisible && (
            <div className="searchChat p-1">
              <input
                type="text"
                placeholder="Type here"
                className="input input-sm mb-2 input-bordered w-full max-w-xs"
              />
            </div>
          )}
        </div>

        <div className="option">
          <div className="title flex items-center justify-between p-2">
            <span>Shared</span>
            {/* Conditionally render chevrons and toggle shared visibility */}
            {isSharedVisible ? (
              <IoChevronUpOutline
                size={20}
                onClick={toggleShared}
                className="cursor-pointer"
              />
            ) : (
              <IoChevronDownOutline
                size={20}
                onClick={toggleShared}
                className="cursor-pointer"
              />
            )}
          </div>

          {/* Conditionally render SharedTypes based on state */}
          {isSharedVisible && (
            <div className="SharedTypes flex gap-4 items-center justify-center">
              <div role="tablist" className="tabs tabs-lifted">
                <a role="tab" className="tab">
                  Media
                </a>
                <a role="tab" className="tab tab-active">
                  Links
                </a>
                <a role="tab" className="tab">
                  Docs
                </a>
                <div className="itemsInShared "></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatdetails;