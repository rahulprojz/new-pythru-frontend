import { useEffect, useState } from "react";
import Routes from "./routes/allRoutes";
import { Alert } from "./utils";
import "./App.scss";
function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const useNetwork = () => {
    const [isOnline, setNetwork] = useState(window.navigator.onLine);
    const updateNetwork = () => {
      setNetwork(window.navigator.onLine);
    };
    useEffect(() => {
      window.addEventListener("offline", updateNetwork);
      window.addEventListener("online", updateNetwork);
      const handleContextmenu = (e: any) => {
        e.preventDefault();
      };
      document.addEventListener("contextmenu", handleContextmenu);

      return () => {
        document.removeEventListener("contextmenu", handleContextmenu);
        window.removeEventListener("offline", updateNetwork);
        window.removeEventListener("online", updateNetwork);
      };
    });
    if (!isOnline) {
      //Alert(2, "No internet connection");
    }
    return isOnline;
  };
  // useEffect(() => {
  //   if (!useNetwork()) {
  //     //Alert(2, "No internet connection")
  //   }
  //   useNetwork();
  //   setIsOnline(navigator.onLine);
  // });
  return (
    <>
      {useNetwork()}
      <Routes />
    </>
  );
}

export default App;
