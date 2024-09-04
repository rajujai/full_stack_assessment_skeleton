import { useDispatch } from "react-redux";
import { updateHomeEditMode } from "../redux/slice/homeSlice";
import { useAppSelector } from "../redux/store";
import {
  useGetUsersByHomeIdQuery,
  useUpdateUsersInHomeMutation,
} from "../services/api";
import { UpdateUsersInHomePayload } from "../services/types";

export default function EditUsersInHome({ homeId = 0 }) {
  const dispatch = useDispatch();
  const { data: users, isLoading } = useGetUsersByHomeIdQuery(homeId);
  const [updateUsersInHome, { isLoading: updatingUsers, isSuccess, isError }] =
    useUpdateUsersInHomeMutation();
  const allUsers = useAppSelector((state) => state.user.users);
  const selectedUsers = users?.map((user) => user.id);
  const updateCheckbox = (id: number) => {
    selectedUsers?.includes(id)
      ? selectedUsers.filter((_id) => _id !== id)
      : selectedUsers?.push(id);
  };
  const saveUsers = async () => {
    try {
      const payload: UpdateUsersInHomePayload = {
        homeId: homeId,
        userIds: selectedUsers,
      };
      const updatedHome = await updateUsersInHome(payload).unwrap();
      console.log("updatedHome", updatedHome);
    } catch (err) {
      console.log("error", err);
    }
  };
  const cancelEditing = () => dispatch(updateHomeEditMode(false));
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {isSuccess ? setTimeout(() => cancelEditing(), 1000) : null}
          {allUsers?.map(({ id, username }) => (
            <div key={id}>
              <input
                type="checkbox"
                id={`${id}`}
                defaultChecked={selectedUsers?.includes(id)}
                onChange={() => updateCheckbox(id)}
              />
              <h3>{username}</h3>
            </div>
          ))}
          {isSuccess && <p>Home updated successfully!</p>}
          {isError && <p>Error updating home!</p>}
          <button onClick={saveUsers} disabled={updatingUsers}>
            {isLoading ? "Saving..." : "Save"}
          </button>
          <button onClick={cancelEditing}>Cancel</button>
        </div>
      )}
    </>
  );
}
