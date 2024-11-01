import Login from "./pages/Login";
import Thechat from "./pages/thechat/Thechat";
import Chatdetails from "./pages/chatdetails/Chatdetails";
import Chatlist from "./pages/list/Chatlist";
import Nav from "./pages/nav/Nav";
import Notifications from "./notifications/Notifications";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./library/firebase";
import { useUserStore } from "./library/userStore";
import { useChatStore } from "./library/chatStore";

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId  } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);
  console.log(currentUser);

  if (isLoading)
    return (
      <div className="loading ">
        Loading...
      </div>
    );

  return (
    <div className="container ">
      {currentUser ? (
        <>
          <Nav />
          <Chatlist />
          {chatId &&<Thechat />}
          {chatId && <Chatdetails />}
        </>
      ) : (
        <Login />
      )}
      <Notifications />
    </div>
  );
}

export default App;
