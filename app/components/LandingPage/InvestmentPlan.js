import React from 'react'
import { Plans } from '../resuables/index'
import Link from 'next/link'

const InvestmentPlan = () => {
  return (
    <main className="w-full py-12">
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-12 ">
        Our Investment Plans
      </h1>
  
      <div className="flex flex-wrap justify-center gap-8">
        {Plans.map((plan, index) => (
          <div
            key={index}
            className="w-full md:w-[48%] xl:w-[30%] bg-white shadow-lg rounded-lg p-6 transition-transform hover:scale-105"
          >
            <ul className="flex flex-col justify-evenly items-center text-center gap-4">
              <li className="text-yellow-600 font-bold text-xl md:text-2xl">
                {plan.title}
              </li>
              <li className="text-gray-800 text-4xl md:text-5xl font-extrabold mb-4">
                {plan.heading}
              </li>
              <li className="text-gray-600 text-lg">
                <span className="font-semibold">Interval: </span> {plan.interval}
              </li>
              <li className="text-gray-600 text-lg">
                <span className="font-semibold">Min: </span> {plan.min}
              </li>
              <li className="text-gray-600 text-lg">
                <span className="font-semibold">Max: </span> {plan.max}
              </li>
              <li className="text-yellow-600 text-xl font-bold">
                <span className="font-semibold">CR: </span> {plan.cr}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  </main>
  
  )
}

export default InvestmentPlan