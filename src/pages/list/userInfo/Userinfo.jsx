import "./userinfo.css";
import { IoFilterOutline } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";

const Userinfo = () => {
  return (
    <div className="Userinfo">
      <div className="avatarAndName">
      <div className="avatar placeholder">
        <div className="bg-neutral text-neutral-content w-10 rounded-full">
          <span className="text-xl md:text-2xl sm:text-xl">D</span>
        </div>
        <h2 className=" ">John Doe </h2>
      </div>{" "}

      </div>
      <div className="icons flex  space-x-2">
      <div className="actionIcons text-3xl md:text-2xl sm:text-xl">
        <IoEllipsisHorizontalOutline size={15} />
      </div>
      <div className="actionIcons text-3xl md:text-2xl sm:text-xl">
        <IoFilterOutline size={15} />
      </div>
      <div className="actionIcons text-3xl md:text-2xl sm:text-xl">
        <IoCreateOutline size={15} />
      </div>

      </div>
     
     
    </div>
  );
};

export default Userinfo;
