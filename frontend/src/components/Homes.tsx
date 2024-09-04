import { useEffect, useState } from "react";
import { useGetHomesByUserIdQuery } from "../services/api";
import { Home } from "../services/types";
import HomeBox from "./Home";

export default function Homes({userId=0}) {
  const { data, isLoading } = useGetHomesByUserIdQuery(userId);
  const [homes, setHomes] = useState<Home[] | undefined>();
  useEffect(() => setHomes(data?.data), [data]);
  return (
    <>
      Homes
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        homes?.map((home) => (
          <HomeBox
            key={home.id}
            id={home.id}
            streetAddress={home.streetAddress}
          />
        ))
      )}
    </>
  );
}
