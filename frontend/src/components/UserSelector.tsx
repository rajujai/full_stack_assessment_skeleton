import { useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { resetEditingHomeId } from "../redux/slice/homeSlice";
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
        dispatch(resetEditingHomeId());
      }
    });
  };

  return (
    <div className="absolute w-full top-1 left-0">
      {" "}
      {isLoading ? (
        <div className="loader text-center">Loading...</div>
      ) : (
        <div className="relative text-right mr-5 p-2 text-xl">
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
        </div>
      )}
    </div>
  );
}
