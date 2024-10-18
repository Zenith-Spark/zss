
import Image from "next/image";
import { metadata } from "./layout";
import { ButtonOne } from "./components/resuables/Buttons/Buttons";
import { ArrowRight } from "lucide-react";
import { LandingPage } from "./components/resuables/index";

export default function Home() {
  return (
    <main>
      <div className="w-full h-screen pt-20 flex flex-col items-center  relative bg-black">
        {
          LandingPage.map((texts, index)=>(
            <div className="flex-col flex gap-3 z-10 text-white w-[80%] mx-auto" key={index}>
          <h3 className="text-lg md:text-xl tracking-tight my-2">
            {texts.title}
          </h3>
          <h1 className="text-5xl md:text-7xl  tracking-widest w-1/2">
              {texts.heading}
          </h1>
          <span className="bg-neutral-400 w-1/2 h-[1px]"></span>
          <article className=" text-xl md:text-2xl tracking-wider">
          {texts.subHeading}
          </article>

          <div className="flex gap-4 flex-col md:flex-row">
            <span className="flex flex-row gap-3 items-center">
              <ButtonOne IconButton={true} iconValue={(<ArrowRight/>)}/>
              <p>
                Investor Login
              </p>
            </span>
            <span className="flex flex-row gap-3">
              <ButtonOne IconButton={true} iconValue={(<ArrowRight/>)}/>
              <p>
                Create  Account
              </p>
            </span>
          </div>
        </div>
          ))
        }
        <div className="w-full h-full absolute  top-0 left-0">
          <video 
          preload={metadata}
            src="/videos/videobg.mp4" 
            className="w-full h-full object-cover opacity-40" // Reduced opacity
            autoPlay 
            loop 
            muted 
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div>
        <h3>
          About US
        </h3>
        <h1 className="text-6xl md:text-8xl tracking-wider">
            About Zenith spark Station
          </h1>
      </div>
    </main>
  );
}
