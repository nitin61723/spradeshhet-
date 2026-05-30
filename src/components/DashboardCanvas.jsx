import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function DashboardCanvas({ gridData }) {
  
  // 1. Extract category labels dynamically from Column A (Index 0), rows 1 through 5 (indices 0 to 4)
  // Fall back to default string values like 'Category 1' if empty
  const labels = Array.from({ length: 5 }, (_, i) => {
    const val = gridData && gridData[i] && gridData[i][0];
    return val && val.trim() !== '' ? val.trim() : `Category ${i + 1}`;
  });

  // 2. Extract matching numeric values dynamically from Column B (Index 1), rows 1 through 5 (indices 0 to 4)
  // Parse them as numbers using Number(gridData[row][1]) || 0
  const dataValues = Array.from({ length: 5 }, (_, i) => {
    const val = gridData && gridData[i] && gridData[i][1];
    return Number(val) || 0;
  });

  // 3. Compose the live data payload for ChartJS components
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Metric Value',
        data: dataValues,
        backgroundColor: [
          'rgba(99, 102, 241, 0.7)',  // Violet/Indigo
          'rgba(6, 182, 212, 0.7)',   // Cyan
          'rgba(236, 72, 153, 0.7)',  // Pink
          'rgba(16, 185, 129, 0.7)',  // Emerald
          'rgba(245, 158, 11, 0.7)',  // Amber
        ],
        borderColor: [
          'rgb(99, 102, 241)',
          'rgb(6, 182, 212)',
          'rgb(236, 72, 153)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // 4. Configure Premium Options matching VibeSheets premium dark aesthetics
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        labels: { 
          color: '#f8fafc',
          font: {
            family: 'Outfit, Inter, sans-serif',
            size: 11,
          }
        } 
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#ffffff',
        bodyColor: '#cbd5e1',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(51, 65, 85, 0.2)',
        },
        ticks: {
          color: '#94a3b8',
          font: {
            family: 'Outfit, Inter, sans-serif',
            size: 10,
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(51, 65, 85, 0.2)',
        },
        ticks: {
          color: '#94a3b8',
          font: {
            family: 'Outfit, Inter, sans-serif',
            size: 10,
          }
        }
      }
    }
  };

  // Custom options for the Pie chart (omits scales)
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        labels: { 
          color: '#f8fafc',
          font: {
            family: 'Outfit, Inter, sans-serif',
            size: 11,
          }
        } 
      },
      tooltip: {
        backgroundColor: '#0f172a',
        titleColor: '#ffffff',
        bodyColor: '#cbd5e1',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
      }
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-slate-900 text-slate-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-white font-sans">Work Dashboard Canvas</h2>
        <p className="text-sm text-slate-400 font-sans">Visualizing live metrics extracted directly from your active worksheet ranges.</p>
      </div>

      {/* Grid Layout Manager for Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Bar Chart Widget */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 shadow-xl h-[380px] flex flex-col">
          <h3 className="text-md font-semibold text-slate-300 mb-4 flex items-center justify-between">
            <span>Dynamic Column Metrics (Bar Chart)</span>
            <span className="text-[10px] bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded font-mono font-bold select-none">
              A1:B5 Range
            </span>
          </h3>
          <div className="flex-1 relative">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Card 2: Pie Chart Widget */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 shadow-xl h-[380px] flex flex-col">
          <h3 className="text-md font-semibold text-slate-300 mb-4 flex items-center justify-between">
            <span>Metrics Share Split (Pie Chart)</span>
            <span className="text-[10px] bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded font-mono font-bold select-none">
              A1:B5 Range
            </span>
          </h3>
          <div className="flex-1 relative flex justify-center items-center">
            <div className="w-[280px] h-[280px]">
              <Pie data={chartData} options={pieChartOptions} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}