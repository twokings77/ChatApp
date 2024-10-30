import Login from "./pages/Login";
import Thechat from "./pages/thechat/Thechat";
import Chatdetails from "./pages/chatdetails/Chatdetails";
import Chatlist from "./pages/list/Chatlist";
import Nav from "./pages/nav/Nav";
import Notifications from "./notifications/Notifications";
function App() {
  const user = false;

  return (
    <div className="container ">
      {user ? (
        <>
          <Nav />
          <Chatlist />
          <Thechat />
          <Chatdetails />
        </>
      ) : (
        <Login />
      )}
      <Notifications/>
    </div>
  );
}

export default App;
