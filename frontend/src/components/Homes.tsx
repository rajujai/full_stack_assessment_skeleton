import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useGetHomesByUserIdQuery } from "../services/api";
import { Home } from "../services/types";
import HomeBox from "./Home";

export default function Homes({ userId = 0, username = "" }) {
  const { data, isLoading } = useGetHomesByUserIdQuery(userId);
  const [homes, setHomes] = useState<Home[] | undefined>();
  useEffect(() => setHomes(data?.data), [data]);
  return (
    <div className="container mt-2">
      <h1 className="p-5 text-3xl -mt-16">
        Homes associated with <span className="font-bold bg-slate-700 px-2">{username}</span>
      </h1>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="flex flex-row flex-wrap justify-center">
          {homes?.map(
            ({
              id,
              streetAddress,
              state,
              zip,
              sqft,
              beds,
              baths,
              listPrice
            }) => (
              <HomeBox
                key={id}
                id={id}
                streetAddress={streetAddress}
                state={state}
                zip={zip}
                sqft={sqft}
                beds={beds}
                baths={baths}
                listPrice={listPrice}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}
