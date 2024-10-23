import "./chatlist.css";
import Userinfo from "./userInfo/Userinfo";
import Userlist from "./userlist/Userlist";
import Chatsearch from "./chatsearch/Chatsearch";

const Chatlist = () => {
  return (
    <div className="chatList">
      <Userinfo />
      <Chatsearch />
      <Userlist />
    </div>
  );
};

export default Chatlist;
