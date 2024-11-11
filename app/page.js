import Image from "next/image";
import { metadata } from "./layout";
import { ButtonOne, ButtonTwo } from "./components/resuables/Buttons/Buttons";
import { ArrowRight } from "lucide-react";
import { LandingPage } from "./components/resuables/index";
import SubLandingPage from "./components/LandingPage/SubLandingPage";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="w-full h-screen  flex flex-col items-center overflow-hidden relative bg-black">
        {
          LandingPage.map((texts, index)=>(
            <div className="flex-col flex items-center justify-center w-full h-screen gap-5 z-10 text-white text-center" key={index}>
          <h3 className="text-lg md:text-xl tracking-wider font-bold my-2 font-agdasima ">
            {texts.title}
          </h3>
          <h1 className="text-4xl md:text-7xl  tracking-widest font-sourceCode font-bold">
              {texts.heading}
          </h1>
          <span className="bg-neutral-400 w-1/2 h-[1px]"></span>
          <article className=" text-xl md:text-2xl tracking-wider px-5">
          {texts.subHeading}
          </article>

          <div className="flex gap-4 flex-row md:flex-row">
              <ButtonOne buttonValue={'How it works'} />
            <Link href={'/signup'} className="flex flex-row gap-3 items-center">
              <ButtonTwo buttonValue={'Get Stated'} iconValue={(<ArrowRight/>)}/>
            </Link>
          </div>
        </div>
          ))
        }
        <div className="w-full h-full absolute  top-0 left-0">
          <video 
          preload={metadata}
            src="/videos/videobg.mp4" 
            className="w-full h-full object-cover opacity-25" // Reduced opacity
            autoPlay 
            loop 
            muted 
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
     <SubLandingPage/>
    </main>
  );
}
