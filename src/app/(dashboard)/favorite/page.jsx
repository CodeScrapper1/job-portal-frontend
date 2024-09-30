"use client";
import LatestJobCard from "@/components/LatestJobCard";
import { useLocalStorage } from "@mantine/hooks";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Favorite = () => {
  const [favoriteList, setFavoriteList] = useState([]);
  const [user] = useLocalStorage({
    key: "userData",
    defaultValue: {},
  });

  useEffect(() => {
    const getFavorites = async () => {
      const fav = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/job/favorites`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          cache: "no-cache",
        }
      );
      const res = await fav.json();
      if (res?.result?.length) setFavoriteList(res?.result);
    };
    if (user?.token) getFavorites();
  }, [user?.token]);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl mb-20">
      <h1 className="text-xl font-bold p-5">Applied Jobs</h1>
      <div className="grid grid-cols-3 gap-4 p-5">
        {favoriteList?.length
          ? favoriteList?.map((app) => (
              <Link href={`/findjobs/${app?.job?.id}`} key={app?.id}>
                <LatestJobCard job={app?.job} />
              </Link>
            ))
          : null}
      </div>
    </div>
  );
};

export default Favorite;
