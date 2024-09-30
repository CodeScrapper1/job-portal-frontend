import LatestJobs from "@/components/home/LatestJobs";
import MainSection from "@/components/home/MainSection";
import ShowCategories from "@/components/home/ShowCategories";
import Image from "next/image";

export default async function Home() {
  const jobs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job?keyword=`, {
    cache: "no-cache",
  });
  const res = await jobs.json();
  console.log(res, "res");

  return (
    <div>
      <MainSection />
      <ShowCategories />
      <LatestJobs allJobs={res?.jobs} />
    </div>
  );
}
