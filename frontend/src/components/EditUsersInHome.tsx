import { useDispatch } from "react-redux";
import {
  resetEditingHomeId,
  resetHome,
  updateHome,
} from "../redux/slice/homeSlice";
import { useAppSelector } from "../redux/store";
import {
  useGetUsersByHomeIdQuery,
  useUpdateUsersInHomeMutation,
} from "../services/api";
import { UpdateUsersInHomePayload } from "../services/types";
import "../styles/editUsersInHome.css";

export default function EditUsersInHome({ homeId = 0, homeAddress = "" }) {
  const dispatch = useDispatch();
  const { data: users, isLoading } = useGetUsersByHomeIdQuery(homeId);
  const [updateUsersInHome, { isLoading: updatingUsers, isSuccess, isError }] =
    useUpdateUsersInHomeMutation();
  const allUsers = useAppSelector((state) => state.user.users);
  const selectedUsers = new Set(users?.map((user) => user.id));
  const updateCheckbox = (id: number) => {
    selectedUsers.has(id) ? selectedUsers.delete(id) : selectedUsers.add(id);
  };
  const saveUsers = async () => {
    try {
      const payload: UpdateUsersInHomePayload = {
        homeId: homeId,
        userIds: Array.from(selectedUsers),
      };
      const updatedHome = await updateUsersInHome(payload).unwrap();
      selectedUsers.clear();
      updatedHome.users?.forEach((user) => selectedUsers.add(user.id));
      dispatch(updateHome(updatedHome));
    } catch (err) {
      console.log("error", err);
    }
  };
  const cancelEditing = () => {
    dispatch(resetEditingHomeId());
    dispatch(resetHome());
  };

  console.log(users, selectedUsers);
  return (
    <div className="edit-users p-2">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-1/4 min-w-fit flex justify-center flex-col">
          <p className="text-xl">Update users associated with {homeAddress}</p>
          {isSuccess ? setTimeout(() => cancelEditing(), 5000) : null}
          {allUsers?.map(({ id, username }) => (
            <div key={id} className="grid grid-cols-2 p-3 text-2xl">
              <input
                className="w-6 mx-auto"
                type="checkbox"
                id={`${id}`}
                defaultChecked={selectedUsers.has(id)}
                onChange={() => updateCheckbox(id)}
              />
              <h2 className="">{username}</h2>
            </div>
          ))}
          {isSuccess && <p>Home updated successfully!</p>}
          {isError && <p>Error updating home!</p>}
          <div className="grid grid-cols-2 gap-2">
            <button onClick={saveUsers} disabled={updatingUsers}>
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button onClick={cancelEditing}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
