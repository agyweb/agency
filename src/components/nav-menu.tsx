"use client";

import { useNav } from "@/store/nav-slice";
import Image from "next/image";
import logo from "../../public/logo.png";
import { links } from "@/constants/links";

export default function NavMenu() {
  const { isOpen, toggle } = useNav();

  return (
    <div className="block md:hidden ">
      <div className="cursor-pointer" onClick={toggle}>
        Menu
      </div>

      {isOpen && (
        <div className="absolute -top-5 left-0 right-0 h-[101vh] w-[101%] bg-white text-black grid place-items-center">

          <div className="box absolute top-5 flex h-16 items-center justify-between">
            <Image
              src={logo}
              alt="agyweb logo"
              quality={100}
              className={"size-10"}
            />

            <div className="cursor-pointer" onClick={toggle}>
              Close
            </div>
          </div>

          <div className="flex flex-col gap-y-10 text-center ">
            {links.map(({href,name}, i) => (
              <a
                key={`${name}${i}`}
                href={`${href}`}
                className="text-black hover:opacity-95 text-3xl uppercase"
              >
                {name}
              </a>
            ))}
          </div>



        </div>
      )}
    </div>
  );
}
