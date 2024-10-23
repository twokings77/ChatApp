import "./thechat.css";
import Chattop from "./chattop/Chattop";
import Chatbottom from "./chatbottom/Chatbottom";
import Chatcenter from "./chatcenter/Chatcenter";


const Thechat = () => {
  return (
    <div className="theChat">
       <Chattop/>
       <Chatcenter/>
       <Chatbottom/>
    </div>
  )
}

export default Thechat
