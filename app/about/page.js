import React from 'react'


export default function Home() {  return (
  
       <>
        <div className="w-full h-auto pt-32 flex flex-col items-center justify-around relative bg-black">
        <div className="flex-col flex gap-3 z-10 text-white w-[80%] mx-auto">
          <h3 className="text-2xl md:text-3xl tracking-tight">
            We Are Zenith Spark Station
          </h3>
          <h1 className="text-6xl md:text-8xl tracking-wider">
            About Zenith spark <span className="block my-5">Station</span>
          </h1>
          <span className="bg-neutral-400 w-1/2 h-[1px]"></span>
          <article className=" text-lg md:text-xl">
            Welcome to our innovative company designed for ambitious investors! <b>Zenith Spark Station</b> is an investment firm dedicated to helping its members discover promising digital assets and successfully finance them through private transactions. **Zenith Spark Station** is fully legal and registered in the UK under company number 10619560.
            <div className="my-4"></div>
            We focus on investing in the stocks of both stable and rapidly growing companies within the digital asset market. Our primary focus is on firms that are developing blockchain technology solutions for financial transactions and automated trading systems on stock exchanges. Here, you will find the most relevant offers for the most lucrative and promising investments, giving you the freedom to achieve your financial goals.
            <div className="my-4"></div>
            We are one of the most valuable and sought-after investment companies for those seeking expert guidance in financial planning and wealth management.
            <div className="my-4"></div>
            <b>Zenith Spark Station</b> is the ideal choice for modern and secure investments. We provide everything you need regarding investing. We are committed to developing our company into a trustworthy program and invest significant effort into ensuring our growth. Please note that membership is exclusive: you must obtain a special membership to access **Zenith Spark Station**.
          </article>
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
  )
}

