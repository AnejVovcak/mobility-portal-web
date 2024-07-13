import Image from "next/image";
import {fetchRoadmap} from "@/app/lib/roadmap";
export default async function Home() {

  const roadmap = await fetchRoadmap();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    </main>
  );
}
