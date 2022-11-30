import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { useState } from "react";
import { SignInButton } from 'ethos-connect'
import { ConnectButton, useAccountBalance, useWallet, useSuiProvider } from "@suiet/wallet-kit";



import JoinGame from "./components/JoinGame";

function App() {
  const api_key = "dzeabewv2jh6";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);
  const wallet = useWallet();
  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
      });
  }
  return (
    <div className="App"> 
       <ConnectButton />

{!wallet.connected ? (
  <>
  <p>Connect DApp with Suiet wallet from now!</p></>
    
) : (
       
       
   
        <>
        <Chat client={client}>
          <JoinGame />
          <button onClick={logOut}> Log Out</button>
        </Chat> 
        
          
 

        </>
      )}    
   </div>      
  );
}

export default App;
