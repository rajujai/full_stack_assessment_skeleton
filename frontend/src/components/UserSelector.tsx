import { useState } from "react";
import { updateHomeEditMode } from "../redux/slice/homeSlice";
import { doSelectUser } from "../redux/slice/userSlice";
import { useAppDispatch } from "../redux/store";
import { useGetAllUsersQuery } from "../services/api";

export default function UserSelector() {
  const [selectUser, setSelectUser] = useState("");
  const dispatch = useAppDispatch();
  const { data: users, isLoading } = useGetAllUsersQuery();

  const handleSelectUser = (event: any) => {
    const selectedUserId: string = event.target.value;
    setSelectUser(selectedUserId);
    users?.forEach((user) => {
      if (user.id === Number(selectedUserId)) {
        dispatch(doSelectUser(user));
        dispatch(updateHomeEditMode(false));
      }
    });
  };

  return (
    <>
      {" "}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <select
          id="user-selector"
          value={selectUser}
          onChange={handleSelectUser}
        >
          <option value="" disabled>
            Select User
          </option>
          {users?.map(({ id, username }) => {
            return (
              <option key={id} value={id}>
                {username}
              </option>
            );
          })}
        </select>
      )}
    </>
  );
}
