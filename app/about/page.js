import React from 'react'
import { metadata } from '../layout'
import { LandingPageAboutUs, stepsToEarn } from '../components/resuables/index'


export default function About() {  return (
  
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
          <article className=" text-lg md:text-xl pb-20">
            Welcome to our innovative company designed for ambitious investors! <b>Zenith Spark Station</b> is an investment firm dedicated to helping its members discover promising digital assets and successfully finance them through private transactions. <b>Zenith Spark Station </b> is fully legal and registered in the UK under company number 10619560.
            <div className="my-4"></div>
            We focus on investing in the stocks of both stable and rapidly growing companies within the digital asset market. Our primary focus is on firms that are developing blockchain technology solutions for financial transactions and automated trading systems on stock exchanges. Here, you will find the most relevant offers for the most lucrative and promising investments, giving you the freedom to achieve your financial goals.
            <div className="my-4"></div>
            We are one of the most valuable and sought-after investment companies for those seeking expert guidance in financial planning and wealth management.
            <div className="my-4"></div>
            <b>Zenith Spark Station</b> is the ideal choice for modern and secure investments. We provide everything you need regarding investing. We are committed to developing our company into a trustworthy program and invest significant effort into ensuring our growth. Please note that membership is exclusive: you must obtain a special membership to access <b>Zenith Spark Station.</b> 
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


      <section className="w-full py-12 ">
      <div className="max-w-7xl mx-auto px-4">
        {LandingPageAboutUs.map((about, index) => (
          <div key={index} className="text-center md:text-left">
            {/* Title */}
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-yellow-600 dark:text-yellow-500">
              {about.title}
            </h2>

            {/* Heading */}
            <h3 className="text-4xl md:text-6xl font-extrabold mb-6 ">
              {about.heading}
            </h3>

            {/* First Text */}
            <p className="text-lg md:text-xl mb-4 leading-relaxed">
              {about.firstText}
            </p>

            {/* Second Text */}
            <p className="text-lg md:text-xl  leading-relaxed">
              {about.secondText}
            </p>
          </div>
        ))}
      </div>
    </section>

    <section className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
          How to Earn With Us
        </h2>

        {/* Steps Container */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {stepsToEarn.map((step, index) => (
            <div
              key={index}
              className="w-full md:w-1/3 bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center transition-transform hover:scale-105"
            >
              {/* Step Number */}
              <div className="text-4xl md:text-6xl font-bold text-yellow-600 dark:text-yellow-500 mb-4">
                {step.number}
              </div>

              {/* Step Title */}
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
       </>
  )
}

