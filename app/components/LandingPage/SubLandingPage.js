import React from 'react';
import { LandingPageAboutUs } from '../resuables/index';
import Image from 'next/image';
import BG from '../../../public/img/investment.svg'
import { ButtonOne, ButtonTwo } from '../resuables/Buttons/Buttons';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const SubLandingPage = () => {
  return (
    <main className='w-full h-auto relative'>
    <section className='  mx-auto flex flex-row  gap-4 items-center justify-center pt-24 text-xl md:text-2xl w-[80%] '>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      {LandingPageAboutUs.map((texts, index) => (
        <div key={index} className='w-full md:w-1/2 flex flex-col gap-4 z-10'>
          <h3 className='text-xl md:text-2xl mb-4 font-extrabold dark:text-yellow-600 text-yellow-700'>
            {texts.title}
          </h3>
          <h1 className="text-5xl md:text-7xl tracking-wider">
            {texts.heading}
          </h1>
          <p>
            {texts.firstText}
          </p>
            <Link href={'/about'}>
          <div className='mb-8 flex flex-row gap-4 items-center'>
            <ButtonOne iconValue={(<ArrowRight/>)} IconButton={true}/> <span className=''> See More</span>
          </div>
            </Link>
        </div>
      ))}
      <div className='hidden md:flex w-1/2'>
        <Image src={BG} width={600} height={600}/>
      </div>
    </section>

    <div className='flex flex-col md:flex-row '>

    </div>
    </main>
  );
}

export default SubLandingPage;
