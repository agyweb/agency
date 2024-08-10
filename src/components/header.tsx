import Image from "next/image";
import logo from "../../public/logo.png";
import { links } from "@/constants/links";
import NavMenu from "./nav-menu";

export default function Header() {
  return (
    <header className="absolute top-5 left-0 w-full   h-16 grid place-items-center z-[100]">
      <div className="flex items-center justify-between box  ">
        <Image
          src={logo}
          alt="agyweb logo"
          quality={100}
          className={"size-10"}
        />

        <div className="hidden items-center gap-x-7 md:flex">
          {links.map((link, i) => (
            <a
              key={`${link}${i}`}
              href={`/${link.href}`}
              className="text-black hover:opacity-95"
            >
              {link.name}
            </a>
          ))}
        </div>

        <NavMenu />

        
      </div>
    </header>
  );
}
