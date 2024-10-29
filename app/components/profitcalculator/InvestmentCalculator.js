
import { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Plans } from '../resuables/index';

Chart.register(...registerables);

const InvestmentCalculator = () => {
  const [selectedPlan, setSelectedPlan] = useState(Plans[0]);
  const [investment, setInvestment] = useState(1000);
  const [dailyProfit, setDailyProfit] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const chartRef = useRef(null); 

  // Update investment when plan changes to fit the new plan range
  useEffect(() => {
    const newMin = parseFloat(selectedPlan.min.replace(/[^\d.-]+/g, ""));
    const newMax = parseFloat(selectedPlan.max.replace(/[^\d.-]+/g, ""));

    // Reset investment to nearest valid value
    if (investment < newMin) {
      setInvestment(newMin);
    } else if (investment > newMax) {
      setInvestment(newMax);
    }
  }, [selectedPlan]);

  useEffect(() => {
    updateCalculations();
  }, [selectedPlan, investment]);

  const handleInvestmentChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setInvestment(value);
    }
  };

  const updateCalculations = () => {
    const intervalDays = parseInt(selectedPlan.interval.match(/\d+/), 10);
    const interestRate = parseFloat(selectedPlan.heading);
    const profit = investment * (interestRate / 100);
    const total = profit * (30 / intervalDays);

    setDailyProfit(profit);
    setTotalProfit(total);

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('profitChart').getContext('2d');
    const labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`);
    const data = Array.from({ length: 30 }, (_, i) => investment + (profit * (i + 1)));

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Investment Value (USD)',
          data,
          borderColor: '#C2A74D',
          borderWidth: 2,
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  // Extract min and max from the selected plan
  const minInvestment = parseFloat(selectedPlan.min.replace(/[^\d.-]+/g, ""));
  const maxInvestment = parseFloat(selectedPlan.max.replace(/[^\d.-]+/g, ""));

  return (
    <div className="calculator-container w-[95%] md:w-[80%] lg:w-[60%] mx-auto rounded-2xl shadow-xl py-6 px-5 border border-slate-800 my-10">
      <h1 className="text-3xl font-bold text-center mb-8">Investment Profit Calculator</h1>
      
      {/* Plan Selection */}
      <div className="plan-selection flex flex-wrap items-center justify-center gap-2 my-6">
        {Plans.map((plan, index) => (
          <label 
            key={index} 
            className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 text-gray-800 transition">
            <input
              type="radio"
              name="plan"
              value={plan.title}
              checked={selectedPlan.title === plan.title}
              onChange={() => setSelectedPlan(plan)}
              className="accent-slate-800"
            />
            <span>{plan.heading} - {plan.interval}</span>
          </label>
        ))}
      </div>

      {/* Investment Input */}
      <div className="investment-input grid grid-cols-1 md:grid-cols-2 gap-6 items-center my-8">
      <div className="text-center md:text-left">
  <label htmlFor="investmentRange" className="block mb-2 text-lg font-semibold">Investment amount (USD):</label>
  <input
    type="range"
    id="investmentRange"
    min={minInvestment}
    max={maxInvestment}
    value={investment}
    onChange={handleInvestmentChange}
    className="w-full appearance-none h-2 bg-gray-200 rounded-lg cursor-pointer"
    style={{
      background: `linear-gradient(to right, #FFD700 ${(investment - minInvestment) * 100 / (maxInvestment - minInvestment)}%, #e2e8f0 ${(investment - minInvestment) * 100 / (maxInvestment - minInvestment)}%)`,
    }}
  />
</div>
        <div className="flex flex-col items-center">
          <input
            type="number"
            id="investmentManual"
            min={minInvestment}
            max={maxInvestment}
            value={investment}
            onChange={handleInvestmentChange}
            className="border rounded-lg p-2 w-full text-gray-800"
          />
          {/* <span id="investmentAmount" className="text-lg font-semibold mt-3">{investment.toFixed(2)} USD</span> */}
        </div>
      </div>

      {/* Results */}
      <div className="investment-summary max-w-lg mx-auto shadow-lg rounded-xl p-6 my-8 text-center">
  <h2 className="text-3xl font-extrabold mb-6">Investment Summary</h2>

  <div className="summary-item mb-4">
    <p className="text-sm font-medium">Selected Plan</p>
    <p id="selectedPlan" className="text-xl font-semibold">
      {selectedPlan.heading} - {selectedPlan.interval}
    </p>
  </div>

  <div className="summary-item mb-4">
    <p className="text-sm font-medium">Investment Amount</p>
    <p id="investmentDisplay" className="text-xl font-semibold">
      {investment.toFixed(2)} USD
    </p>
  </div>

  <div className="summary-item mb-4">
    <p className="text-sm font-medium">Daily Profit</p>
    <p id="dailyProfit" className="text-xl font-semibold text-green-600">
      {dailyProfit.toFixed(2)} USD
    </p>
  </div>

  <div className="summary-item">
    <p className="text-sm font-medium">Total Profit after 30 days</p>
    <p id="totalProfit" className="text-xl font-semibold text-green-600">
      {totalProfit.toFixed(2)} USD
    </p>
  </div>
</div>


      {/* Chart */}
      <div className='hidden'>
      <canvas id="profitChart" className="w-full"></canvas>
      </div>
    </div>
  );
};

export default InvestmentCalculator;
