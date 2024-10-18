
import Image from "next/image";
import { metadata } from "./layout";
import { ButtonOne } from "./components/resuables/Buttons/Buttons";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="w-full h-screen pt-32 flex flex-col items-center justify-around relative bg-black">
        <div className="flex-col flex gap-3 z-10 text-white w-[80%] mx-auto">
          <h3 className="text-lg md:text-xl tracking-tight my-2">
            We Are Zenith Spark Station
          </h3>
          <h1 className="text-5xl md:text-7xl tracking-wider">
          We give you <span className="block my-5"> financial freedom. </span>
          </h1>
          <span className="bg-neutral-400 w-1/2 h-[1px]"></span>
          <article className=" text-xl md:text-2xl">
          Creative team. Cutting-edge technologies.
          <br/>  
          Superior financial specialists.
          </article>

          <div className="flex flex-col gap-4 md:flex-row">
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
        <div className="w-full h-full absolute top-0 left-0">
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
    </>
  );
}
