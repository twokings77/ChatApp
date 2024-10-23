import "./chattop.css";
import { IoCallOutline } from "react-icons/io5";
import { IoVideocamOutline } from "react-icons/io5";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";


const Chattop = () => {
  return (
    <div className="chatTop flex justify-between items-center p-4">
      <div className="flex items-center gap-4"> 
        <div className="avatar online">
          <div className="w-10 h-19 flex items-center justify-center rounded-full overflow-hidden">
            <img 
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
              alt="Avatar" 
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="texts">
          <span>Jane Doe</span>
          <p className="text-xs">Lorem, ipsum.</p>
        </div>
      </div>
      <div className="inchatCallOptions flex items-center space-x-4">
        <div className="actionIcons text-3xl md:text-2xl sm:text-xl">
          <IoCallOutline size={20} />
        </div>
        <div className="actionIcons text-3xl md:text-2xl sm:text-xl">
          <IoVideocamOutline size={20} />
        </div>
        <div className="actionIcons text-3xl md:text-2xl sm:text-xl">
        <IoEllipsisHorizontalOutline size={20} />
      </div>
      </div>
    </div>
  );
};

export default Chattop;