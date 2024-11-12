'use client'

import Image from "next/image";
// import { metadata } from "./layout";
import { ButtonOne, ButtonTwo } from "./components/resuables/Buttons/Buttons";
import { ArrowRight } from "lucide-react";
import { LandingPage } from "./components/resuables/index";
import SubLandingPage from "./components/LandingPage/SubLandingPage";
import Link from "next/link";
import { useRef } from "react";
import InvestmentPlan from "./components/LandingPage/InvestmentPlan";

export default function Home() {
  const subLandingPageRef = useRef(null); // Create a ref for SubLandingPage

  const scrollToBottom = () => {
    // Scroll to the bottom of SubLandingPage
    if (subLandingPageRef.current) {
      subLandingPageRef.current.scrollIntoView({ behavior: 'smooth', block: 'end'});
    }
  };

  return (
    <main className="w-full h-auto relative overflow-hidden">
      <div className="w-full h-screen flex flex-col items-center overflow-hidden relative bg-black">
        {LandingPage.map((texts, index) => (
          <div
            className="flex-col flex items-center justify-center w-full h-screen gap-5 z-10 text-white text-center"
            key={index}
          >
            <h3 className="text-lg md:text-xl tracking-wider font-bold my-2">
              {texts.title}
            </h3>
            <h1 className="text-4xl md:text-5xl tracking-widest font-bold">
              {texts.heading} <br /> {texts.br}
            </h1>
            <span className="bg-neutral-400 w-1/2 h-[1px]"></span>
            <article className="text-xl md:text-2xl tracking-wider px-5">
              {texts.subHeading}
            </article>

            <div className="flex gap-4 flex-row md:flex-row">
              <ButtonOne buttonValue={'How it works'} Clicked={scrollToBottom} />
              <Link href={'/signup'} className="flex flex-row gap-3 items-center">
                <ButtonTwo buttonValue={'Get Started'} iconValue={<ArrowRight />} />
              </Link>
            </div>
          </div>
        ))}
        <div className="w-full h-full absolute top-0 left-0">
          <video
            // preload={metadata}
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
      
      {/* Ref added to SubLandingPage */}
      <div ref={subLandingPageRef}>
        <SubLandingPage />
      </div>
      <div >
        <InvestmentPlan />
      </div>
    </main>
  );
}
