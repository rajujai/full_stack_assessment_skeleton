import { useEffect, useState } from "react";
import "./App.css";
import Homes from "./components/Homes";
import UserSelector from "./components/UserSelector";
import { useAppSelector } from "./redux/store";

export default function App() {
  const [showHomes, setShowHomes] = useState(false);
  const selectUser = useAppSelector((state) => state.user.selectedUser);
  useEffect(() => {
    selectUser ? setShowHomes(true) : setShowHomes(false);
  }, [selectUser]);
  return (
    <>
      <UserSelector />
      {showHomes && <Homes userId={selectUser?.id} />}
    </>
  );
}
