"use client";
import React from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const MainSection = () => {
  const router = useRouter();
  const handleSearch = (formData) => {
    const name = formData.get("name");
    router.push(`findjobs?search=${name}`);
  };
  return (
    <div className="text-center text-white">
      <div className="flex flex-col gap-5 my-10">
        <div className="text-center mx-auto">
          <div className="text-yellow-400 px-4 py-2 rounded-full bg-black/50 font-semibold">
            No. 1 Job Searching Site
          </div>
        </div>
        <h1 className="text-5xl font-bold">
          <span className="text-yellow-400">Discover</span>, Apply{" "}
          <span className="text-yellow-400">&</span> <br /> Land your Perfect
          Job
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel. <br />
          voluptatum laborum numquam blanditiis harum
        </p>
        <form action={handleSearch}>
          <div className="flex w-2/5 shadow-lg border pl-3 bg-white text-slate-600 rounded-full items-center gap-4 mx-auto">
            <input
              type="text"
              name="name"
              placeholder="Find your dream job"
              className="outline-none border-none bg-white w-full"
            />
            <Button
              type="submit"
              className="rounded-r-full bg-white hover:bg-transparent"
            >
              <Search className="h-5 w-5 bg-transparent text-slate-600" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MainSection;
