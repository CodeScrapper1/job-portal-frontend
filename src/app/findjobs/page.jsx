import FilterJobs from "@/components/jobs/FilterJobs";
import Job from "@/components/jobs/Job";
import React from "react";

const FindJobs = async ({ searchParams }) => {
  console.log(searchParams, "searchParams");

  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/job/?keyword=${
      searchParams?.search || ""
    }&location=${searchParams?.location || ""}&jobtype=${
      searchParams?.jobtype || ""
    }&salary=${searchParams?.salary || ""}`,
    {
      cache: "no-cache",
    }
  );
  const res = await jobs?.json();
  console.log(res, "jobs");

  return (
    <div className="p-5 mx-auto">
      <div className="flex gap-5">
        <div className="w-1/5 text-white">
          <FilterJobs />
        </div>
        {!res?.jobs?.length ? (
          <div className="flex justify-center flex-col items-center w-full">
            <img
              src="https://app.hrango.com:4414/assets/images/no-data-folder.svg"
              className="w-36"
              alt=""
            />
          </div>
        ) : (
          <div className="flex-1 h-[88vh] overflow-y-auto no-scrollbar pb-5">
            <div className="grid grid-cols-3 gap-4">
              {res?.jobs?.length
                ? res?.jobs?.map((job) => <Job key={job?.id} job={job} />)
                : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindJobs;
