
import Login from "./pages/Login"
import Thechat from "./pages/thechat/Thechat"
import Chatdetails from "./pages/chatdetails/Chatdetails";
import Chatlist from "./pages/list/Chatlist"
import Nav from "./pages/nav/Nav"
function App() {
  return (
    <div className="container ">
      <Nav/>
      <Login/>
      <Chatlist/>
      <Thechat/>
      <Chatdetails/>

      
    </div>
  );
}

export default App;
