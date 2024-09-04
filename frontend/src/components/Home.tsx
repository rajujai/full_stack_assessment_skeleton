import { updateHomeEditMode } from "../redux/slice/homeSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import EditUsersInHome from "./EditUsersInHome";

export default function Home({ id = 0, streetAddress = "" }) {
  const dispatch = useAppDispatch();
  const homeUsersEditMode = useAppSelector((state) => state.home.homeEditMode);
  return (
    <>
      <div>{streetAddress}</div>
      <button onClick={() => dispatch(updateHomeEditMode(true))}>Edit</button>
      {homeUsersEditMode && <EditUsersInHome homeId={id} />}
    </>
  );
}
