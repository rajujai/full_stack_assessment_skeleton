import { updateEditingHomeId } from "../redux/slice/homeSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Home } from "../services/types";
import EditUsersInHome from "./EditUsersInHome";

export default function HomeBox({
  id,
  streetAddress,
  state,
  zip,
  sqft,
  beds,
  baths,
  listPrice
}: Home) {
  const dispatch = useAppDispatch();
  const editingHomeId = useAppSelector((state) => state.home.editingHomeId);
  return (
    <div className="min-w-64 text-left m-2.5">
      <ul className="">
        <li className="p-1"><h1 className="text-xl font-extrabold">{streetAddress}</h1></li>
        <li className="p-1">List Price : ${listPrice}</li>
        <li className="p-1">State : {state}</li>
        <li className="p-1">Zip : {zip}</li>
        <li className="p-1">SQFT : {sqft}</li>
        <li className="p-1">Beds : {beds}</li>
        <li className="p-1">Baths : {baths}</li>
      </ul>
      <button className="w-full" onClick={() => dispatch(updateEditingHomeId(id))}>Edit Users</button>
      {editingHomeId === id && <EditUsersInHome homeId={id} homeAddress={streetAddress} />}
    </div>
  );
}
