import "./chatlist.css";
import Userinfo from "./userInfo/Userinfo";
import Userlist from "./userlist/Userlist";
import Useradd from "./useradd/Useradd";

const Chatlist = () => {
  return (
    <div className="chatList">
      <Userinfo />
      <Userlist />
    </div>
  );
};

export default Chatlist;
