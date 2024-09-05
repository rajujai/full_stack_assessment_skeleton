import { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useGetHomesByUserIdQuery } from "../services/api";
import { Home, HomesPageRequest } from "../services/types";
import HomeBox from "./Home";

export default function Homes({ userId = 0, username = "" }) {
  const [pageNo, setPageNo] = useState(1);
  const [homes, setHomes] = useState<Home[]>([]);
  const loader = useRef<HTMLDivElement | null>(null);
  const pageRequest: HomesPageRequest = { userId, pageNo };
  const { data, isLoading } = useGetHomesByUserIdQuery(pageRequest);
  useEffect(() => {
    if (data?.data) {
      setHomes((prev) => [...prev, ...data.data]);
    }
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading && data?.hasNextPage) {
        setPageNo((prevPageNo) => prevPageNo + 1);
      }
    });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [isLoading, data?.hasNextPage]);
  return (
    <div className="container mt-2">
      <h1 className="p-5 text-3xl -mt-16">
        Homes associated with{" "}
        <span className="font-bold bg-slate-700 px-2">{username}</span>
      </h1>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="flex flex-row flex-wrap justify-start">
          {homes?.map(
            ({
              id,
              streetAddress,
              state,
              zip,
              sqft,
              beds,
              baths,
              listPrice,
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
