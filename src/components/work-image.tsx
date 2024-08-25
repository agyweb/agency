import Image from "next/image";
import React from "react";
import w1 from "../../public/work/w1.png";
import w2 from "../../public/work/w2.png";
import w3 from "../../public/work/w3.png";
import w4 from "../../public/work/w4.png";
// import fs from "node:fs/promises";

// import { getPlaiceholder } from "plaiceholder";
type Props = {
  img: string;
  title: string;
};

export default async function WorkImage({ img, title }: Props) {
  // const buffer = await fs.readFile(`./public/work/${img}.png`);
  // const { base64 } = await getPlaiceholder(buffer);

  return (
    <div className="group h-auto w-auto cursor-pointer overflow-hidden rounded-md bg-black">
      <Image
        src={img === "w1" ? w1 : img === "w2" ? w2 : img === "w3" ? w3 : w4}
        alt={title}
        priority
        placeholder="blur"
        // blurDataURL={base64}
        className="transition-transform duration-200 group-hover:scale-110"
        sizes="(min-width: 1380px) 45vw, (min-width: 780px) 45vw, calc(100vw - 64px)"
      />
    </div>
  );
}
