import { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Plans } from '../resuables/index';
import Modal from '../resuables/Modal/Modal';
import { DBButtonTwo } from '../resuables/Buttons/Buttons';

Chart.register(...registerables);

const InvestmentCalculator = () => {
  const [selectedPlan, setSelectedPlan] = useState(Plans[0]);
  const [investment, setInvestment] = useState(1000);
  const [dailyProfit, setDailyProfit] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const chartRef = useRef(null); 
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    const min = parseFloat(selectedPlan.min.replace(/[^\d.-]+/g, ""));
    const max = parseFloat(selectedPlan.max.replace(/[^\d.-]+/g, ""));

    // Check if the investment is within the valid range before showing the modal
    if (investment < min || investment > max) {
      alert(`Please enter an amount between ${min} and ${max} USD.`);
    } else {
      setModal(!modal);
      updateCalculations(); // Update calculations if the modal is opened
    }
  };

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

  const handleInvestmentChange = (e) => {
    const value = parseFloat(e.target.value);
    const min = parseFloat(selectedPlan.min.replace(/[^\d.-]+/g, ""));
    const max = parseFloat(selectedPlan.max.replace(/[^\d.-]+/g, ""));

    if (!isNaN(value)) {
      setInvestment(value); // Allow the investment to change even without validation on input
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

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setDropdownOpen(false);
  };

  return (
    <div className="calculator-container w-full md:w-1/2 mx-auto rounded-2xl shadow-xl py-6 px-5 border border-slate-800 my-10">
      <h1 className="text-3xl font-bold text-center mb-8">Investment Profit Calculator</h1>
      
      <div className="flex justify-around items-center mb-10">
        <span>Select Plan:</span>
        <div className="w-1/2 relative text-sm">
          <div
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="cursor-pointer p-3 border-b flex justify-between items-center"
          >
            {selectedPlan.title || "Select a Plan"}
          </div>
          {isDropdownOpen && (
            <ul className="border mt-2 w-full rounded-md shadow-md absolute text-white bg-slate-800">
              {Plans.map((plan, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectPlan(plan)}
                  className="p-2 cursor-pointer"
                >
                  <span className="font-bold">{plan.title}</span> - {plan.heading} - {plan.interval}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Investment Input */}
      <div className="flex items-center justify-around">
        <div className="flex flex-col gap-y-2">
          Amount:
        </div>
        <input
          type="number"
          id="investmentManual"
          min={minInvestment}
          max={maxInvestment}
          value={investment}
          onChange={handleInvestmentChange}
          className="border-b p-2 bg-transparent w-1/2"
        />
      </div>
      
      <div className="w-full my-5 flex items-center justify-center">
        <DBButtonTwo buttonValue="Calculate" Clicked={handleModal} />
      </div>

      {/* Chart */}
      <div className="hidden">
        <canvas id="profitChart" className="w-full"></canvas>
      </div>

      <Modal isOpen={modal} onClose={handleModal}>
        <div className="investment-summary max-w-lg mx-auto shadow-lg rounded-xl p-6 my-8 text-center text-slate-800">
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
      </Modal>
    </div>
  );
};

export default InvestmentCalculator;
