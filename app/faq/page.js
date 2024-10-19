'use client'
import React, { useState } from 'react';
import { WorkProcessFAQs, aboutInvestmentFAQs, aboutWithdrawalFAQs } from '../components/resuables/index/index'; // Adjust the path accordingly

const FAQs = () => {
  const [activeTab, setActiveTab] = useState('workProcess'); // Default to Work Process FAQs

  const renderFAQs = (faqs) => (
    <div className="space-y-4 ">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
            {faq.question}
          </h3>
          <div className="mt-2">
            {Array.isArray(faq.answer) ? (
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                {faq.answer.map((ans, idx) => (
                  <li key={idx}>{ans}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Tab Navigation */}
        <div className="flex justify-center my-8">
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'workProcess' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-yellow-500`}
            onClick={() => setActiveTab('workProcess')}
          >
            Work Process FAQs
          </button>
          <button
            className={`mx-4 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'investment' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-yellow-500`}
            onClick={() => setActiveTab('investment')}
          >
            Investment FAQs
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'withdrawal' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-yellow-500`}
            onClick={() => setActiveTab('withdrawal')}
          >
            Withdrawal FAQs
          </button>
        </div>

        {/* FAQs Content */}
        {activeTab === 'workProcess' && renderFAQs(WorkProcessFAQs)}
        {activeTab === 'investment' && renderFAQs(aboutInvestmentFAQs)}
        {activeTab === 'withdrawal' && renderFAQs(aboutWithdrawalFAQs)}
      </div>
    </section>
  );
};

export default FAQs;
