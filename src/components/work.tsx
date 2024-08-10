import { works } from "@/constants/work";
import WorkImage from "./work-image";
import WorkCard from "./work-card";

export default function Work() {
  return (
    <div className="bg-gry relative">
      <div className="box py-[35px] pb-[50px] sm:py-[70px] sm:pb-[85px]">
        <div className="flex w-full flex-col items-center justify-between gap-y-3 text-center text-black sm:flex-row sm:text-left">
          <h1 className="w-full text-center font-swearDisplay text-6xl font-bold leading-none tracking-wide sm:w-fit sm:text-7xl md:text-[76px] lg:text-[90px] xl:text-[95px]">
            Work
          </h1>
          <p className="text-sm leading-normal tracking-tight opacity-90 sm:relative sm:top-[8px] md:text-[15px] lg:text-[17px] xl:text-[18px]">
            explore some of our projects where <br /> design and functionality
            unite.
          </p>
        </div>

        {/* This is the part that will have work cards */}
        <div className="mt-16 md:mt-20  grid grid-cols-1 gap-10 gap-y-14 md:grid-cols-2">
          {works.map((work, index) => (
            <WorkCard key={index} work={work}>
              <WorkImage img={work.img} title={work.title} />
            </WorkCard>
          ))}
        </div>
      </div>
    </div>
  );
}
